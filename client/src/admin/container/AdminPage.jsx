import React from "react";
import { useSelector } from "react-redux";
import { clearErrorType } from "../../admin/redux/adminSlice";
import ErrorAlert from "../../errors/ErrorAlert";
import ToolBar from "../components/ToolBar";
import Users from "../components/Users";


export default function AdminPage() {
    const errorType = useSelector(state => state.admin.errorType)

    return (
        <React.Fragment>
            <ErrorAlert
                errorType={errorType}  
                clearErrorType={clearErrorType}
            />
            <ToolBar />
            <Users />
        </React.Fragment>
    )
}