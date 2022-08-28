const LIST_SERVERS = 'servers/LIST_SERVERS'
const CREATE_SERVER = 'servers/CREATE_SERVER'
const EDIT_SERVER = 'servers/EDIT_SERVER'
const DELETE_SERVER = 'servers/DELETE_SERVER'

const GET_CHANNELS = 'server/GET_CHANNELS'
const CREATE_CHANNELS = 'server/CREATE_CHANNEL'
const EDIT_CHANNEL = 'server/EDIT_CHANNEL'
const DELETE_CHANNEL = 'server/DELETE_CHANNEL'

const SERVER_RESET = 'server/SERVER_RESET'

const listServers = (servers) => ({
  type: LIST_SERVERS,
  servers
})

const createServer = (newServer) => ({
  type: CREATE_SERVER,
  newServer
})

const editServer = (server) => ({
  type: EDIT_SERVER,
  server
})

const deleteServerAction = (serverId) => ({
  type: DELETE_SERVER,
  serverId
})

const getChannelsAction = (serverId, channels) => ({
  type: GET_CHANNELS,
  payload: {
    serverId,
    channels
  }
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

export const resetServer = () => ({
  type: SERVER_RESET
})


export const listAllServers = () => async (dispatch) => {
  const response = await fetch(`/api/servers`);

  if (response.ok) {
    const servers = await response.json();
    dispatch(listServers(servers))
    return servers;
  }
}

export const addServer = (serverData) => async (dispatch) => {
  const { name, server_pic } = serverData
  const response = await fetch(`/api/servers`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      server_pic
    })
  })
  if (response.ok) {
    const newServer = await response.json();
    dispatch(createServer(newServer))
    return newServer;
  }
}

export const updateServer = (serverData) => async (dispatch) => {
  const { id, name, server_pic } = serverData
  const response = await fetch(`/api/servers/${id}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      server_pic
    })
  })
  if (response.ok) {
    const server = await response.json();
    dispatch(editServer(server))
    return server;
  }
}

export const deleteServer = (id) => async (dispatch) => {
  const response = await fetch(`/api/servers/${id}`, {
    method: "DELETE"
  })
  if (response.ok) {
    const server = await response.json();
    dispatch(deleteServerAction(id))
    return server;
  }
}

export const getChannels = (id) => async (dispatch) => {
  const response = await fetch(`/api/servers/${id}/channels`);

  if (response.ok) {
    const channels = await response.json();
    dispatch(getChannelsAction(id, channels))
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


const serverReducer = (state = {}, action) => {
  let newState = {}
  switch (action.type) {
    case LIST_SERVERS: {
      for (let server of action.servers) newState[server.id] = server
      return { ...state, ...newState }
    }
    case CREATE_SERVER: {
      newState = { ...state }
      newState[action.newServer.id] = action.newServer;
      return newState
    }
    case EDIT_SERVER: {
      newState = { ...state }
      newState[action.server.id] = action.server;
      return newState
    }
    case DELETE_SERVER: {
      newState = { ...state }
      delete newState[action.serverId]
      return newState
    }
    case GET_CHANNELS: {
      // let channels = {}
      // newState = { ...state, channels }
      // action.channels.map(channel => newState.channels[channel.id] = channel)
      // return newState
      newState = { ...state }
      newState[action.payload.serverId].channels = {}
      // action.payload.channels.map(channel => newState[action.payload.serverId].channels = channel)
      for (let channel of action.payload.channels) newState[action.payload.serverId].channels = channel
      return { ...newState }

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
    case SERVER_RESET: {
      return newState
    }
    default:
      return state;
  }
}

export default serverReducer
