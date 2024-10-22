from flask import Blueprint, request
from flask_login import login_required, current_user
from app.api.s3_helper import (
    upload_file_to_s3, get_unique_filename, remove_file_from_s3
)
from app.forms import AnimeForm, AnimeUpdateForm, EpisodeForm, EpisodeUpdateForm
from app.models import Anime, db, Episode

character_routes = Blueprint('character', __name__)


@character_routes.route('')
def getAllCharacters():
    pass