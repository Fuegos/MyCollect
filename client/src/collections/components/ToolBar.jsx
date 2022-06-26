import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Typography, Tooltip, IconButton, Stack } from '@mui/material'
import { useDispatch } from 'react-redux'
import { openDialog } from '../redux/collectionsSlice'
import { FormattedMessage } from 'react-intl'

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
                    id="collections.list.header"
                    defaultMessage="Collections"
                />
            </Typography>
            <Tooltip 
                title={
                    <FormattedMessage
                        id="collections.add.button"
                        defaultMessage="Add collection"
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