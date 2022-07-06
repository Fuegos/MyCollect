import { Grid } from "@mui/material";
import LastItems from "../components/LastItems";

export default function HomePage() {
    return (
        <Grid container>
            <Grid item xs={6}>
                <LastItems />
            </Grid>
        </Grid>
    )
}