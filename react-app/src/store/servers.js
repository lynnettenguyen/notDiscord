const LIST_SERVERS = 'servers/LIST_SERVERS'
const CREATE_SERVER = 'servers/CREATE_SERVER'
const EDIT_SERVER = 'servers/EDIT_SERVER'
const DELETE_SERVER = 'servers/DELETE_SERVER'

export const allServers = (state) => Object.values(state.servers)

const listServers = (servers) => ({
  type: LIST_SERVERS,
  servers
})

// const createServer = (newServer) => {
//   type: CREATE_SERVER,
//     newServer
// }

// const editServer = (server) => ({
//   type: EDIT_SERVER,
//   server
// })

// const deleteServer = (serverId) => {
//   type: DELETE_SERVER,
//     serverId
// }

export const listAllServers = () => async (dispatch) => {
  const response = await fetch(`/api/servers`);

  if (response.ok) {
    const servers = await response.json();
    dispatch(listServers(servers))
    return servers;
  }
}


const serverReducer = (state = {}, action) => {
  let newState = {}
  switch (action.type) {
    case LIST_SERVERS: {
        for (let server of action.servers) newState[server.id] = server
      return newState
    }

    case CREATE_SERVER: {

    }

    case EDIT_SERVER: {

    }

    case DELETE_SERVER: {

    }

    default:
      return state;
  }
}

export default serverReducer
