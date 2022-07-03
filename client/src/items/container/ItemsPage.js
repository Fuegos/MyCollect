import React from "react"
import { Routes, Route } from 'react-router-dom'
import Items from "../components/Items"
import { Grid, LinearProgress } from "@mui/material"
import { useSelector } from "react-redux"
import CollectionInfo from "../components/CollectionInfo"
import ToolBar from "../components/ToolBar"
import ModifyItem from "../components/ModifyItem"
import Item from "../components/Item"


export default function ItemsPage() {
    const collection = useSelector(state => state.items.collection)
    const isProccess = useSelector(state => state.items.isProccess)

    return (
        <Routes>
            <Route path=':shortId' element={
                <Item />
            } />
            <Route path="*" element={
                <Grid container mx={3} mt={3}>
                    {isProccess ?
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
                </Grid>
            }/>
        </Routes>
    )
}