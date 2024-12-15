from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed, FileField, FileRequired
from wtforms import SelectMultipleField, StringField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Length
from app.api.s3_helper import ALLOWED_EXTENSIONS


class CharacterForm(FlaskForm):
    appearance = TextAreaField('Appearance', 
                               validators=[
                                   DataRequired(message='''If you can't describe what the character looks like, then you can say something like "Unknown Identity"''')])
    fullName = StringField('Full Name',
                           validators=[
                               DataRequired(message="If the character doesn't have a name, then it at least must be called something."),
                               Length(max=255, message="Yeah, I currently can't imagine an anime character who goes around with more than 255 characters as their full name.")])
    introduction = TextAreaField('Introduction',
                                 validators=[
                                     DataRequired(message="Please introduce the character!")
                                 ])
    personality = TextAreaField('Personality',
                                validators=[
                                    DataRequired(message="If the character has no personality, then just say so right here rather than leaving this empty!")])
    previewImage = FileField('Preview Image',
                             validators=[
                                 FileRequired(message="If the character's identity is unknown, then an image representing an unknown identity shall do! Otherwise, just look for the character online and upload it here please!"),
                                 FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Post Character")