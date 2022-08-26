const LOAD_DIRECT_CHATS = '/directChat/LOAD_DIRECT_CHATS'
const ADD_DIRECT_CHAT = '/directChat/ADD_DIRECT_CHAT'
const DELETE_DIRECT_CHAT = '/directChat/DELETE_DIRECT_CHAT'
const LOAD_DIRECT_MESSAGES = '/directMessages/LOAD_DIRECT_MESSAGES'
const CREATE_DIRECT_MESSAGE = '/directMessages/CREATE_DIRECT_MESSAGE'
const EDIT_DIRECT_MESSAGE = '/directMessages/EDIT_DIRECT_MESSAGE'
const DELETE_DIRECT_MESSAGE = '/directMessages/DELETE_DIRECT_MESSAGE'

export const loadDirectChats = (chats) => ({
  type: LOAD_DIRECT_CHATS,
  chats
})

export const addDirectChat = (newChat) => ({
  type: ADD_DIRECT_CHAT,
  newChat
})

export const deleteDirectChat = (chatId) => ({
  type: DELETE_DIRECT_CHAT,
  chatId
})

export const loadDirectMessages = (messages) => ({
  type: LOAD_DIRECT_MESSAGES,
  messages
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

export const getDirectChats = () => async (dispatch) => {
  const response = await fetch(`/api/direct`);

  if (response.ok) {
    const chats = await response.json();
    dispatch(loadDirectChats(chats))
    return chats;
  }
}

export const createDirectChat = (directChatData) => async (dispatch) => {
  const { sender_id, recipient_id } = directChatData

  const response = await fetch(`/api/direct`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sender_id,
      recipient_id
    })
  })


  if (response.ok) {
    const chat = await response.json();
    dispatch(addDirectChat(chat))
    return chat;
  }
}

export const removeDirectChat = (direct_chat_id) => async (dispatch) => {
  const response = await fetch(`/api/direct/${direct_chat_id}`, {
    method: "DELETE"
  })

  if (response.ok) {
    const chat = await response.json();
    dispatch(deleteDirectChat(direct_chat_id))
    return chat;
  }
}

export const getDirectMessages = (direct_chat_id) => async (dispatch) => {
  const response = await fetch(`/api/direct/${direct_chat_id}/messages`);

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


const directChatReducer = (state = {}, action) => {
  let newState = {}
  switch (action.type) {
    case LOAD_DIRECT_CHATS: {
      action.chats.forEach((chat) => {
        newState[chat.id] = chat
      })
      return newState
    }
    case ADD_DIRECT_CHAT: {
      newState = { ...state }
      newState[action.newChat.id] = action.newChat;
      return newState
    }
    case DELETE_DIRECT_CHAT: {
      newState = { ...state }
      delete newState[action.chatId]
      return newState
    }
    case LOAD_DIRECT_MESSAGES: {
      action.messages.forEach((message, i) => {
        newState[i] = message
      })
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

export default directChatReducer
