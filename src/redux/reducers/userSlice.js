import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: {Password: 'sau91', Email: 'saurabh@gmail.com', recipes: Array(2), Name: 'Saurabh'},
    id: "YeCOCLrASy0AKqI1nPXc",
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        updateUser: (state,action) => {
            state.currentUser = action.payload;
        },
        updateId: (state,action) => {
            state.id = action.payload;
        },
        logoutUser: (state,action) => {
            state.currentUser = null;
        },
    },
});

export const {updateUser, logoutUser, updateId} = userSlice.actions;
export default userSlice.reducer;