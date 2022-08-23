from email import message
from flask_socketio import SocketIO, emit
import os
from app.models import db, ChannelMessage


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

    db.session.add(message)
    db.session.commit()

    emit("chat", data, broadcast=True)
