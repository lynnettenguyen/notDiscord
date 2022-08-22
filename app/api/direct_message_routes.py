import json
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from .auth_routes import login, validation_errors_to_error_messages
from app.models import db, DirectMessage, User, DirectChat
from app.forms import ServerForm, ChannelForm

servers = Blueprint('direct_messages', __name__)

# hi 
