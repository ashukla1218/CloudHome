import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import React from "react";

const appStore = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default appStore;