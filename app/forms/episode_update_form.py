from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed, FileField
from wtforms import DateField, IntegerField, StringField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Length, NumberRange
from app.api.s3_helper import ALLOWED_EXTENSIONS


class EpisodeUpdateForm(FlaskForm):
    title = StringField('Title', 
                        validators=[
                            DataRequired(message="A title is needed!"), 
                            Length(max=255, message="Title cannot have more than 255 characters!")])
    plot = TextAreaField('Plot', 
                       validators=[
                           DataRequired(message="Don't leave the plot box empty!"),
                           Length(max=255, message="Sorry, but not even the plot can have more than 255 characters because of the database's varchar limit!")])
    episodeNum = IntegerField('Episode #', 
                              validators=[
                                  NumberRange(min=0, message="Negative episode numbers don't exist! Funny enough, episode 0 can!")])
    airDate = DateField('Aired Date', 
                        validators=[
                            DataRequired(message="The anime has to be aired on a particular day, right?")])
    previewImage = FileField('Preview Image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField('Update Episode')