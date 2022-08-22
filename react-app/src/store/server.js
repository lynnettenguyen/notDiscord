const FIND_SERVER = 'servers/FIND_SERVER'


const findServer = (server) => ({
    type: FIND_SERVER,
    server
  })


export const getOneServer = (id) => async (dispatch) => {
  const response = await fetch(`/api/servers/${id}`);

  if (response.ok) {
    const server = await response.json();
    dispatch(findServer(server))
    return server;
  }
}


const singleServerReducer = (state = {}, action) => {
    let newState = {}
    switch (action.type) {
      case FIND_SERVER: {
        newState[action.server.id] = action.server
        return newState
      }

      default:
        return state;
    }
  }

  export default singleServerReducer;
