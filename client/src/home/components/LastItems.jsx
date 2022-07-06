import React from 'react'
import { useSelector } from 'react-redux'
import LastItem from './LastItem'
import { FormattedMessage } from 'react-intl'
import { Typography } from '@mui/material'


export default function LastItems() {
    const items = useSelector(state => state.items.items)

    return(
        <React.Fragment>
            <Typography variant="h4" >
                <FormattedMessage
                    id="collection.item"
                    defaultMessage="Last Items"
                />
            </Typography>
            {
                items.map(i => (<LastItem key={i._id} item={i} />))
            }
        </React.Fragment>
    )
}