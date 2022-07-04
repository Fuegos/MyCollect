import { Box, Typography } from "@mui/material"
import dateFormat, { masks } from 'dateformat'


export default function Comment(props) {
    const comment = props.comment
    return (
        <Box sx={{ 
                bgcolor: 'success.main', 
                color: 'primary.contrastText',
                borderRadius: 3,
                p: 1,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}
            
        >
            <Box
                display='flex'
                flexDirection='column'
            >
                <Box 
                    sx={{
                        typography: 'button'
                    }}
                >
                    {comment.user.name}
                </Box>            
                <Box 
                    sx={{
                        typography: 'body1',
                        ml: 2
                    }}
                >
                    {comment.text}
                </Box>

            </Box>
            <Box 
                sx={{
                    typography: 'caption'
                }}
                display='flex'
                justifyItems='flex-end'
                alignItems='flex-end'
            >
                {dateFormat(comment.dateSend, "dd mmmm HH:MM")}
            </Box>
        </Box>
    )
}