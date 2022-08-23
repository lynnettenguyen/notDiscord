import os
from flask import Flask, render_template, request, session, redirect, render_template
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from flask_socketio import SocketIO

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.server_routes import servers
# from .api.direct_message_routes import direct_messages
# from .api.channel_message_routes import channel_messages

from .seeds import seed_commands

from .config import Config

# import your socketio object (with the other imports at the
# top of the file)
from .socket import socketio



app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(servers, url_prefix='/api/servers')
# app.register_blueprint(direct_messages, url_prefix='/api/direct_messages')
# app.register_blueprint(channel_messages, url_prefix='/api/channel_messages')
db.init_app(app)
Migrate(app, db)

# initialize the app with the socket instance
socketio.init_app(app)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
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

<<<<<<< HEAD


# POSSIBLE WEBSOCKET ANSWER
# if os.environ.get("FLASK_ENV") == "production":
#     origins = [
#         "http://not-discord-app.herokuapp.com",
#         "https://not-discord-app.herokuapp.com"
#     ]
# else:
#     origins = "*"

# # create your SocketIO instance
# socketio = SocketIO(cors_allowed_origins=origins)
=======
# at the bottom of the file, use this to run the app
if __name__ == '__main__':
    socketio.run(app)
>>>>>>> 6809b76fc913f7edc94c6e016c2028249bb37ad3
