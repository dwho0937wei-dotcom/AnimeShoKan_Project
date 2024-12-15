from flask import Blueprint, request
from flask_login import login_required, current_user
from app.api.s3_helper import (
    upload_file_to_s3, get_unique_filename, remove_file_from_s3
)
from app.forms import AnimeForm, AnimeUpdateForm, EpisodeForm, EpisodeUpdateForm
from app.models import Anime, anime_character_table, db, Episode

anime_routes = Blueprint('anime', __name__)


#! Work In Progress
@anime_routes.route('/<int:animeId>/character/<int:characterId>')
def addCharacterToAnime(animeId, characterId):
    new_association = anime_character_table.insert().values(
        animeId,
        characterId,
        characterType='minor'
    )
    db.session.execute(new_association)
    db.session.commit()

    return f'character ID {characterId} added to anime ID ${animeId}'


# @anime_routes.route('')
# def getAllAnime():
#     allAnime = Anime.query.all()
#     animeCatalog = {}

#     for anime in allAnime:
#         anime_dict = anime.to_dict()
#         firstInitial = anime_dict.get('title')[0].upper()
#         if animeCatalog.get(firstInitial):
#             animeCatalog[firstInitial].append(anime_dict)
#         else:
#             animeCatalog[firstInitial] = [anime_dict]

#     for alphabet in animeCatalog.keys():
#         animeCatalog[alphabet].sort(key=lambda a : a.get('title'))

#     return animeCatalog


@anime_routes.route('/catalog')
def getAnimeCatalog():
    allAnime = Anime.query.all()
    animeCatalog = {}

    for anime in allAnime:
        catalog = anime.to_dict_catalog()
        firstInitial = catalog.get('title')[0].upper()
        if animeCatalog.get(firstInitial):
            animeCatalog[firstInitial].append(catalog)
        else:
            animeCatalog[firstInitial] = [catalog]

    for alphabet in animeCatalog.keys():
        animeCatalog[alphabet].sort(key=lambda a : a.get('title'))

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
            # print("Url not found in upload when posting new Anime!")
            return animeForm.errors, 500
        
        url = upload["url"] if upload else None
        newAnime = Anime(
            title=animeForm.data["title"],
            synopsis=animeForm.data["synopsis"],
            numOfEpisode=0,
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
    animeUpdateForm = AnimeUpdateForm()
    animeUpdateForm['csrf_token'].data = request.cookies['csrf_token']

    animeToUpdate = Anime.query.get(animeId)
    if animeToUpdate.hostEditorId != current_user.id:
        return {"error": "Current user does NOT have the editing privilege for this anime!"}, 500
    
    if animeUpdateForm.validate_on_submit():
        #! Need the old title before changing for finding and deleting the old one in animeCatalog in Redux
        oldTitle = animeToUpdate.title
        animeToUpdate.title = animeUpdateForm.data["title"]
        animeToUpdate.synopsis = animeUpdateForm.data["synopsis"]

        newPreviewImage = animeUpdateForm.data["previewImage"]
        if newPreviewImage:
            newPreviewImage.filename = get_unique_filename(newPreviewImage.filename)
            upload = upload_file_to_s3(newPreviewImage)

            if "url" not in upload:
                # print("Url not found in upload for editing Anime with new preview image!")
                return animeUpdateForm.errors, 500
            
            if animeToUpdate.previewImage:
                remove_file_from_s3(animeToUpdate.previewImage)
            animeToUpdate.previewImage = upload["url"]

        db.session.commit()
        return { 'oldTitle': oldTitle, 'updated': animeToUpdate.to_dict() }
    
    return {"errors": animeUpdateForm.errors}, 400


@anime_routes.route('/<int:animeId>', methods=['DELETE'])
@login_required
def deleteAnime(animeId):
    animeToDelete = Anime.query.get(animeId)
    firstInitial = animeToDelete.title[0].upper()
    if animeToDelete.hostEditorId != current_user.id:
        return {"error": "Current user has no right to delete this anime!"}, 500
    
    if animeToDelete.previewImage:
        remove_file_from_s3(animeToDelete.previewImage)
    db.session.delete(animeToDelete)
    db.session.commit()

    return {"firstInitial": firstInitial, "message": "Anime successfully deleted!"}


#! Episodes
@anime_routes.route('/<int:animeId>/episode', methods=['POST'])
@login_required
def addNewEpisode(animeId):
    episodeForm = EpisodeForm()
    episodeForm['csrf_token'].data = request.cookies['csrf_token']

    animeToAddEpisode = Anime.query.get(animeId)
    if animeToAddEpisode.hostEditorId != current_user.id:
        return {"error": "Current user does NOT have the privilege to add any episode in this anime!"}, 500

    if episodeForm.validate_on_submit():
        previewImage = episodeForm.data["previewImage"] if episodeForm.data["previewImage"] else None
        if previewImage:
            previewImage.filename = get_unique_filename(previewImage.filename)
        upload = upload_file_to_s3(previewImage) if previewImage else None

        if upload is not None and "url" not in upload:
            # print("Url not found in upload when adding new episode for this anime!")
            return episodeForm.errors, 500
        
        url = upload["url"] if upload else None
        newEpisode = Episode(
            title=episodeForm.data['title'],
            plot=episodeForm.data['plot'],
            episodeNum=episodeForm.data['episodeNum'],
            airDate=episodeForm.data['airDate'],
            previewImage=url,
            animeId=animeId,
        )

        db.session.add(newEpisode)
        animeToAddEpisode.numOfEpisode += 1
        db.session.commit()

        return newEpisode.to_dict()
    
    return {"errors": episodeForm.errors}, 400


@anime_routes.route('/<int:animeId>/episode/<int:episodeId>', methods=['PUT'])
@login_required
def updateEpisode(animeId, episodeId):
    episodeUpdateForm = EpisodeUpdateForm()
    episodeUpdateForm['csrf_token'].data = request.cookies['csrf_token']

    animeToEditEpisode = Anime.query.get(animeId)
    if animeToEditEpisode.hostEditorId != current_user.id:
        return {"error": "Current user does NOT have the privilege to edit any episode in this anime!"}, 500
    
    if episodeUpdateForm.validate_on_submit():
        episodeToUpdate = Episode.query.get(episodeId)

        episodeToUpdate.title = episodeUpdateForm.data['title']
        episodeToUpdate.plot = episodeUpdateForm.data['plot']
        episodeToUpdate.episodeNum = episodeUpdateForm.data['episodeNum']
        episodeToUpdate.airDate = episodeUpdateForm.data['airDate']

        newPreviewImage = episodeUpdateForm.data['previewImage']
        if newPreviewImage:
            newPreviewImage.filename = get_unique_filename(newPreviewImage.filename)
            upload = upload_file_to_s3(newPreviewImage)

            if 'url' not in upload:
                # print("Url not found in upload when editing an episode for this anime!")
                return episodeUpdateForm.errors, 500
            
            if episodeToUpdate.previewImage:
                remove_file_from_s3(episodeToUpdate.previewImage)
            episodeToUpdate.previewImage = upload['url']

        db.session.commit()

        return episodeToUpdate.to_dict()
    
    return {"errors": episodeUpdateForm.errors}, 400


@anime_routes.route('/<int:animeId>/episode/<int:episodeId>', methods=['DELETE'])
@login_required
def deleteEpisode(animeId, episodeId):
    animeToDeleteAnEpisodeFrom = Anime.query.get(animeId)
    if animeToDeleteAnEpisodeFrom.hostEditorId != current_user.id:
        return {"error": "Current user has no right to delete an episode from this anime!"}, 500
    
    episodeToDelete = Episode.query.get(episodeId)
    if episodeToDelete.previewImage:
        remove_file_from_s3(episodeToDelete.previewImage)
    db.session.delete(episodeToDelete)
    animeToDeleteAnEpisodeFrom.numOfEpisode -= 1
    db.session.commit()

    return {"message": "Episode successfully deleted from this anime!"}