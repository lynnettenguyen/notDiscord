from email import message
from flask_socketio import SocketIO, emit
import os
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
@socketio.on("chat")
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
    emit("chat", data, broadcast=True)
