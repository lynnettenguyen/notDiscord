const FIND_SERVER = 'server/FIND_SERVER'
const SERVER_RESET = 'server/SERVER_RESET'
const GET_CHANNELS = 'server/GET_CHANNELS'

const findServer = (server) => ({
    type: FIND_SERVER,
    server
})

const getChannelsAction = (serverId, channels) => ({
  type: GET_CHANNELS,
  serverId,
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
    console.log('...........', channels)
    dispatch(getChannelsAction(id, channels))
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

      // case GET_CHANNELS: {
      //   newState = {...state}
      //   newState[action.serverId] =
      //   return newState
      // }

      default:
        return state;
    }
  }

  export default singleServerReducer;
