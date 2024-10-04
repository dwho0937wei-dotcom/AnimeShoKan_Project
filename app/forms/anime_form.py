from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import IntegerField, StringField, SubmitField
from wtforms.validators import DataRequired
from app.api.s3_helper import ALLOWED_EXTENSIONS

class AnimeForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    synopsis = StringField('Synopsis', validators=[DataRequired()])
    previewImage = FileField('Preview Image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Post Anime")