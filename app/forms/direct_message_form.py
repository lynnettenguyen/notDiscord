from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

data = [DataRequired()]

class DirectMessageForm(FlaskForm):
    content = StringField('Content', validators=data)
    SubmitField = SubmitField('Send Message')