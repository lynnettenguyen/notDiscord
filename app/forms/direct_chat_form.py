from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class DirectChatForm(FlaskForm):
   sender_id = IntegerField('sender_id', validators=[DataRequired()])
   recipient_id = IntegerField('recipient_id', validators=[DataRequired()])
