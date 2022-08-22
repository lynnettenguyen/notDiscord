import json
from flask import Blueprint, jsonify, request, render_template
from flask_login import current_user, login_required
from .auth_routes import login, validation_errors_to_error_messages
from app.models import db, DirectMessage, User, DirectChat
from app.forms import ServerForm, ChannelForm
from flask_socketio import SocketIO, join_room

direct_messages = Blueprint('direct_messages', __name__)
socketio = SocketIO(direct_messages)


# get all direct messages by sender_id
@direct_messages.route("/<int:sender_id>")
@login_required
def direct_messages_by_sender(sender_id):
  dms = DirectMessage.query.all(sender_id)
  return jsonify(dms.to_dict())

@direct_messages.route("/<int:direct_chat_id>", methods=['POST'])
@login_required
def create_new_direct_message():
  pass
# websocket potentially 
