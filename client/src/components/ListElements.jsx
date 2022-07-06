import { Typography } from "@mui/material";
import React from "react";
import ElementOfList from "./ElementOfList";

export default function ListElements({
    titleList,
    elements
}) {
    return (
        <React.Fragment>
            <Typography variant="h5" >
                { titleList }
            </Typography>
            {
                elements.map(e => (<ElementOfList key={e.key} element={e} />))
            }
        </React.Fragment>
    )
}