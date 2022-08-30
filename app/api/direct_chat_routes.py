from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from app.models import db, DirectMessage, DirectChat
from app.forms import MessageForm
from sqlalchemy import or_


direct_chats = Blueprint('direct_chats', __name__)


# get all direct chat channels
@direct_chats.route('')
@login_required
def all_direct_chats():
  chats = [chat.to_dict() for chat in DirectChat.query.filter(or_(current_user.id == DirectChat.recipient_id, current_user.id == DirectChat.sender_id)).all()]
  return jsonify(chats)


# get direct chat by direct_chat_id
@direct_chats.route('/<int:direct_chat_id>')
@login_required
def one_direct_chat(direct_chat_id):
  chat = DirectChat.query.get(direct_chat_id)
  return jsonify(chat.to_dict())


# create new direct chat channel
@direct_chats.route('', methods=['POST'])
@login_required
def create_direct_chat():
  data = request.json
  chat = DirectChat.query.filter(DirectChat.sender_id == current_user.id, DirectChat.recipient_id == data['recipient_id']).first()

  if chat is None:
      new_chat = DirectChat(
      sender_id = current_user.id,
      recipient_id = data['recipient_id'],
    )

      db.session.add(new_chat)
      db.session.commit()
      return jsonify(new_chat.to_dict()), 201


# delete direct chat channel
@direct_chats.route('/<int:direct_chat_id>', methods=['DELETE'])
@login_required
def delete_direct_chat(direct_chat_id):
  direct_chat = DirectChat.query.get(direct_chat_id)

  if direct_chat.sender_id == current_user.id or direct_chat.recipient_id == current_user.id:
    db.session.delete(direct_chat)
    db.session.commit()

    return jsonify({
      'message': 'Server successfully deleted',
      'status_code': 200
    }), 200

  else:
    return {'errors': ['Unauthorized']}, 401


# get all direct chat messages
@direct_chats.route('/<int:direct_chat_id>/messages')
@login_required
def get_direct_messages(direct_chat_id):
  all_direct_messages = DirectMessage.query.filter(DirectMessage.direct_chat_id == direct_chat_id).order_by(DirectMessage.created_at).all()
  messages = [message.to_dict() for message in all_direct_messages]
  return jsonify(messages), 200


# create direct message
@direct_chats.route('/<int:direct_chat_id>', methods=['POST'])
@login_required
def create_direct_message(direct_chat_id):
  form = MessageForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():

    message = DirectMessage(
      sender_id = current_user.id,
      direct_chat_id = direct_chat_id,
      content = form.data['content']
    )

    db.session.add(message)
    db.session.commit()
    return jsonify(message.to_dict()), 201

  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# edit direct message
@direct_chats.route('/<int:direct_chat_id>/messages/<int:message_id>', methods=['PUT'])
@login_required
def edit_channel_message(direct_chat_id, message_id):
  form = MessageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  message = DirectMessage.query.filter(DirectMessage.id == message_id, DirectMessage.direct_chat_id == direct_chat_id).first()
  update = request.json

  if current_user.id == message.user_id:
    message.content = update['content']
    db.session.commit()
    return jsonify(message.to_dict()), 200

  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# delete direct message
@direct_chats.route('/<int:direct_chat_id>/messages/<int:message_id>', methods=['DELETE'])
@login_required
def delete_direct_message(direct_chat_id, message_id):
    message = DirectMessage.query.filter(DirectMessage.id == message_id, DirectMessage.direct_chat_id == direct_chat_id).first()

    if current_user.id == message.user_id:
      db.session.delete(message)
      db.session.commit()

      return jsonify({
        'message': 'Message successfully deleted',
        'status_code': 200
      }), 200
