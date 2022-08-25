const LOAD_CHANNEL_MESSAGES = '/messages/LOAD_CHHANNEL_MESSAGES'
const ADD_CHANNEL_MESSAGE = '/messages/ADD_CHANNEL_MESSAGE'
const EDIT_CHANNEL_MESSAGE = '/messages/EDIT_CHANNEL_MESSAGE'
const DELETE_CHANNEL_MESSAGE = '/messages/DELETE_CHANNEL_MESSAGE'

export const loadChannelMessages = (messages) => ({
  type: LOAD_CHANNEL_MESSAGES,
  messages
})

export const addChannelMessages = (channelMessage) => ({
  type: ADD_CHANNEL_MESSAGE,
  channelMessage
})

export const editChannelMessages = (channelMessage) => ({
  type: EDIT_CHANNEL_MESSAGE,
  channelMessage
})

export const deleteChannelMessages = (channelMessageId) => ({
  type: EDIT_CHANNEL_MESSAGE,
  channelMessageId
})

export const getChannelMessages = (channelId) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channelId}/messages`)

  if (response.ok) {
    const messages = await response.json();
    dispatch(loadChannelMessages(messages))
    return messages;
  }
}

export const createChannelMessage = (channelMessageData) => async (dispatch) => {
  const { channel_id, content } = channelMessageData

  const response = await fetch(`/api/channels/${channel_id}/messages/`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content
    })
  })

  if (response.ok) {
    const message = await response.json();
    dispatch(addChannelMessages(message))
    return message;
  }
}

export const updateChannelMessage = (channelMessageData) => async (dispatch) => {
  const { channel_id, id, content } = channelMessageData

  const response = await fetch(`/api/channels/${channel_id}/messages/${id}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content
    })
  })

  if (response.ok) {
    const message = await response.json();
    dispatch(editChannelMessages(message))
    return message;
  }
}

export const removeChannelMessage = (channel_id, channel_message_id) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channel_id}/messages/${channel_message_id}`, {
    method: "DELETE"
  })

  if (response.ok) {
    const message = await response.json();
    dispatch(deleteChannelMessages(channel_id))
    return message;
  }
}


const channelMessagesReducer = (state = {}, action) => {
  let newState = {}
  switch (action.type) {
    case LOAD_CHANNEL_MESSAGES: {
      action.messages.forEach((each, i) => {
        newState[i] = each
      })
      return newState
    }
    case ADD_CHANNEL_MESSAGE: {
      newState[action.channelMessage.id] = action.channelMessage;
      return newState
    }
    case EDIT_CHANNEL_MESSAGE: {
      newState[action.channelMessage.id] = action.channelMessage;
      return newState
    }
    case DELETE_CHANNEL_MESSAGE: {
      delete newState[action.channelMessage]
      return newState
    }
    default:
      return state;
  }
}

export default channelMessagesReducer
