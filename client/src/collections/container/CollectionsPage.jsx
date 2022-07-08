import React, { useEffect } from "react";
import Collections from "../components/Collections"
import DialogSettings from "../components/DialogSettings"
import ModifyCollection from "../components/ModifyCollection"
import ToolBar from "../components/ToolBar"
import { Routes, Route, useParams } from 'react-router-dom'
import ItemsPage from '../../items/container/ItemsPage'
import { useDispatch, useSelector } from "react-redux";
import { getCollectionsAsync, willLoading } from "../redux/collectionsSlice";
import { Box, Skeleton } from "@mui/material";


export default function CollectionsPage() {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.collections.isLoading)
    
    useEffect(() => {
        dispatch(willLoading())
        dispatch(getCollectionsAsync())
    }, [])

    return (
        <Box mx={3} mt={3}>
            {isLoading ?
                <Skeleton variant="rectangular" width='100%' height={100} /> :
                <React.Fragment>
                    <ToolBar />
                    <ModifyCollection />
                    <Collections />
                    <DialogSettings />
                </React.Fragment>
            }
        </Box>
    )
}