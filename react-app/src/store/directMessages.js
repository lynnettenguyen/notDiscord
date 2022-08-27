const GET_DIRECT_CHAT = '/directMessages/GET_DIRECT_CHAT'
const LOAD_DIRECT_MESSAGES = '/directMessages/LOAD_DIRECT_MESSAGES'
const CREATE_DIRECT_MESSAGE = '/directMessages/CREATE_DIRECT_MESSAGE'
const EDIT_DIRECT_MESSAGE = '/directMessages/EDIT_DIRECT_MESSAGE'
const DELETE_DIRECT_MESSAGE = '/directMessages/DELETE_DIRECT_MESSAGE'

export const getDirectChat = (directChat) => ({
  type: GET_DIRECT_CHAT,
  directChat
})

export const loadDirectMessages = (directMessages) => ({
  type: LOAD_DIRECT_MESSAGES,
  directMessages
})

export const createDirectMessage = (directMessage) => ({
  type: CREATE_DIRECT_MESSAGE,
  directMessage
})

export const editDirectMessage = (directMessage) => ({
  type: EDIT_DIRECT_MESSAGE,
  directMessage
})

export const deleteDirectMessage = (directMessageId) => ({
  type: DELETE_DIRECT_MESSAGE,
  directMessageId
})

export const findDirectChat = (directChatId) => async (dispatch) => {
  const response = await fetch(`/api/direct/${directChatId}`);

  if (response.ok) {
    const directChat = await response.json();
    dispatch(getDirectChat(directChat))
    return directChat;
  }
}

export const getDirectMessages = (directChatId) => async (dispatch) => {
  const response = await fetch(`/api/direct/${directChatId}/messages`);

  if (response.ok) {
    const messages = await response.json();
    dispatch(loadDirectMessages(messages))
    return messages;
  }
}

export const updateDirectMessage = (directMessageData) => async (dispatch) => {
  const { message_id, sender_id, direct_chat_id, content } = directMessageData

  const response = await fetch(`/api/direct/${direct_chat_id}/messages/${message_id}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sender_id,
      direct_chat_id,
      content
    })
  })

  if (response.ok) {
    const message = await response.json();
    dispatch(editDirectMessage(message))
    return message;
  }
}


export const removeDirectMessage = (direct_chat_id, message_id) => async (dispatch) => {
  const response = await fetch(`/api/direct/${direct_chat_id}/messages/${message_id}`, {
    method: "DELETE"
  })

  if (response.ok) {
    const message = await response.json();
    dispatch(deleteDirectMessage(message_id))
    return message;
  }
}


const directMessagesReducer = (state = {}, action) => {
  let newState = {}
  switch (action.type) {
    case GET_DIRECT_CHAT: {
      let directChat = {}
      newState = { directChat }
      directChat[action.directChat.id] = action.directChat
      return newState;
    }
    case LOAD_DIRECT_MESSAGES: {
      newState = { ...state }
      action.directMessages.map(message => newState[message.id] = message)
      return newState
    }
    case CREATE_DIRECT_MESSAGE: {
      newState = { ...state }
      newState[action.directMessage.id] = action.directMessage;
      return newState
    }
    case EDIT_DIRECT_MESSAGE: {
      newState = { ...state }
      newState[action.directMessage.id] = action.directMessage;
      return newState
    }
    case DELETE_DIRECT_MESSAGE: {
      newState = { ...state }
      delete newState[action.directMessageId]
      return newState
    }
    default:
      return state;
  }
}

export default directMessagesReducer
