import { Grid } from "@mui/material"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getItemsLastAsync } from "../../items/redux/itemsSlice"
import LastItems from "../components/LastItems"

export default function HomePage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getItemsLastAsync(5))
    }, [])
    
    return (
        <Grid container>
            <Grid item xs={6}>
                <LastItems />
            </Grid>
        </Grid>
    )
}