from flask_socketio import SocketIO, emit
import os


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
<<<<<<< HEAD
    print('!!!!!!', data)
=======
>>>>>>> e6e4029746b31271fa67d0d01126b52bdc1341cc
    emit("chat", data, broadcast=True)
