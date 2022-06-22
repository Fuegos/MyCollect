import * as React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image';

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
                secondary={collection.description} 
            />
        </ListItem>
    )
}