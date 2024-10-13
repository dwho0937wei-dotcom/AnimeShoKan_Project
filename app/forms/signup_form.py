from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, Length, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    firstName = StringField('firstName', 
                            validators=[
                                DataRequired(message="First name cannot be empty!"), 
                                Length(max=255, message="First name cannot have more than 255 characters including space!")])
    lastName = StringField('lastName', 
                           validators=[
                               DataRequired(message="Last name cannot be empty!"), 
                               Length(max=255, message="Last name cannot have more than 255 characters including space!")])
    username = StringField(
        'username', 
        validators=[
            DataRequired("Username cannot be empty!"), username_exists, 
            Length(max=50, message="YouTube says no more than 50 characters for username so AnimeShoKan shall say the same!")])
    email = StringField('email', 
                        validators=[
                            DataRequired("Email cannot be empty!"), user_exists, 
                            Email(message="This is not a valid email!"),
                            Length(max=255, message="Email cannot have more than 255 characters including space!")])
    password = StringField('password', 
                           validators=[
                               DataRequired("Password cannot be empty"), 
                               Length(max=255, message="Password cannot have more than 255 characters including space!")])
