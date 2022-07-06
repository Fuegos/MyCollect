import * as React from 'react'
import { 
    ListItem, 
    ListItemText, 
    ListItemAvatar, 
    Avatar, 
    ListItemButton, 
    ListItemSecondaryAction, 
    Chip,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon
} from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SettingsIcon from '@mui/icons-material/Settings'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { FormattedMessage } from 'react-intl'
import { useDispatch } from 'react-redux'
import { 
    openDialog as openDialogCollection, 
    setEditableCollection, 
    deleteCollectionAsync 
} from '../redux/collectionsSlice'
import {
    openDialog as openDialogSettings,
    getSettingFieldsAsync
} from '../redux/settingFieldsSlice'
import { useNavigate } from 'react-router-dom'

export default function Collection(props) {
    const collection = props.collection

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    const avatar = props.collection.img ?
        <Avatar src={props.collection.img.path} /> :
        <Avatar>
            <ImageIcon />
        </Avatar>

    return (
        <ListItem>
            <ListItemButton 
                role={undefined} 
                dense
                onClick={() => {
                    navigate(`../collection/${collection.shortId}`)
                }}
            >
                <ListItemAvatar>
                    { avatar }
                </ListItemAvatar>
                <ListItemText 
                    primary={collection.name} 
                />
                <Chip label={collection.theme.title} size="small" />
            </ListItemButton>
            <ListItemSecondaryAction>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                    'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => {
                        handleClose()
                        dispatch(setEditableCollection(collection))
                        dispatch(openDialogCollection())
                    }}>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <FormattedMessage
                            id="collection.menu.edit"
                            defaultMessage="Edit"
                        />
                    </MenuItem>
                    <MenuItem 
                        onClick={() => {
                        handleClose()
                        dispatch(getSettingFieldsAsync(collection._id))
                    }}>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <FormattedMessage
                            id="collection.menu.settings"
                            defaultMessage="Settings"
                        />
                    </MenuItem>
                    <MenuItem 
                        onClick={() => {
                            handleClose()
                            dispatch(deleteCollectionAsync(collection._id))
                    }}>
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                        <FormattedMessage
                            id="collection.menu.delete"
                            defaultMessage="Delete"
                        />
                    </MenuItem>
                </Menu>
            </ListItemSecondaryAction>
        </ListItem>
    )
}