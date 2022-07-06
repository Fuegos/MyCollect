import { 
    Grid, 
    Avatar, 
    Stack,
    Typography,
    Chip 
} from "@mui/material"
import ImageIcon from '@mui/icons-material/Image'
import ReactMarkdown from 'react-markdown'
import { useState } from "react"
import TruncateMarkup from 'react-truncate-markup'


export default function CollectionInfo(props) {
    const collection = props.collection

    return (
        <Stack
            direction='column'
            spacing={1}
        >
            <Stack
                direction='row'
                spacing={2}
            >
                {collection.img ?
                    <Avatar 
                        alt="Collection"
                        src={collection.img.path} 
                        sx={{ width: 90, height: 90 }}
                        variant="rounded"
                    /> :
                    <Avatar
                        alt="Collection"
                        sx={{ width: 90, height: 90 }}
                        variant="rounded"
                    >
                        <ImageIcon />
                    </Avatar>
                }
                <Stack 
                    direction='column'
                    spacing={2}
                >
                    <Stack
                        direction='row'
                        spacing={1}
                    >
                        <Typography variant="h4" >
                            {collection.name}
                        </Typography>
                        <Chip 
                            label={collection.theme.title} 
                            size="small"
                            color="secondary"
                        />
                    </Stack>
                    <Chip 
                        label={collection.owner.name} 
                        size="small"
                        color="primary"
                    />
                </Stack>
            </Stack>
            <ReactMarkdown 
                children={collection.description}
            />
        </Stack>
    )
}