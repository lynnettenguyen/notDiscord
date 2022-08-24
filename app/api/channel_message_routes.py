from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from .. import socketio
from flask_socketio import emit, join_room, leave_room
from app.models import db, ChannelMessage

channel_messages = Blueprint('channel_messages', __name__)


# load all channel messages
@socketio.on('channel_messages')
@login_required
def channel_messages_by_channel(data):
  message = ChannelMessage(
    user_id = current_user.id,
    channel_id = data['channel_id'],
    content = data['content']
  )

  room = f"channel{data['channel_id']}"

  all_channel_messages = db.session.query(ChannelMessage).filter(ChannelMessage.channel_id == data['channel_id']).order_by(ChannelMessage.created_at).all()

  emit('load_channel_messages', [message.to_dict() for message in all_channel_messages], room=room)

# reload all channel messages when users send new messages to the channel
@socketio.on('new_message')
@login_required
def new_message_in_channel(data):
  room = f"channel{data['channel_id']}"

  all_channel_messages = db.session.query(ChannelMessage).filter(ChannelMessage.channel_id == data['channel_id']).order_by(ChannelMessage.created_at).all()

  emit('reload_channel_messages', [message.to_dict() for message in all_channel_messages], room=room)


@socketio.on('join_channel')
@login_required
def join_channel(data):
  user = current_user
  room = f"channel{data['channel_id']}"
  join_room(room)


@socketio.on('leave_channel')
@login_required
def leave_channel(data):
  user = current_user
  room = f"channel{data['channel_id']}"
  leave_room(room)
