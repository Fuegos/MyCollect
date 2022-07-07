import { createSlice } from '@reduxjs/toolkit'

export const errorsSlice = createSlice({ 
    name: 'errors',
    initialState: {
        errors: []
    }, 
    reducers: {
        addError: (state, action) => {
            state.errors.push(action.payload)
        },
        clearError: (state, action) => {
            state.errors = state.errors.filter(e => e._id !== action.payload)
        }
    }
})

export const { 
    addError,
    clearError
} = errorsSlice.actions

export default errorsSlice.reducer