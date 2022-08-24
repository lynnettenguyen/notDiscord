import os
from flask_socketio import SocketIO, emit
from flask_login import current_user, login_required
from app.models import db, Channel, ChannelMessage


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        "http://not-discord-app.herokuapp.com",
        "https://not-discord-app.herokuapp.com"
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle chat messages
@socketio.on('chat')
def handle_chat(data):

    message = ChannelMessage(
        user_id=data['user_id'],
        channel_id=data['channel_id'],
        content = data['content']
    )

    # messages = db.session.query(Channel.channel_messages).filter(id == data['channel_id'])

    db.session.add(message)
    db.session.commit()

    # emit("chat", [message.to_dict() for message in messages], broadcast=True)
    emit('chat', data, broadcast=True)


# load all channel messages
@socketio.on('load_channel_messages')
def channel_messages(data):
#   message = ChannelMessage(
#     user_id = current_user.id,
#     channel_id = data['channel_id'],
#     content = data['content']
#   )

#   all_channel_messages = db.session.query(ChannelMessage).filter(ChannelMessage.channel_id == data['channel_id']).order_by(ChannelMessage.created_at).all()

  emit('load_channel_messages', data, broadcast=True)

# load all direct messages
@socketio.on('load_direct_messages')
def direct_messages(data):
  emit('load_direct_messages', data, broadcast=True)


# # reload all channel messages when users send new messages to the channel
# @socketio.on('new_message')
# @login_required
# def new_message_in_channel(data):
#   room = f"channel{data['channel_id']}"

#   all_channel_messages = db.session.query(ChannelMessage).filter(ChannelMessage.channel_id == data['channel_id']).order_by(ChannelMessage.created_at).all()

#   emit('reload_channel_messages', [message.to_dict() for message in all_channel_messages], room=room)

# # adds user to channel
# @socketio.on('join_channel')
# @login_required
# def join_channel(data):
#   user = current_user
#   room = f"channel{data['channel_id']}"
#   join_room(room)


# # removes user from channel
# @socketio.on('leave_channel')
# @login_required
# def leave_channel(data):
#   user = current_user
#   room = f"channel{data['channel_id']}"
#   leave_room(room)
