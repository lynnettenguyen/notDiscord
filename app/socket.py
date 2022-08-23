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
=======
    print('!!!!!!', data)
>>>>>>> 33c7d781ad08384020bd5b8a41af9d4220dcb96e
    emit("chat", data, broadcast=True)
