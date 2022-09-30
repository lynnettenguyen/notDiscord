const FIND_SERVER = 'server/FIND_SERVER'
const SERVER_RESET = 'server/SERVER_RESET'

const findServer = (server) => ({
  type: FIND_SERVER,
  server
})

export const resetServer = () => ({
  type: SERVER_RESET
})

export const getOneServer = (id) => async (dispatch) => {
  const response = await fetch(`/api/servers/${id}`);

  if (response.ok) {
    const server = await response.json();
    dispatch(findServer(server))
    console.log("---------------------_", server[0])
    return server;
  }
}


const singleServerReducer = (state = {}, action) => {
  let newState = {}
  switch (action.type) {
    case FIND_SERVER: {
      newState[action.server[0].id] = action.server[0]
      return newState
    }
    case SERVER_RESET: {
      return newState
    }
    default:
      return state;
  }
}

export default singleServerReducer;
