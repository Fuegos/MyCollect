import { List } from '@mui/material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getCollectionsAsync } from '../redux/collectionsSlice'
import Collection from './Collection'


export default function Collections() {
    const collections = useSelector(state => state.collections.collections)
 
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {
                collections.map(c => <Collection key={c._id} collection={c} />)
            }
        </List>
    )
}