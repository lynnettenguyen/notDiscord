const LIST_SERVERS = 'servers/LIST_SERVERS'
const FIND_SERVER = 'servers/FIND_SERVER'
const CREATE_SERVER = 'servers/CREATE_SERVER'
const EDIT_SERVER = 'servers/EDIT_SERVER'
const DELETE_SERVER = 'servers/DELETE_SERVER'

export const allServers = (state) => Object.values(state.servers).all()


const listServers = (servers) => ({
  type: LIST_SERVERS,
  servers
})

// const findServer = (server) => ({
//   type: FIND_SERVER,
//   server
// })

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
    console.log("!!!!!!!!!", servers)
    dispatch(listServers(servers))
  }
}

const serverReducer = (state = {}, action) => {
  const newState = {}
  switch (action.type) {
    case LIST_SERVERS: {
      for (let server of action.servers) newState[server.id] = server
      return newState
    }
    case FIND_SERVER: {

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
