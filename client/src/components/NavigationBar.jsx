import { AppBar, Box, Toolbar, Container, Button, Grid } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signOutUser } from '../authUser/redux/authUserSlice'
import SelectorLand from '../lang/components/SelectorLang'
import SelectorThemeMode from '../themeMode/components/SelectorThemeMode'
import { FormattedMessage } from 'react-intl'


export default function NavigationApp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isAuth = useSelector(state => state.authUser.isAuth)
        
    const toolBarButtons = () => {
        if(!isAuth) {
            return (
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
                        <Button
                            sx={{ my: 1, color: 'white' }}
                            startIcon={<LoginIcon />}
                            onClick={() => navigate('auth/sign/in')}
                            fullWidth
                        >
                            <FormattedMessage
                                id="nav.sign.in"
                                defaultMessage="Sign In"
                            />
                        </Button>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: {  md: 'flex' } }}>
                        <Button
                            sx={{ my: 1, color: 'white' }}
                            startIcon={<HowToRegIcon />}
                            onClick={() => navigate('auth/sign/up')}
                            fullWidth
                        >
                            <FormattedMessage
                                id="nav.sign.up"
                                defaultMessage="Sign Up"
                            />
                        </Button>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
                        <SelectorLand />
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
                        <SelectorThemeMode />
                    </Box>
                </Toolbar>
            )
        } else {
            return (
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
                        <Button
                            sx={{ my: 1, color: 'white' }}
                            startIcon={<LogoutIcon />}
                            onClick={() => {
                                dispatch(signOutUser())
                                navigate('auth/sign/in')
                            }}
                            fullWidth
                        >
                            <FormattedMessage
                                id="nav.sign.out"
                                defaultMessage="Sign Out"
                            />
                        </Button>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
                        <SelectorLand />
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
                        <SelectorThemeMode />
                    </Box>
                </Toolbar>
            )
        }
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                {toolBarButtons()}
            </Container>
        </AppBar>
    )
}