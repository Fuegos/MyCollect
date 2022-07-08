import { createSlice } from '@reduxjs/toolkit'

export const collectionSlice = createSlice({ 
    name: 'collection',
    initialState: {
        collection: {}
    }, 
    reducers: {
        setCollection: (state, action) => {
            state.collection = action.payload
        },
        resetCollection: (state, action) => {
            state.collection = {}
        }
    }
})

export const { 
    setCollection,
    resetCollection
} = collectionSlice.actions

export default collectionSlice.reducer