from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import DateField, IntegerField, StringField
from wtforms.validators import DataRequired
from app.api.s3_helper import ALLOWED_EXTENSIONS


class EpisodeForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    plot = StringField('Plot', validators=[DataRequired()])
    order = IntegerField('Episode #', validators=[DataRequired()])
    airDate = DateField('Aired Date', validators=[DataRequired()])
