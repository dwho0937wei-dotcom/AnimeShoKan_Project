//! Action
const GET_USER_BY_ID = 'user/getUserById'


//! Action Creator
const getUserById = (user) => ({
    type: GET_USER_BY_ID,
    payload: user,
})


//! Thunk Action
export const thunkGetUserById = (userId) => async (dispatch) => {
    const response = await fetch(`/api/user/${userId}`);
    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return;
        }
        dispatch(getUserById(data))
    }
}


function userReducer(state={ userList: {} }, action) {
    switch (action.type) {
        case GET_USER_BY_ID:
            return { userList: { ...state.userList, [action.payload.id]: action.payload } };
        default:
            return state;
    }
}


export default userReducer;