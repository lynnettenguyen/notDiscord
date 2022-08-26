from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

# blue = 'https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_blue.png'
# green = 'https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_green.png'
# lightblue = 'https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_light_blue.png'
# darkpink = 'https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_dark_pink.png'
# purple = 'https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_purple.png'
# pink = 'https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_pink.png'
# red = 'https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_red.png'
# yellow = 'https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_yellow.png'
# lightpurple = 'https://res.cloudinary.com/dxhbqihvs/image/upload/v1661373705/user_image_light_purple.png'


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    # profile_pic = SelectField('profile_pic', choices=[blue, green, lightblue, darkpink, purple, pink, red, yellow, lightpurple])
    profile_pic = StringField('profile_pic')
