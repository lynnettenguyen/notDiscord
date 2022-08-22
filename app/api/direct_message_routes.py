import json
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from .auth_routes import login, validation_errors_to_error_messages
from app.models import db, DirectMessage, User, DirectChat
from app.forms import ServerForm, ChannelForm

direct_messages = Blueprint('direct_messages', __name__)


@direct_messages.route("/<int:sender_id>")
@login_required
# get all direct messages by direct_chat_id
def direct_messages_by_id(sender_id):
  pass
