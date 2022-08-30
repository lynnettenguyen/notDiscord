from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError, Length, Regexp
from app.models import User


def user_exists(form, field):
    # checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use')


def username_exists(form, field):
    # checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, Email("Please provide a valid email")])
    password = StringField('password', validators=[DataRequired(), Length(min=8, message='Please provide a password of at least 8 characters'), Regexp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$', message='Please provider a password with one uppercase letter, one lowercase letter, and one number ')])
    profile_pic = StringField('profile_pic')
