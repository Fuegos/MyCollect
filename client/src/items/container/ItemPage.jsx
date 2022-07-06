import { LinearProgress, Box } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Comments from "../../comments/container/Comments"
import { getCommentsAsync } from "../../comments/redux/commentsSlice"
import { getLikesAsync } from "../../like/redux/likeSlice"
import Item from "../components/Item"

export default function ItemPage() {
    const { itemShortId } = useParams()
    const dispatch = useDispatch()
    const isLoadedLikes = !!useSelector(state => state.like.item._id)
    const isLoadedComments = !!useSelector(state => state.comments.item._id)

    useEffect(() => {
        dispatch(getCommentsAsync(itemShortId))
        dispatch(getLikesAsync(itemShortId))
    }, [])

    return (
        <Box mx={3} mt={3}>
            {isLoadedComments && isLoadedLikes ?
                <React.Fragment>
                    <Item />
                    <Comments />
                </React.Fragment> :
                <LinearProgress />
            }
        </Box>
    )
}