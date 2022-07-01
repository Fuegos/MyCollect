import { Grid, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import CollectionInfo from "./CollectionInfo";

export default function Items() {
    const collection = useSelector(state => state.items.collection)
    const isProccess = useSelector(state => state.items.isProccess)

    return(
        <Grid container mx={3} mt={3}>
            {isProccess ?
                <Grid item xs={12}>
                    <LinearProgress />
                </Grid> :
                <CollectionInfo collection={collection} />
            }
            
        </Grid>
    )
}