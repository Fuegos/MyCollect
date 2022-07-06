import { 
    AppBar, 
    Box, 
    Toolbar, 
    Container,
    IconButton,
    Stack 
} from '@mui/material'
import SelectorLand from '../lang/components/SelectorLang'
import SelectorThemeMode from '../themeMode/components/SelectorThemeMode'
import MenuBar from './MenuBar'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'


export default function NavigationApp() {
    const navigate = useNavigate()

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar 
                    disableGutters 
                    sx={{
                        display: 'flex',
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <IconButton
                        onClick={() => navigate('home')}
                    >
                        <HomeIcon fontSize='large' />
                    </IconButton>
                    <Stack
                        direction='row'
                        justifyContent='flex-end'
                        alignItems="center"
                        spacing={5}
                    >
                        <Stack
                            direction='row'
                            justifyContent='flex-start'
                            alignItems="center"
                            spacing={1}
                        >
                            <SelectorThemeMode />
                            <SelectorLand />
                            <IconButton
                                onClick={() => {}}
                            >
                                <SearchIcon fontSize='large' />
                            </IconButton>
                        </Stack>
                        <MenuBar />
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    )
}