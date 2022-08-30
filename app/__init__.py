import os
from flask import Flask, request, redirect
from .config import Config
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from flask_socketio import SocketIO, emit
from .models import db, User, ChannelMessage, DirectMessage
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.server_routes import servers
from .api.channel_message_routes import channel_messages
from .api.direct_chat_routes import direct_chats
from .seeds import seed_commands


app = Flask(__name__)


# setup login manager
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


# application Security
CORS(app)


# since we are deploying with Docker and Flask, we won't be using a buildpack when we deploy to Heroku; in production any request made over http is redirected to https.
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

    db.session.add(message)
    db.session.commit()
    emit('chat', data, broadcast=True)


# handle chat messages
@socketio.on('direct_chat')
def handle_direct_chat(data):

    direct_message = DirectMessage(
        sender_id=data['sender_id'],
        direct_chat_id = data['direct_chat_id'],
        content=data['content']
    )

    db.session.add(direct_message)
    db.session.commit()
    emit('direct_chat', data, broadcast=True)


# at the bottom of the file, use this to run the app
if __name__ == '__main__':
    socketio.run(app)
