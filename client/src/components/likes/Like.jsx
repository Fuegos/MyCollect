import { IconButton } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { modifyLikeAsync } from "./redux/likeSlice"

export default function Like() {
    const likes = useSelector(state => state.likes.likes)
    const item = useSelector(state => state.item.item)
    const userId = useSelector(state => state.authUsers._id)
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.authUsers.isAuth)

    const isLiked = likes.some(l => l.user._id === userId)
    
    return (
        <IconButton 
            onClick={() => dispatch(modifyLikeAsync(item._id))}
            disabled={!isAuth}
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