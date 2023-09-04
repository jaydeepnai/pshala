import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    SchoolGrades: [],
    UserRoles: [],
    States: [],
    Relations: [],
    PaymentMethods: [],
    GenderLists: [],
    AddressTypes: [],
}

export const ListSlice = createSlice({
    name: 'List',
    initialState,
    reducers: {
        AddSchoolGrades: (state, action) => {
            state.SchoolGrades = action.payload;
        },
        AddUserRoles: (state, action) => {
            state.UserRoles = action.payload;
        },
        AddStates: (state, action) => {
            state.States = action.payload;
        },
        AddRelations: (state, action) => {
            state.Relations = action.payload;
        },
        AddPaymentMethods: (state, action) => {
            state.PaymentMethods = action.payload;
        },
        AddGenderList: (state, action) => {
            state.GenderLists = action.payload;
        },
        AddAddressTypes: (state, action) => {
            state.AddressTypes = action.payload;
        },
    },
})

export const { AddAddressTypes, AddGenderList, AddPaymentMethods, AddRelations, AddSchoolGrades, AddStates, AddUserRoles } = ListSlice.actions

export const SchoolGradesDet = (state) => state.List.SchoolGrades
export const UserRolesDet = (state) => state.List.UserRoles
export const StatesDet = (state) => state.List.States
export const RelationsDet = (state) => state.List.Relations
export const PaymentMethodsDet = (state) => state.List.PaymentMethods
export const GenderListsDet = (state) => state.List.GenderLists
export const AddressTypesDet = (state) => state.List.AddressTypes
export const List = (state) => state.List

export default ListSlice.reducer