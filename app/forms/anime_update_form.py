from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed, FileField
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length
from app.api.s3_helper import ALLOWED_EXTENSIONS


class AnimeUpdateForm(FlaskForm):
    title = StringField('Title', 
                        validators=[
                            DataRequired(message="Title cannot be empty!"), 
                            Length(max=255, message="Title cannot have more than 255 characters!")])
    synopsis = StringField('Synopsis', 
                           validators=[
                               DataRequired(message="All anime has a synopsis! Please give one!")])
    previewImage = FileField('Preview Image', 
                             validators=[
                                 FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Update Anime")