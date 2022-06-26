import * as React from 'react';
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
import ReactMarkdown from 'react-markdown'
import { useDispatch } from 'react-redux';
import { openDialog, setEditableCollection, deleteCollectionAsync } from '../redux/collectionsSlice';

export default function Collection(props) {
    const collection = props.collection

    const dispatch = useDispatch()

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
            <ListItemButton role={undefined} dense>
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
                        dispatch(openDialog())
                    }}>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        Edit
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem 
                        onClick={() => {
                            handleClose()
                            dispatch(deleteCollectionAsync(collection))
                    }}>
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                        Delete
                    </MenuItem>
                </Menu>
            </ListItemSecondaryAction>
        </ListItem>
    )
}