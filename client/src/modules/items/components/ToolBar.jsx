import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { 
    Typography, 
    Tooltip, 
    IconButton, 
    Toolbar
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { deleteItemsAsync } from '../redux/itemsSlice'
import DeleteIcon from '@mui/icons-material/Delete'
import { alpha } from '@mui/material/styles'
import AccessProvider from '../../../components/access/AccessProvider'
import { openDialog } from '../../../components/dialogs/redux/dialogsSlice'
import { ITEM_DIALOG } from '../../../components/dialogs/data/dialogs'


export default function ToolBar({ selectedItems }) {
    const numSelected = selectedItems.length
    const dispatch = useDispatch()
    const collection = useSelector(state => state.collection.collection)
            
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
                                id="item.toolbar.delete"
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
                                id="item.header"
                                defaultMessage="Items"
                            />
                        </Typography>
                        <AccessProvider 
                            component={() =>
                                <Tooltip 
                                    title={
                                        <FormattedMessage
                                            id="item.toolbar.add"
                                            defaultMessage="Add Item"
                                        />
                                    }
                                >
                                    <IconButton
                                        onClick={() => dispatch(openDialog(ITEM_DIALOG))}
                                    >
                                        <AddCircleOutlineIcon fontSize='large' />
                                    </IconButton>
                                </Tooltip>
                            }
                            collection={collection}
                        />
                    </>
            }
            
        </Toolbar>
    )
}