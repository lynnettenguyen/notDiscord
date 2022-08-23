const FIND_SERVER = 'server/FIND_SERVER'
const SERVER_RESET = 'server/SERVER_RESET'
const GET_CHANNELS = 'server/GET_CHANNELS'

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


const singleServerReducer = (state = {}, action) => {
    let newState = {}
    switch (action.type) {
      case FIND_SERVER: {
        newState[action.server.id] = action.server
        return newState
      }

      case SERVER_RESET: {
        return newState
      }

      case GET_CHANNELS: {
        let channels = {}
        newState = {...state, channels}
        action.channels.map(channel => newState.channels[channel.id] = channel)
        return newState
      }

      default:
        return state;
    }
  }

  export default singleServerReducer;
