import React, { useEffect } from "react"
import { useParams } from 'react-router-dom'
import Items from "../components/Items"
import { Box, Grid, LinearProgress } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import CollectionInfo from "../components/CollectionInfo"
import ToolBar from "../components/ToolBar"
import ModifyItem from "../components/ModifyItem"
import { getItemsAsync } from "../redux/itemsSlice"


export default function ItemsPage() {
    const collection = useSelector(state => state.items.collection)
    const isProccess = useSelector(state => state.items.isProccess)
    const { collectionShortId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(collectionShortId)
        dispatch(getItemsAsync(collectionShortId))
    }, [])

    return (
        <Box mx={3} mt={3}>
            {isProccess || !collection._id ?
                <Grid item xs={12}>
                    <LinearProgress />
                </Grid> :
                <Grid container direction='column'>
                    <CollectionInfo collection={collection} />
                    <ToolBar />
                    <ModifyItem />
                    <Items />
                </Grid>
            }
        </Box>
    )
}