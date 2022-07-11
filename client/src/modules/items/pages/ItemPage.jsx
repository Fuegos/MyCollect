import { LinearProgress, Box } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Comments from "../../comments/components/Comments"
import Item from "../components/Item"
import { getItemAsync, resetItem } from "../redux/itemSlice"

export default function ItemPage() {
    const { itemShortId } = useParams()
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.item.isLoading)
    const item = useSelector(state => state.item.item)

    useEffect(() => {
        dispatch(getItemAsync(itemShortId))
    }, [])

    return (
        <Box mx={{xs:3, sm:8}} mt={5}>
            {isLoading || !item._id ?
                <LinearProgress /> :
                <React.Fragment>
                    <Item />
                    <Comments />
                </React.Fragment>
            }
        </Box>
    )
}