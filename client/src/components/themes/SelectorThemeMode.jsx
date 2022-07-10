import { IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { choseThemeMode } from './redux/themeModeSlice'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import WbSunnyIcon from '@mui/icons-material/WbSunny'

export default function SelectorThemeMode() {
    const dispatch = useDispatch()
    const themeMode = useSelector(state => state.themes.mode)

    return (
        <IconButton
            onClick={() => dispatch(choseThemeMode(themeMode))}
        >
            {themeMode === 'dark' ?
                <DarkModeIcon fontSize='large' /> :
                <WbSunnyIcon fontSize='large' />
            }
        </IconButton>
    )
}