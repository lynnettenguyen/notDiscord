const LIST_SERVERS = 'servers/LIST_SERVERS'
const CREATE_SERVER = 'servers/CREATE_SERVER'
const EDIT_SERVER = 'servers/EDIT_SERVER'
const DELETE_SERVER = 'servers/DELETE_SERVER'

export const allServers = (state) => Object.values(state.servers)

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

const serverReducer = (state = {}, action) => {
  let newState = {}
  switch (action.type) {
    case LIST_SERVERS: {
      for (let server of action.servers) newState[server.id] = server
      return newState
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
    default:
      return state;
  }
}

export default serverReducer
