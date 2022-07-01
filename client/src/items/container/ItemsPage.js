import React from "react"
import { Routes, Route } from 'react-router-dom'
import Items from "../components/Items"

export default function ItemsPage() {
    return (
        <Routes>
            <Route path='item' element={
                <React.Fragment>

                </React.Fragment>
            } />
            <Route path="*" element={
                <React.Fragment>
                    <Items />
                </React.Fragment>
            }/>
        </Routes>
    )
}