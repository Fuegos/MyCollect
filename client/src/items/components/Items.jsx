import { Grid, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import CollectionInfo from "./CollectionInfo";

export default function Items() {
    const collection = useSelector(state => state.items.collection)
    const isProccess = useSelector(state => state.items.isProccess)

    return(
        <div></div>
    )
}