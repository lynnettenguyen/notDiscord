const LOAD_DIRECT_CHATS = '/directChat/LOAD_DIRECT_CHATS'
const ADD_DIRECT_CHAT = '/directChat/ADD_DIRECT_CHAT'
const DELETE_DIRECT_CHAT = '/directChat/DELETE_DIRECT_CHAT'


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
    default:
      return state;
  }
}

export default directChatReducer
