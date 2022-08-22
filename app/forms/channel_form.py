from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class ChannelForm(FlaskForm):
   name = StringField('name', validators=[DataRequired()])
   topic = StringField('topic')
   channel_pic = StringField('server_pic')
