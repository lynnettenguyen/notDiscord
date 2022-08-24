const LOAD_CHANNEL_MESSAGES = '/messages/LOAD_CHHANEL_MESSAGES'
const ADD_CHANNEL_MESSAGE = '/messages/ADD_CHANNEL_MESSAGE'
const EDIT_CHANNEL_MESSAGE = '/messages/EDIT_CHANNEL_MESSAGE'
const DELETE_CHANNEL_MESSAGE = '/messages/DELETE_CHANNEL_MESSAGE'

export const loadChannelMessages = (channelId) => ({
  type: LOAD_CHANNEL_MESSAGES,
  channelId
})

export const addChannelMessages = (message) => ({
  type: ADD_CHANNEL_MESSAGE,
  message
})

export const editChannelMessages = (message) => ({
  type: EDIT_CHANNEL_MESSAGE,
  message
})

export const deleteChannelMessages = (messageId) => ({
  type: EDIT_CHANNEL_MESSAGE,
  messageId
})
