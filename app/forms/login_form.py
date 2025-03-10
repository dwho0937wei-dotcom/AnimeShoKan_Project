from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Email provided not found.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    email = StringField('email', 
                        validators=[
                            DataRequired("Email cannot be empty!"), user_exists,
                            Length(max=255, message="Email cannot have more than 255 characters including space!")])
    password = StringField('password', 
                           validators=[
                               DataRequired("Password cannot be empty"), 
                               Length(max=255, message="Password cannot have more than 255 characters including space!"), password_matches])