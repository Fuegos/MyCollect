import { IconButton } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { modifyLikeAsync } from "./redux/likeSlice"

export default function Like() {
    const likes = useSelector(state => state.like.likes)
    const item = useSelector(state => state.like.item)
    const userEmail = useSelector(state => state.authUser.email)
    const dispatch = useDispatch()

    const isLiked = likes.some(l => l.user.email === userEmail)
    
    return (
        <IconButton 
            onClick={() => dispatch(modifyLikeAsync(item._id))}
        >
            {
                isLiked ?
                    <FavoriteIcon fontSize='large' /> :
                    <FavoriteBorderIcon fontSize='large' />
            }
            {likes.length}
        </IconButton>
    )
}