from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class ServerForm(FlaskForm):
   name = StringField('name', validators=[DataRequired()])
   server_pic = StringField('server_pic')
