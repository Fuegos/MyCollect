import { alpha } from '@mui/material/styles'
import { Toolbar, Typography, Tooltip, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import AddModeratorIcon from '@mui/icons-material/AddModerator'
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useSelector } from 'react-redux'
import { FormattedMessage } from 'react-intl'


export default function ToolBar() {
    const numSelected = useSelector(state => state.admin.selectedUsers.length)

    const deleteButton = numSelected > 0 &&
        <Tooltip 
            title={
                <FormattedMessage
                    id="admin.toolbar.delete"
                    defaultMessage="Delete"
                />
            }
        >
            <IconButton>
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
            <IconButton>
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
            <IconButton>
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
            <IconButton>
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
            <IconButton>
                <RemoveModeratorIcon />
            </IconButton>
        </Tooltip>

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
            {numSelected > 0 ? (
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
            )}
            {unblockButton}
            {blockButton}
            {assignAdminButton}
            {unassignAdminButton}
            {deleteButton}
        </Toolbar>
    )
}