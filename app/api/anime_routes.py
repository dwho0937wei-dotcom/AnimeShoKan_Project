from flask import Blueprint, request
from flask_login import login_required, current_user
from app.api.s3_helper import (
    upload_file_to_s3, get_unique_filename, remove_file_from_s3
)
from app.forms import AnimeForm, EpisodeForm
from app.models import Anime, db, Episode

anime_routes = Blueprint('anime', __name__)


@anime_routes.route('')
def getAllAnime():
    allAnime = Anime.query.all()
    animeCatalog = {}

    for anime in allAnime:
        anime_dict = anime.to_dict()
        firstInitial = anime_dict.title[0].upper()
        if animeCatalog[firstInitial]:
            animeCatalog[firstInitial].append(anime_dict)
        else:
            animeCatalog[firstInitial] = [anime_dict]
    for alphabet in animeCatalog.keys():
        animeCatalog[alphabet] = animeCatalog[alphabet].sort(key=lambda a : a.title)

    return animeCatalog


@anime_routes.route('/<int:animeId>')
def getSpecificAnime(animeId):
    anime = Anime.query.get(animeId)
    if not anime:
        return {'error': "Anime not found or no longer exists!"}, 404
    return anime.to_dict()


@anime_routes.route('/new', methods=['POST'])
@login_required
def postNewAnime():
    animeForm = AnimeForm()
    animeForm['csrf_token'].data = request.cookies['csrf_token']

    if animeForm.validate_on_submit():
        previewImage = animeForm.data["previewImage"] if animeForm.data["previewImage"] else None
        if previewImage:
            previewImage.filename = get_unique_filename(previewImage.filename)
        upload = upload_file_to_s3(previewImage) if previewImage else None

        if upload is not None and "url" not in upload:
            print("Url not found in upload when posting new Anime!")
            return animeForm.errors, 500
        
        url = upload["url"] if upload else None
        newAnime = Anime(
            title=animeForm.data["title"],
            synopsis=animeForm.data["synopsis"],
            episodeNum=0,
            hostEditorId=current_user.id,
            previewImage=url
        )

        db.session.add(newAnime)
        db.session.commit()

        return newAnime.to_dict()
    
    return {"errors": animeForm.errors}, 400


@anime_routes.route('/<int:animeId>', methods=['PUT'])
@login_required
def updateAnime(animeId):
    animeForm = AnimeForm()
    animeForm['csrf_token'].data = request.cookies['csrf_token']

    animeToUpdate = Anime.query.get(animeId)

    if animeToUpdate.hostEditorId != current_user.id:
        return {"error": "Current user does NOT have the editing privilege for this anime!"}, 500

    animeToUpdate.title = animeForm.data["title"]
    animeToUpdate.synopsis = animeForm.data["synopsis"]

    newPreviewImage = animeForm.data["previewImage"]
    if newPreviewImage:
        newPreviewImage.filename = get_unique_filename(newPreviewImage.filename)
        upload = upload_file_to_s3(newPreviewImage)

        if "url" not in upload:
            print("Url not found in upload for editing Anime with new preview image!")
            return animeForm.errors, 500
        
        if animeToUpdate.previewImage:
            remove_file_from_s3(animeToUpdate.previewImage)
        animeToUpdate.previewImage = upload["url"]

    db.session.commit()

    return animeToUpdate.to_dict()


@anime_routes.route('/<int:animeId>', methods=['DELETE'])
@login_required
def deleteAnime(animeId):
    animeToDelete = Anime.query.get(animeId)
    if animeToDelete.hostEditorId != current_user.id:
        return {"error": "Current user has no right to delete this anime!"}, 500
    
    if animeToDelete.previewImage:
        remove_file_from_s3(animeToDelete.previewImage)
    db.session.delete(animeToDelete)
    db.session.commit()

    return {"message": "Anime successfully deleted!"}


#! Episodes
@anime_routes.route('/<int:animeId>/episode', methods=['POST'])
@login_required
def addNewEpisode(animeId):
    episodeForm = EpisodeForm()
    episodeForm['csrf_token'].data = request.cookies['csrf_token']

    if episodeForm.validate_on_submit():
        previewImage = episodeForm.data["previewImage"] if episodeForm.data["previewImage"] else None
        if previewImage:
            previewImage.filename = get_unique_filename(previewImage.filename)
        upload = upload_file_to_s3(previewImage) if previewImage else None

        if upload is not None and "url" not in upload:
            print("Url not found in upload when posting new Anime!")
            return episodeForm.errors, 500
        
        url = upload["url"] if upload else None
        newEpisode = Episode(
            title=episodeForm.data['title'],
            plot=episodeForm.data['plot'],
            order=episodeForm.data['title'],
            airDate=episodeForm.data['airDate'],
            previewImage=url,
            animeId=animeId,
        )

        db.session.add(newEpisode)
        db.session.commit()

        return newEpisode.to_dict()
    
    return {"errors": episodeForm.errors}, 400