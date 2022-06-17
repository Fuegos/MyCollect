import { AppBar, Box, Toolbar, Container } from '@mui/material'
import SelectorLand from '../lang/components/SelectorLang'
import SelectorThemeMode from '../themeMode/components/SelectorThemeMode'
import MenuBar from './MenuBar'


export default function NavigationApp() {
    
    const selectorLang = 
        <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
            <SelectorLand />
        </Box>

    const selectorTheme = 
        <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
            <SelectorThemeMode />
        </Box>


    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {selectorTheme}
                    {selectorLang}
                    <MenuBar />
                </Toolbar>
            </Container>
        </AppBar>
    )
}