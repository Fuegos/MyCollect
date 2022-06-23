import * as React from 'react';
import { ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import ReactMarkdown from 'react-markdown'

export default function Collection(props) {
    const collection = props.collection
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <ImageIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText 
                primary={collection.name} 
            />
        </ListItem>
    )
}