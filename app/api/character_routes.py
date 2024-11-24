from flask import Blueprint, request
from flask_login import login_required, current_user
from app.api.s3_helper import (
    upload_file_to_s3, get_unique_filename, remove_file_from_s3
)
from app.forms import CharacterForm, CharacterUpdateForm
from app.models import Character, db

character_routes = Blueprint('characters', __name__)


@character_routes.route('/<int:characterId>', methods=['DELETE'])
@login_required
def deleteCharacter(characterId):
    characterToDelete = Character.query.get(characterId)
    firstInitial = characterToDelete.fullName[0].upper()
    if characterToDelete.hostEditorId != current_user.id:
        return {"error": "Current user has no right to delete this character!"}, 500
    if characterToDelete.previewImage:
        remove_file_from_s3(characterToDelete.previewImage)
    db.session.delete(characterToDelete)
    db.session.commit()
    return {"firstInitial": firstInitial, "message": "Character successfully deleted!"}


@character_routes.route('/catalog')
def getCharacterCatalog():
    allCharacters = Character.query.all()
    characterCatalog = {}

    for character in allCharacters:
        catalog = character.to_dict_catalog()
        firstInitial = catalog.get('fullName')[0].upper()
        if characterCatalog.get(firstInitial):
            characterCatalog[firstInitial].append(catalog)
        else:
            characterCatalog[firstInitial] = [catalog]

    for alphabet in characterCatalog.keys():
        characterCatalog[alphabet].sort(key=lambda a : a.get('fullName'))

    return characterCatalog


@character_routes.route('/<int:characterId>')
def getSpecificCharacter(characterId):
    character = Character.query.get(characterId)
    if not character:
        return {'error': "Character not found or no longer exists!"}, 404
    return character.to_dict()


@character_routes.route('', methods=['POST'])
@login_required
def postNewCharacter():
    characterForm = CharacterForm()
    characterForm['csrf_token'].data = request.cookies['csrf_token']

    if characterForm.validate_on_submit():
        previewImage = characterForm.data["previewImage"] if characterForm.data["previewImage"] else None
        if previewImage:
            previewImage.filename = get_unique_filename(previewImage.filename)

        upload = upload_file_to_s3(previewImage) if previewImage else None
        if upload is not None and "url" not in upload:
            return characterForm.errors, 500
        url = upload["url"] if upload else None

        newCharacter = Character(
            fullName=characterForm.data["fullName"],
            introduction=characterForm.data["introduction"],
            appearance=characterForm.data["appearance"],
            personality=characterForm.data["personality"],
            previewImage=url,
            hostEditorId=current_user.id,
        )

        db.session.add(newCharacter)
        db.session.commit()

        return newCharacter.to_dict()

    return {"errors": characterForm.errors}, 400


@character_routes.route('/<int:characterId>', methods=['PUT'])
@login_required
def updateCharacter(characterId):
    characterUpdateForm = CharacterUpdateForm()
    characterUpdateForm['csrf_token'].data = request.cookies['csrf_token']

    characterToUpdate = Character.query.get(characterId)
    if characterToUpdate.hostEditorId != current_user.id:
        return {"error": "Current user does NOT have the editing privilege for this character!"}, 500

    if characterUpdateForm.validate_on_submit():
        #! Need the old full name before changing for finding and deleting the old one in characterCatalog in Redux
        oldFullName = characterToUpdate.fullName
        characterToUpdate.fullName = characterUpdateForm.data["fullName"]
        characterToUpdate.introduction = characterUpdateForm.data["introduction"]
        characterToUpdate.appearance = characterUpdateForm.data["appearance"]
        characterToUpdate.personality = characterUpdateForm.data["personality"]

        newPreviewImage = characterUpdateForm.data["previewImage"]
        if newPreviewImage:
            newPreviewImage.filename = get_unique_filename(newPreviewImage.filename)
            upload = upload_file_to_s3(newPreviewImage)
            if "url" not in upload:
                return characterUpdateForm.errors, 500
            if characterToUpdate.previewImage:
                remove_file_from_s3(characterToUpdate.previewImage)
            characterToUpdate.previewImage = upload["url"]
        
        db.session.commit()
        return { 'oldFullName': oldFullName, 'updated': characterToUpdate.to_dict() }
    
    return {"errors": characterUpdateForm.errors}, 400