import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    UserDetails: {},
    Token: {},
    Titles: {},
    minilogo: false,
    sidebar: false,
    Progress: 0,
    isMobile: false,
}

export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        AddUserDetails: (state, action) => {
            state.UserDetails = action.payload;
        },
        AddToken: (state, action) => {
            state.Token = action.payload;
        },
        changeProgress: (state, action) => {
            state.Progress = action.payload;
        },
        AddTitle: (state, action) => {
            state.Titles = action.payload;
        },
        changeMinLogo: (state) => {
            state.minilogo = !state.minilogo
        },
        changeSidebar: (state) => {
            state.sidebar = !state.sidebar
        },
        changeDevice: (state, action) => {
            state.isMobile = action.payload
        },
    },
})

export const { AddUserDetails, changeMinLogo, AddToken, AddTitle, changeSidebar, changeProgress, changeDevice } = UserSlice.actions

export const UserDet = (state) => state.User.UserDetails

export const TokenDet = (state) => state.User.Token

export const TitleDet = (state) => state.User.Titles

export const minilogoOrNot = (state) => state.User.minilogo

export const sidebarToggle = (state) => state.User.sidebar

export const ProgressBar = (state) => state.User.Progress

export const MobileToggle = (state) => state.User.isMobile

export default UserSlice.reducer