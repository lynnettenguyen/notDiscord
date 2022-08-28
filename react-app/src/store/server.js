const FIND_SERVER = 'server/FIND_SERVER'
const SERVER_RESET = 'server/SERVER_RESET'
const GET_CHANNELS = 'server/GET_CHANNELS'
const CREATE_CHANNELS = 'server/CREATE_CHANNEL'
const EDIT_CHANNEL = 'server/EDIT_CHANNEL'
const DELETE_CHANNEL = 'server/DELETE_CHANNEL'

const findServer = (server) => ({
  type: FIND_SERVER,
  server
})

const getChannelsAction = (channels) => ({
  type: GET_CHANNELS,
  channels
})

export const resetServer = () => ({
  type: SERVER_RESET
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

export const getOneServer = (id) => async (dispatch) => {
  const response = await fetch(`/api/servers/${id}`);

  if (response.ok) {
    const server = await response.json();
    dispatch(findServer(server))
    return server;
  }
}

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


const singleServerReducer = (state = {}, action) => {
  let newState = {}
  switch (action.type) {
    case FIND_SERVER: {
      // newState = { ...state }
      newState[action.server.id] = action.server
      // return { ...state, ...newState }
      return newState
    }
    case SERVER_RESET: {
      return newState
    }
    case GET_CHANNELS: {
      let channels = {}
      newState = { ...state, channels }
      action.channels.map(channel => newState.channels[channel.id] = channel)
      return newState
    }
    case CREATE_CHANNELS: {
      newState = { ...state }
      newState.channels[action.newChannel.id] = action.newChannel;
      return newState
    }
    case EDIT_CHANNEL: {
      newState = { ...state }
      newState.channels[action.channel.id] = action.channel;
      return newState
    }
    case DELETE_CHANNEL: {
      newState = { ...state }
      delete newState.channels[action.channelId]
      return newState
    }
    default:
      return state;
  }
}

export default singleServerReducer;
