import { List, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import Collection from './Collection'


export default function Collections() {
    const collections = useSelector(state => state.collections.collections)
 
    return (
        <Grid container>
            <Grid item xs={12}>
                <List>
                    {
                        collections.map(c => <Collection key={c._id} collection={c} />)
                    }
                </List>
            </Grid>
        </Grid>
    )
}