import React, { useEffect } from "react"
import { useParams } from 'react-router-dom'
import Items from "../components/Items"
import { Box, Grid, LinearProgress } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import CollectionInfo from "../components/CollectionInfo"
import ToolBar from "../components/ToolBar"
import ModifyItem from "../components/ModifyItem"
import AccessProvider from "../../../components/access/AccessProvider"
import { getItemsAsync } from "../redux/itemsSlice"


export default function ItemsPage() {
    const collection = useSelector(state => state.collection.collection)
    const { collectionShortId } = useParams()
    const dispatch = useDispatch()
    const selectedItemIds = useSelector(state => state.items.selectedItems)
    const items = useSelector(state => state.items.items)
    const selectedItems = items.filter(item => selectedItemIds.includes(item._id))
    const isLoading = useSelector(state => state.items.getIsLoading)

    useEffect(() => {
        dispatch(getItemsAsync(collectionShortId))
    }, [])

    return (
        <Box mx={3} mt={3}>
            {isLoading || !collection._id ?
                <Grid item xs={12}>
                    <LinearProgress />
                </Grid> :
                <Grid container direction='column'>
                    <CollectionInfo collection={collection} />
                    <AccessProvider 
                        component={() => <ToolBar selectedItems={selectedItemIds} />}
                        items={selectedItems}
                    />
                    <ModifyItem />
                    <Items />
                </Grid>
            }
        </Box>
    )
}