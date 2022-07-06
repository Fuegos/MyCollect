import { 
    ListItem,
    ListItemButton,
    ListItemAvatar,
    ListItemText 
} from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function ElementOfList({
    element
}) {
    const navigate = useNavigate()
    
    return (
        <ListItem>
            <ListItemButton 
                role={undefined} 
                dense
                onClick={() => {
                    navigate(element.path)
                }}
            >
                <ListItemAvatar>
                    { element.avatar }
                </ListItemAvatar>
                <ListItemText 
                    primary={element.primaryText} 
                />
                { element.optionalComponent }
            </ListItemButton>
        </ListItem>
    )
}