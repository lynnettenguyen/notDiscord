const GET_ALL_USERS = 'servers/GET_ALL_USERS'

const getUsersAction = (users) => ({
    type: GET_ALL_USERS,
    users
})


export const getUsers = () => async (dispatch) => {
  const response = await fetch(`/api/users`);

  if (response.ok) {
    const users = await response.json();
    console.log(users)
    dispatch(getUsersAction(users))
    return users;
  }
}


const singleServerReducer = (state = {}, action) => {
    let newState = {}
    switch (action.type) {
      case GET_ALL_USERS: {
        for (let user of action.users) newState[user.id] = user
        return newState
      }

      default:
        return state;
    }
  }

  export default singleServerReducer;
