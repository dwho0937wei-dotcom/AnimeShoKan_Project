from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed, FileField, FileRequired
from wtforms import StringField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Length
from app.api.s3_helper import ALLOWED_EXTENSIONS


class AnimeForm(FlaskForm):
    title = StringField('Title', 
                        validators=[
                            DataRequired(message="A title is needed!"), 
                            Length(max=255, message="Title cannot have more than 255 characters!")])
    synopsis = TextAreaField('Synopsis', 
                             validators=[
                                 DataRequired(message="All anime has a synopsis! Please give one!"),
                                #  Length(max=255, message="Sorry, but not even the synopsis can have more than 255 characters because of the database's varchar limit!")
                                 ])
    previewImage = FileField('Preview Image', 
                             validators=[
                                 FileRequired(message="This anime needs a preview image! :("), 
                                 FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Post Anime")