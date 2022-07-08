import * as React from 'react';
import { Box, ListItemIcon, Menu, MenuItem, Divider, IconButton, Tooltip } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LoginIcon from '@mui/icons-material/Login'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import LogoutIcon from '@mui/icons-material/Logout'
import { FormattedMessage } from 'react-intl'
import { signOutUser } from '../authUser/redux/authUserSlice'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark'
import AccessProvider from '../access/AccessProvider';


export default function MenuBar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.authUser.isAuth)
    const isAdmin = useSelector(state => state.authUser.isAdmin)
    
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const signIn =  !isAuth &&
        <MenuItem onClick={() => navigate('auth/sign/in')}>
            <ListItemIcon>
                <LoginIcon />
            </ListItemIcon>
            
            <FormattedMessage
                    id="nav.sign.in"
                    defaultMessage="Sign In"
            />
        </MenuItem>
        

    const signUp = !isAuth &&
        <MenuItem onClick={() => navigate('auth/sign/up')}>
            <ListItemIcon>
                <HowToRegIcon />
            </ListItemIcon>
            
            <FormattedMessage
                id="nav.sign.up"
                defaultMessage="Sign Up"
            />
        </MenuItem>
        

    const signOut = isAuth &&
        <MenuItem
            onClick={() => {
                dispatch(signOutUser())
                navigate('auth/sign/in')
            }}
        >
            <ListItemIcon>
                <LogoutIcon />
            </ListItemIcon>

            <FormattedMessage
                id="nav.sign.out"
                defaultMessage="Sign Out"
            />
        </MenuItem>

    const myCollections = isAuth && 
        <MenuItem
            onClick={() => navigate('collections')}
        >
            <ListItemIcon>
                <CollectionsBookmarkIcon />
            </ListItemIcon>

            <FormattedMessage
                id="nav.my.collections"
                defaultMessage="My Collections"
            />
        </MenuItem>
    
    const adminPanel = isAuth && 
        <AccessProvider 
            component={() =>
                <MenuItem
                    onClick={() => navigate('admin')}
                >
                    <ListItemIcon>
                        <AdminPanelSettingsIcon />
                    </ListItemIcon>

                    <FormattedMessage
                        id="nav.admin"
                        defaultMessage="Admin Panel"
                    />
                </MenuItem>
            }
        />
    
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="My options">
                    <IconButton
                        onClick={handleClick}
                        size="large"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <MenuOpenIcon fontSize='large' />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {signIn}
                {signUp}
                {myCollections}
                {adminPanel}
                {isAuth && <Divider /> }
                {signOut}
            </Menu>
        </React.Fragment>
    )
}