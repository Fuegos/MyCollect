import React from "react";
import Collections from "../components/Collections";
import DialogSettings from "../components/DialogSettings";
import ModifyCollection from "../components/ModifyCollection";
import ToolBar from "../components/ToolBar";

export default function CollectionsPage() {
    return (
        <React.Fragment>
            <ToolBar />
            <ModifyCollection />
            <Collections />
            <DialogSettings />
        </React.Fragment>
    )
}