import os
from flask import Flask, request, redirect
from .config import Config
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from flask_socketio import SocketIO, emit

from .models import db, User, ChannelMessage, DirectMessage, DirectChat
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.server_routes import servers
from .api.channel_message_routes import channel_messages
from .api.direct_chat_routes import direct_chats

from .seeds import seed_commands


app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        "http://not-discord-app.herokuapp.com",
        "https://not-discord-app.herokuapp.com"
    ]
else:
    origins = "*"


# initialize socket instance
socketio = SocketIO(cors_allowed_origins=origins)


@login.user_loader
def load_user(id):
    return User.query.get(int(id))



app.config.from_object(Config)

app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(servers, url_prefix='/api/servers')
app.register_blueprint(channel_messages, url_prefix='/api')
app.register_blueprint(direct_chats, url_prefix='/api/direct')

db.init_app(app)
Migrate(app, db)

app.cli.add_command(seed_commands)

# initialize the app with the socket instance
socketio.init_app(app)


# Application Security
CORS(app)


# Since we are deploying with Docker and Flask, we won't be using a buildpack when we deploy to Heroku. Therefore, we need to make sure that in production any request made over http is redirected to https.
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')


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









# handle chat messages
@socketio.on('direct_chat')
def handle_direct_chat(data):

    reciever = DirectChat(
            id = data['id'],
            sender_id = data['sender_id'],
            recipient_id = ['recipient_id']
    )

    sender = DirectMessage(
        direct_chat_id = data['direct_chat_id'],
        sender_id=data['sender_id'],
        created_at=data['created_at'],
        content=data['content']
    )

    db.session.add(sender)
    db.session.add(reciever)
    db.session.commit()

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
# @socketio.on('load_direct_messages')
# def direct_messages(data):
#   emit('load_direct_messages', data, broadcast=True)


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


# at the bottom of the file, use this to run the app
if __name__ == '__main__':
    socketio.run(app)
