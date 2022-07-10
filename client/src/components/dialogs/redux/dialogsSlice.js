import { createSlice } from '@reduxjs/toolkit'

export const dialogsSlice = createSlice({ 
    name: 'dialogs',
    initialState: {
        dialogs: []
    }, 
    reducers: {
        openDialog: (state, action) => {
            state.dialogs.push(action.payload)
        },
        closeDialog: (state, action) => {
            state.dialogs = state.dialogs.filter(d => d != action.payload)
        },
        closeAllDialogs: (state, action) => {
            state.dialogs = []
        }
    }
})

export const { 
    openDialog,
    closeDialog,
    closeAllDialogs
} = dialogsSlice.actions

export default dialogsSlice.reducer