const INITIAL_STATE = {
  currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) => { //The state is going be something that redux is going to pass to the reducer
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload
      }
      default:
        return state;
  }
}

export default userReducer;