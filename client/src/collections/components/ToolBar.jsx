import AddBoxIcon from '@mui/icons-material/AddBox'
import { Box, Typography, Tooltip, IconButton } from '@mui/material'
import { useDispatch } from 'react-redux'
import { openDialog } from '../redux/collectionsSlice'
import { FormattedMessage } from 'react-intl'

export default function ToolBar() {
    const dispatch = useDispatch()
    
    return (
        <Box sx={{ width: '100%'}}>
            <Typography variant="h4" gutterBottom component="div">
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
                    <AddBoxIcon />
                </IconButton>
            </Tooltip>
        </Box>
    )
}