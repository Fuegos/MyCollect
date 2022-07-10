import { createSlice } from '@reduxjs/toolkit'
import { langValues, langDefault } from '../data/dataLangs'

const localLang = langValues.includes(localStorage.getItem('lang')) 
    && localStorage.getItem('lang')

export const langSlice = createSlice({
    name: 'lang',
    initialState: {
        lang: localLang || langDefault
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