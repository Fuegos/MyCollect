import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { 
    Typography, 
    Tooltip, 
    IconButton, 
    Toolbar
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { deleteItemsAsync, openDialog } from '../redux/itemsSlice'
import DeleteIcon from '@mui/icons-material/Delete'
import { alpha } from '@mui/material/styles'


export default function ToolBar() {
    const dispatch = useDispatch()
    const numSelected = useSelector(state => state.items.selectedItems.length)
    const selectedItems = useSelector(state => state.items.selectedItems)
        
    
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
            {
                numSelected > 0 ?
                    <Tooltip 
                        title={
                            <FormattedMessage
                                id="collection.items.toolbar.delete"
                                defaultMessage="Delete"
                            />
                        }
                    >
                        <IconButton
                            onClick={() => dispatch(deleteItemsAsync(selectedItems))}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip> :
                    <>
                        <Typography variant="h4" >
                            <FormattedMessage
                                id="collection.item"
                                defaultMessage="Items"
                            />
                        </Typography>
                        <Tooltip 
                            title={
                                <FormattedMessage
                                    id="collection.item"
                                    defaultMessage="Add Item"
                                />
                            }
                        >
                            <IconButton
                                onClick={() => dispatch(openDialog())}
                            >
                                <AddCircleOutlineIcon fontSize='large' />
                            </IconButton>
                        </Tooltip>
                    </>
            }
            
        </Toolbar>
    )
}