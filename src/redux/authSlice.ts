import {createSlice} from "@reduxjs/toolkit";

const initianlState = {
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initianlState,
    reducers: {
        login: (state) => {
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.isAuthenticated = false
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer