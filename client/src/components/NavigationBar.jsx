import { 
    AppBar, 
    Box, 
    Toolbar, 
    Container,
    IconButton,
    Stack 
} from '@mui/material'
import SelectorLand from './langs/SelectorLang'
import SelectorThemeMode from './themes/SelectorThemeMode'
import MenuBar from './MenuBar'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { openDialog } from './dialogs/redux/dialogsSlice'


export default function NavigationBar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

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
                                onClick={() => dispatch(openDialog('search'))}
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