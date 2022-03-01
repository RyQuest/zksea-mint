import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "Auth",
    initialState: { value: { user: {}, isAuthenticated: false } },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value = { user: {}, isAuthenticated: false };
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
