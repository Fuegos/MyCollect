import { alpha } from '@mui/material/styles'
import { Toolbar, Typography, Tooltip, IconButton, LinearProgress } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import AddModeratorIcon from '@mui/icons-material/AddModerator'
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useDispatch, useSelector } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { 
    changeRoleUsersAsync, 
    changeStatusUsersAsync, 
    deleteUsersAsync 
} from '../redux/adminSlice';


export default function ToolBar() {
    const numSelected = useSelector(state => state.admin.selectedUsers.length)
    const selectedUsers = useSelector(state => state.admin.selectedUsers)
    const isProccessToolBar = useSelector(state => state.admin.isProccessToolBar)
    const dispatch = useDispatch()

    const deleteButton = numSelected > 0 &&
        <Tooltip 
            title={
                <FormattedMessage
                    id="admin.toolbar.delete"
                    defaultMessage="Delete"
                />
            }
        >
            <IconButton
                onClick={() => dispatch(deleteUsersAsync(selectedUsers))}
            >
                <DeleteIcon />
            </IconButton>
        </Tooltip>

    const blockButton = numSelected > 0 &&
        <Tooltip 
            title={
                <FormattedMessage
                    id="admin.toolbar.block"
                    defaultMessage="Block"
                />
            }
        >
            <IconButton
                onClick={
                    () => dispatch(changeStatusUsersAsync(
                        { users: selectedUsers, status: 'blocked' }
                    ))
                }
            >
                <VisibilityOffIcon />
            </IconButton>
        </Tooltip>

    const unblockButton = numSelected > 0 &&
        <Tooltip 
            title={
                <FormattedMessage
                    id="admin.toolbar.unblock"
                    defaultMessage="Unblock"
                />
            }
        >
            <IconButton
                onClick={
                    () => dispatch(changeStatusUsersAsync(
                        {users: selectedUsers, status: 'active'}
                    ))
                }
            >
                <VisibilityIcon />
            </IconButton>
        </Tooltip>

    const assignAdminButton = numSelected > 0 &&
        <Tooltip 
            title={
                <FormattedMessage
                    id="admin.toolbar.assign"
                    defaultMessage="Assign admin"
                />
            }
        >
            <IconButton
                onClick={
                    () => dispatch(changeRoleUsersAsync(
                        { users: selectedUsers, role: 'admin' }
                    ))
                }
            >
                <AddModeratorIcon />
            </IconButton>
        </Tooltip>

    const unassignAdminButton = numSelected > 0 &&
        <Tooltip 
            title={
                <FormattedMessage
                    id="admin.toolbar.unassign"
                    defaultMessage="Unassign admin"
                />
            }
        >
            <IconButton
                onClick={
                    () => dispatch(changeRoleUsersAsync(
                        { users: selectedUsers, role: 'user' }
                    ))
                }
            >
                <RemoveModeratorIcon />
            </IconButton>
        </Tooltip>

    const proccessToolBar = isProccessToolBar && 
        <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
        >
            <LinearProgress />
        </Typography>
        
        

    const toolBar = numSelected > 0 ? (
        <>
            <Typography
                sx={{ flex: '1 1 100%' }}
                color="inherit"
                variant="subtitle1"
                component="div"
            >
                <FormattedMessage
                    id="admin.toolbar.selected"
                    defaultMessage="{num} selected"
                    values={{num: numSelected}}
                />
            </Typography>
            {unblockButton}
            {blockButton}
            {assignAdminButton}
            {unassignAdminButton}
            {deleteButton}
        </>
    ) : (
        <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
        >
            <FormattedMessage
                id="admin.toolbar.header"
                defaultMessage="Users"
            />
        </Typography>
    )
        
    
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                bgcolor: (theme) =>
                    alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            { proccessToolBar || toolBar }
        </Toolbar>
    )
}