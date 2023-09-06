import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    users: [],
    isFormShowing: false,
    isUpdating: false,
    updateData: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleShowing: (state, action) => {
            state.isFormShowing = action.payload;
        },
        toggleUpdating: (state, action) => {
            state.isUpdating = action.payload.flag;
            state.updateData = action.payload.data;
            state.isFormShowing = action.payload.flag;
        },
        addUser: (state, action) => {
            state.users.push({
                id: Date.now(),
                ...action.payload
            })
        },
        deleteUser: (state, action) => ({
            ...state,
            users : state.users.filter(user => user.id !== action.payload)
        }),
        updateUser: (state, action) => ({
            ...state,
            users: state.users.map(user => {
                return user.id === action.payload.id ? action.payload.user : user
            })
        })
    }
});

export default userSlice.reducer;

export const {
    addUser,
    deleteUser,
    updateUser,
    toggleShowing,
    toggleUpdating
} = userSlice.actions;
