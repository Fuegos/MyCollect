import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Typography, Tooltip, IconButton, Stack } from '@mui/material'
import { useDispatch } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { openDialog } from '../redux/itemsSlice'

export default function ToolBar() {
    const dispatch = useDispatch()
    
    return (
        <Stack 
            direction='row'
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
        >
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
        </Stack>
    )
}