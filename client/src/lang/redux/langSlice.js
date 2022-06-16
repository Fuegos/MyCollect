import { createSlice } from '@reduxjs/toolkit'

const localLang = ['en', 'uk', 'ge'].includes(localStorage.getItem('lang')) 
                    && localStorage.getItem('lang')

export const langSlice = createSlice({
    name: 'lang',
    initialState: {
        lang: localLang || 'en'
    },
    reducers: {
        choseLanguage: (state, action) => {
            state.lang = action.payload.lang
            localStorage.setItem('lang', action.payload.lang)
        }
    }
})

export const { choseLanguage } = langSlice.actions

export default langSlice.reducer