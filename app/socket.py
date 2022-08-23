from flask_socketio import SocketIO, emit
import os
from app.models.channel_message import ChannelMessage
from .models import db


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
    print('Message: ' + data)
    message = ChannelMessage(message=data)
    db.session.add(message)
    db.session.commit()

    emit("chat", data, broadcast=True)
