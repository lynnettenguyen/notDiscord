const SHOW_FRIENDS = 'friends/SHOW_FRIENDS'

const showFriendsAction = (data) => ({
    type: SHOW_FRIENDS,
    data
})


export const setShowFriends = (data) => async (dispatch) => {
    dispatch(showFriendsAction(data))
}


const friendsReducer = (state = false, action) => {
    switch (action.type) {
      case SHOW_FRIENDS:
        return action.data
      default:
        return state;
    }
}

  export default friendsReducer;
