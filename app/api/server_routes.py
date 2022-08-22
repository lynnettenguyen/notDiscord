import json
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Server, Channel, ChannelMessage
from app.forms import ServerForm

servers = Blueprint('servers', __name__)

@servers.route("")
@login_required
# list all servers
def all_servers():
  servers = [server.to_dict() for server in Server.query.all()]
  # return {'servers': servers} # returns an object {servers: [{},{}]}
  return jsonify(servers) # returns an array [{},{}]

@servers.route("/<int:server_id>")
@login_required
# get server by id
def server_by_id(server_id):
  server = Server.query.get(server_id)
  return jsonify(server.to_dict())

@servers.route("", methods=['POST'])
@login_required
# create new server
def create_server():
  form = ServerForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    # create server
    server = Server(
      owner_id = current_user.id,
      name = form.data['name'],
      server_pic = form.data['server_pic']
    )

    db.session.add(server)
    db.session.commit()

    # create default "general" channel
    default_channel = Channel(
      server_id = server.id,
      name='general'
    )

    db.session.add(default_channel)
    db.session.commit()

    return jsonify(server.to_dict()), 201
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@servers.route("/<int:server_id>", methods=['PUT'])
@login_required
# edit server's name or picture by server id
def edit_serve(server_id):
  server = Server.query.get(server_id)
  update = request.json
  if 'name' in update.keys():
    server.name = update['name']
  if 'server_pic' in update.keys():
    server.server_pic = update['server_pic']
  db.session.commit()
  return jsonify(server.to_dict()), 200

@servers.route("/<int:server_id>", methods=['DELETE'])
@login_required
# delete server by id
def delete_server(server_id):
  server = Server.query.get(server_id)
  db.session.delete(server)
  db.session.commit()
  return jsonify({
    'message': 'Server successfully deleted',
    'status_code': 200
  }), 200
