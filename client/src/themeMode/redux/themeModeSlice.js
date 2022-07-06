import { createSlice } from '@reduxjs/toolkit'

const localThemeMode = ['dark', 'light'].includes(localStorage.getItem('mode'))
    && localStorage.getItem('mode')

const mapSwitch = {
    dark: 'light',
    light: 'dark'
}


export const themeModeSlice = createSlice({
    name: 'theme/mode',
    initialState: {
        mode: localThemeMode || 'light'
    },
    reducers: {
        choseThemeMode: (state, action) => {
            state.mode = mapSwitch[action.payload]
            localStorage.setItem('mode', mapSwitch[action.payload])
        }
    }
})

export const { choseThemeMode } = themeModeSlice.actions

export default themeModeSlice.reducer