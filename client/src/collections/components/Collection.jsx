import * as React from 'react';
import { ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import ReactMarkdown from 'react-markdown'

export default function Collection(props) {
    const collection = props.collection

    const avatar = props.collection.img ?
        <Avatar src={props.collection.img} /> :
        <Avatar>
            <ImageIcon />
        </Avatar>

    return (
        <ListItem>
            <ListItemAvatar>
                { avatar }
            </ListItemAvatar>
            <ListItemText 
                primary={collection.name} 
            />
        </ListItem>
    )
}