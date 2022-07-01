import React from "react";
import Collections from "../components/Collections"
import DialogSettings from "../components/DialogSettings"
import ModifyCollection from "../components/ModifyCollection"
import ToolBar from "../components/ToolBar"
import { Routes, Route } from 'react-router-dom'
import ItemsPage from '../../items/container/ItemsPage'


export default function CollectionsPage() {
    return (
        <Routes>
            <Route path='items/*' element={<ItemsPage />} />
            <Route path='*' element={
                <React.Fragment>
                    <ToolBar />
                    <ModifyCollection />
                    <Collections />
                    <DialogSettings />
                </React.Fragment>
            } />
        </Routes>
    )
}