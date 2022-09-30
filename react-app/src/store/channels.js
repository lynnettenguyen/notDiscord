const GET_CHANNELS = 'server/GET_CHANNELS'
const CREATE_CHANNELS = 'server/CREATE_CHANNEL'
const EDIT_CHANNEL = 'server/EDIT_CHANNEL'
const DELETE_CHANNEL = 'server/DELETE_CHANNEL'

const getChannelsAction = (channels) => ({
  type: GET_CHANNELS,
  channels
})

export const createChannel = (newChannel) => ({
  type: CREATE_CHANNELS,
  newChannel
})

export const editChannel = (channel) => ({
  type: EDIT_CHANNEL,
  channel
})

export const deleteChannel = (channelId) => ({
  type: DELETE_CHANNEL,
  channelId
})

export const getChannels = (id) => async (dispatch) => {
  const response = await fetch(`/api/servers/${id}/channels`);

  if (response.ok) {
    const channels = await response.json();
    dispatch(getChannelsAction(channels))
    return channels;
  }
}


export const addChannel = (channelData) => async (dispatch) => {
  const { server_id, name, topic } = channelData
  const response = await fetch(`/api/servers/${server_id}/channels`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      topic
    })
  })

  if (response.ok) {
    const newChannel = await response.json();
    dispatch(createChannel(newChannel))
    return newChannel;
  }
}

export const updateChannel = (channelData) => async (dispatch) => {
  const { server_id, id, name, topic } = channelData
  const response = await fetch(`/api/servers/${server_id}/channels/${id}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      topic
    })
  })

  if (response.ok) {
    const channel = await response.json();
    dispatch(editChannel(channel))
    return channel;
  }
}


export const removeChannel = (server_id, channel_id) => async (dispatch) => {
  const response = await fetch(`/api/servers/${server_id}/channels/${channel_id}`, {
    method: "DELETE"
  })

  if (response.ok) {
    const channel = await response.json();
    dispatch(deleteChannel(channel_id))
    return channel;
  }
}


const channelsReducer = (state = {}, action) => {
  let newState = {}
  switch (action.type) {
    case GET_CHANNELS: {
      for (let channel of action.channels) newState[channel.id] = channel
      return newState
    }
    case CREATE_CHANNELS: {
      newState = { ...state }
      newState[action.newChannel.id] = action.newChannel;
      return newState
    }
    case EDIT_CHANNEL: {
      newState = { ...state }
      newState[action.channel.id] = action.channel;
      return newState
    }
    case DELETE_CHANNEL: {
      newState = { ...state }
      delete newState[action.channelId]
      return newState
    }
    default:
      return state;
  }
}

export default channelsReducer;
