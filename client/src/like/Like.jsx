import { IconButton } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { modifyLikeAsync } from "./redux/likeSlice"

export default function Like() {
    const likes = useSelector(state => state.like.likes)
    const item = useSelector(state => state.item.item)
    const userId = useSelector(state => state.authUser._id)
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.authUser.isAuth)

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