import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Typography, Tooltip, IconButton, Stack } from '@mui/material'
import { useDispatch } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { openDialog } from '../../../components/dialogs/redux/dialogsSlice'
import { COLLECTION_DIALOG } from '../../../components/dialogs/data/dialogs'

export default function ToolBar() {
    const dispatch = useDispatch()
    
    return (
        <Stack 
            direction='row'
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            ml={4} 
            mt={2}
        >
            <Typography variant="h4" >
                <FormattedMessage
                    id="collection.list.header"
                    defaultMessage="Your Collections"
                />
            </Typography>
            <Tooltip 
                title={
                    <FormattedMessage
                        id="collection.button.add"
                        defaultMessage="Add collection"
                    />
                }
            >
                <IconButton
                    onClick={() => dispatch(openDialog(COLLECTION_DIALOG))}
                >
                    <AddCircleOutlineIcon fontSize='large' />
                </IconButton>
            </Tooltip>
        </Stack>
    )
}