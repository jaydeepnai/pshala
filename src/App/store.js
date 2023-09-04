import { configureStore } from '@reduxjs/toolkit'
// import UserReducer from '../features/User/UserSlice'
import UserReducer from '../features/User/UserSlice'
import ListReducer from '../features/DDL/ListSlice'

export const store = configureStore({
    reducer: {
        User: UserReducer,
        List: ListReducer,
    },
})