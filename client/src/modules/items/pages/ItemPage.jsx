import { LinearProgress, Box } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Comments from "../../comments/components/Comments"
import Item from "../components/Item"
import { getItemAsync } from "../redux/itemSlice"

export default function ItemPage() {
    const { itemShortId } = useParams()
    const dispatch = useDispatch()
    const isLoadedLikes = !!useSelector(state => state.item.item._id)
    const isLoadedComments = !!useSelector(state => state.item.item._id)

    useEffect(() => {
        dispatch(getItemAsync(itemShortId))
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