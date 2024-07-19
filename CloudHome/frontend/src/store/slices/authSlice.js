import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthorized: localStorage.getItem("userInfo")? true: false,
        email: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).user.email : null,
        name: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).user.name : null,
        token: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).user.token : null,
        isEmailVerified: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).user.isEmailVerified : false,
    },
    reducers: {
        appLogin: (state,action) => {
            const { payload } = action;
            const { data } = payload;
            const { token, user } = data;
            state.isAuthorized = true;
            state.email = user.email; //action.payload.data.user.email
            state.name = user.name; //action.payload.data.user.name
            state.token = token; //action.payload.data.user.token
            state.isEmailVerified = user.isEmailVerified; //action.payload.data.user.isEmailVerified
            localStorage.setItem("userInfo",JSON.stringify(data));
        },
        appLogout: (state) => {
            state.isAuthorized = false;
            state.email = null,
            state.name = null,
            state.token = null,
            state.isEmailVerified = false,
            localStorage.removeItem("userInfo");
        },
    },
});

export const {appLogin, appLogout} = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;