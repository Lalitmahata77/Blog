import {configureStore} from "@reduxjs/toolkit"
import useReducer  from "./features/userSlice"
import { authApi } from "./api/authApi"
export const store = configureStore({
    reducer : {
        auth : useReducer,
        [authApi.reducerPath] : authApi.reducer
    },
    middleware : (getDefaultMiddleware)=> getDefaultMiddleware().concat(authApi.middleware)
})