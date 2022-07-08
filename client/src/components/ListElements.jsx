import { Skeleton, Typography } from "@mui/material";
import React from "react";
import ElementOfList from "./ElementOfList";

export default function ListElements({
    titleList,
    elements,
    isLoading
}) {
    return (
        <React.Fragment>
            <Typography variant="h5" >
                { titleList }
            </Typography>
            {isLoading ?
                <Skeleton variant="rectangular" width='100%' height={100} /> :
                elements.map(e => (<ElementOfList key={e.key} element={e} />))
            }
        </React.Fragment>
    )
}