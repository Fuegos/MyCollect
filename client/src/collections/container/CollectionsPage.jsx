import React, { useEffect } from "react";
import Collections from "../components/Collections"
import DialogSettings from "../components/DialogSettings"
import ModifyCollection from "../components/ModifyCollection"
import ToolBar from "../components/ToolBar"
import { Routes, Route, useParams } from 'react-router-dom'
import ItemsPage from '../../items/container/ItemsPage'
import { useDispatch } from "react-redux";
import { getCollectionsAsync } from "../redux/collectionsSlice";


export default function CollectionsPage() {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getCollectionsAsync())
    }, [])

    return (
        <React.Fragment>
            <ToolBar />
            <ModifyCollection />
            <Collections />
            <DialogSettings />
        </React.Fragment>
    )
}