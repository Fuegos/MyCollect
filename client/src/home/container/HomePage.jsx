import { Grid, Avatar, Stack, Chip, Badge, Box, Typography } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCollectionsBiggestAsync, resetCollections, willLoading } from "../../collections/redux/collectionsSlice"
import ListElements from "../../components/ListElements"
import { getItemsLastAsync, resetItems } from "../../items/redux/itemsSlice"
import ImageIcon from '@mui/icons-material/Image'
import { FormattedMessage } from 'react-intl'
import LabelIcon from '@mui/icons-material/Label'
import CloudTags from "../../tag/CloudTags"


export default function HomePage() {
    const dispatch = useDispatch()
    const collections = useSelector(state => state.collections.collections)
    const items = useSelector(state => state.items.items)
    const isLoadingItems = useSelector(state => state.items.isLoading)
    const isLoadingCollections = useSelector(state => state.collections.isLoading)

    const itemElements = items.map(i => {
        return {
            key: i._id,
            path: `../item/${i.shortId}`,
            avatar: 
                <Avatar>
                    <LabelIcon />
                </Avatar>,
            primaryText: i.name,
            optionalComponent: 
                <Stack
                    direction='row'
                >
                    <Chip label={i.collectionRef.name} size="small" />
                </Stack>
        }
    })

    const collectionElements = collections.map(c => {
        return {
            key: c._id,
            path: `../collection/${c.shortId}`,
            avatar: c.img ?
                <Badge
                    color="secondary"
                    badgeContent={c.count} 
                    max={99}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                    <Avatar src={c.img.path} />
                </Badge> :
                <Badge
                    color="secondary"
                    badgeContent={c.count}
                    min={0} 
                    max={99}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                </Badge>,
            primaryText: c.name,
            optionalComponent: 
                <Stack
                    direction='row'
                >
                    <Chip label={c.owner.name} size="small" />
                </Stack>
        }
    })

    useEffect(() => {
        dispatch(getItemsLastAsync(5))
        dispatch(getCollectionsBiggestAsync(5))

        return () => {
            dispatch(willLoading())
            dispatch(resetCollections())
            dispatch(resetItems())
        }
    }, [])

    return (
        <Box mx={1} mt={2}>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                    <ListElements 
                        elements={itemElements}
                        titleList={
                            <FormattedMessage
                                id="item"
                                defaultMessage="Last Items"
                            />
                        }
                        isLoading={isLoadingItems}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <ListElements
                        elements={collectionElements}
                        titleList={
                            <FormattedMessage
                                id="collection"
                                defaultMessage="TOP-5 Biggest Collections"
                            />
                        }
                        isLoading={isLoadingCollections}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" >
                        <FormattedMessage
                            id="tags"
                            defaultMessage="Tags"
                        />
                    </Typography>
                    <CloudTags />
                </Grid>
            </Grid>
        </Box>
    )
}