import { useDispatch, useSelector } from 'react-redux'
import { TagCloud } from 'react-tagcloud'
import { getTagsAsync } from './redux/tagSlice'
import { useEffect } from 'react'
import { Chip } from '@mui/material'

export default function CloudTags() {
    const dispatch = useDispatch()
    const tags = useSelector(state => state.tags.tags)

    const data = tags.map(t => ({
        value: t.name,
        count: 30 - t.name.length
    }))

    const customRenderer = (tag, size, color) => (
        <Chip 
            key={tag.value} 
            label={tag.value} 
            sx={{
                m: 1,
                bgcolor: `${color}`
            }}
        />
    )

    useEffect(() => {
        dispatch(getTagsAsync())
    }, [])

    return (
        <TagCloud 
            tags={data}
            maxSize={30}
            minSize={10}
            shuffle={true}
            onClick={tag => console.log(tag.value, tag.count)}
            renderer={customRenderer}
        />
    )
}