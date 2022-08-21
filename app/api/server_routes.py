from flask import Blueprint, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Server, Channel, ChannelMessage

servers = Blueprint('servers', __name__, url_prefix='/servers')

@servers.route("/")
def all_servers():
  servers = [server.to_dict() for server in Server.query.all()]
  print(servers)
