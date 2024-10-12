from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed, FileField
from wtforms import DateField, IntegerField, StringField, SubmitField
from wtforms.validators import DataRequired, NumberRange
from app.api.s3_helper import ALLOWED_EXTENSIONS


class EpisodeUpdateForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    plot = StringField('Plot', validators=[DataRequired()])
    episodeNum = IntegerField('Episode #', validators=[NumberRange(min=0)])
    airDate = DateField('Aired Date', validators=[DataRequired()])
    previewImage = FileField('Preview Image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField('Update Episode')