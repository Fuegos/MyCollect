import { 
    ListItem, 
    ListItemButton, 
    Avatar, 
    Chip,
    ListItemText,
    ListItemAvatar
} from "@mui/material"
import LabelIcon from '@mui/icons-material/Label'
import { useNavigate } from "react-router-dom"

export default function LastItem(props) {
    const item = props.item
    const navigate = useNavigate(
        
    )
    return (
        <ListItem>
            <ListItemButton 
                role={undefined} 
                dense
                onClick={() => {
                    navigate(`../item/${item.shortId}`)
                }}
            >
                <ListItemAvatar>
                    <Avatar>
                        <LabelIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText 
                    primary={item.name} 
                />
                <Chip label={item.collectionRef.name} size="small" />
            </ListItemButton>
        </ListItem>
    )
}