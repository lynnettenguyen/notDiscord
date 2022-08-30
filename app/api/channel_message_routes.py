from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, ChannelMessage
from app.forms import MessageForm
from .auth_routes import validation_errors_to_error_messages


channel_messages = Blueprint('channel_messages', __name__)


# get all channel messages
@channel_messages.route('/channels/<int:channel_id>/messages')
@login_required
def get_channel_messages(channel_id):
  all_channel_messages = db.session.query(ChannelMessage).filter(ChannelMessage.channel_id == channel_id).order_by(ChannelMessage.created_at).all()

  messages = [message.to_dict() for message in all_channel_messages]
  return jsonify(messages)


# create channel message
@channel_messages.route('/channels/<int:channel_id>/messages/', methods=['POST'])
@login_required
def create_channel_message(channel_id):
  form = MessageForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():

    message = ChannelMessage(
      user_id = current_user.id,
      channel_id = channel_id,
      content = form.data['content']
    )

    db.session.add(message)
    db.session.commit()

  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# edit channel message
@channel_messages.route('/channels/<int:channel_id>/messages/<int:message_id>', methods=['PUT'])
@login_required
def edit_channel_message(channel_id, message_id):
  form = MessageForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    message = ChannelMessage.query.filter(ChannelMessage.id == message_id, ChannelMessage.channel_id == channel_id).first()

    if current_user.id == message.user_id:
      message.content = form.data['content']

      db.session.commit()

  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# delete channel message
@channel_messages.route('/channels/<int:channel_id>/messages/<int:message_id>', methods=['DELETE'])
@login_required
def delete_channel_message(channel_id, message_id):

    message = ChannelMessage.query.filter(ChannelMessage.id == message_id, ChannelMessage.channel_id == channel_id).first()

    if current_user.id == message.user_id:
      db.session.delete(message)
      db.session.commit()
