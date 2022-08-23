

channel_messages = Blueprint('chat_messages', __name__)

# get all channel messages
@channel_messages.route("/int:channel_id")
@login_required
def channel_messages_by_channel(channel_id):
  cms = ChannelForm.query.all(channel_id)
  return jsonify(cms.to_dict())



@channel_messages.route("/<int:channel_id>", methods=['POST'])
@login_required
def create_new_channel_message():
  pass
