import { createSlice } from '@reduxjs/toolkit'

const getThemeMode = isDark => (isDark && 'dark') || 'light'

const localThemeMode = ['dark', 'light'].includes(localStorage.getItem('mode'))
    && localStorage.getItem('mode')


export const themeModeSlice = createSlice({
    name: 'theme/mode',
    initialState: {
        isDark: localStorage.getItem('mode') === 'dark',
        mode: localThemeMode || 'light'
    },
    reducers: {
        choseThemeMode: (state, action) => {
            state.isDark = action.payload.isDark
            state.mode = getThemeMode(action.payload.isDark)
            localStorage.setItem('mode', getThemeMode(action.payload.isDark))
        }
    }
})

export const { choseThemeMode } = themeModeSlice.actions

export default themeModeSlice.reducer