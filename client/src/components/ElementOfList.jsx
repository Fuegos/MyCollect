import { 
    ListItem,
    ListItemButton,
    ListItemAvatar,
    ListItemText 
} from "@mui/material"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { closeAllDialogs } from "./dialogs/redux/dialogsSlice"

export default function ElementOfList({
    element
}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    return (
        <ListItem>
            <ListItemButton 
                role={undefined} 
                dense
                onClick={() => {
                    navigate(element.path)
                    dispatch(closeAllDialogs())

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