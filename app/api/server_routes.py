from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Server, Channel
from app.forms import ServerForm, ChannelForm


servers = Blueprint('servers', __name__)


@servers.route("")
@login_required
# list all servers
def all_servers():
  servers = Server.query.all()

  server_details = []

  if servers is not None:
    for server in servers:
      server_id = server.to_dict()['id']
      server = server.to_dict()

      channels = db.session.query(Channel).filter(Channel.server_id == server_id)

      # channel_dict = {}

      # for channel in channels:
      #   channel_dict[channel.to_dict()['id']] = channel.to_dict()

      # server['channels'] = channel_dict
      server['channels'] = [channel.to_dict() for channel in channels]

      server_details.append(server)


  # return {'servers': servers} # returns an object {servers: [{},{}]}
  return jsonify(server_details) # returns an array [{},{}]


@servers.route("/<int:server_id>")
@login_required
# get server by id
def server_by_id(server_id):
  server = db.session.query(Server).get(server_id)
  channels = db.session.query(Channel).filter(Channel.server_id == server_id)

  if server is not None:
    server_details = []
    server = server.to_dict()

    channel_dict = {}

    for channel in channels:
      channel_dict[channel.to_dict()['id']] = channel.to_dict()

    server['channels'] = channel_dict

  server_details.append(server)

  return jsonify(server_details)


@servers.route("", methods=['POST'])
@login_required
# create new server
def create_server():
  form = ServerForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():

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
def edit_server(server_id):
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


@servers.route("/<int:server_id>/channels")
@login_required
# get all server's channels
def get_channels(server_id):
  server = Server.query.get(server_id)
  channels = [channel.to_dict() for channel in server.channels]
  return jsonify(channels)


@servers.route("/<int:server_id>/channels", methods=['POST'])
@login_required
# create new channels within servers
def create_channel(server_id):
  form = ChannelForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    # create channel
    channel = Channel(
      server_id = server_id,
      name=form.data['name'],
      topic=form.data['topic']
    )

    db.session.add(channel)
    db.session.commit()

    return jsonify(channel.to_dict()), 201

  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@servers.route("/<int:server_id>/channels/<int:channel_id>", methods=['PUT'])
@login_required
# edit channel's name or topic by channel id
def edit_channel(server_id, channel_id):
  channel = Channel.query.filter(Channel.id == channel_id, Channel.server_id == server_id).first()
  update = request.json

  if 'name' in update.keys():
    channel.name = update['name']
  if 'topic' in update.keys():
    channel.topic = update['topic']

  db.session.commit()
  return jsonify(channel.to_dict()), 200


@servers.route("/<int:server_id>/channels/<int:channel_id>", methods=['DELETE'])
@login_required
# delete channel by id
def delete_channel(server_id, channel_id):
  channel = Channel.query.filter(Channel.id == channel_id, Channel.server_id == server_id).first()
  db.session.delete(channel)
  db.session.commit()

  return jsonify({
    'message': 'Server successfully deleted',
    'status_code': 200
  }), 200
