from flask import Blueprint, request
from flask_login import login_required, current_user
from app.api.s3_helper import (
    upload_file_to_s3, get_unique_filename, remove_file_from_s3
)
from app.forms import CharacterForm, CharacterUpdateForm
from app.models import Character, db

character_routes = Blueprint('character', __name__)


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