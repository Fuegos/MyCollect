import { Box, Stack, Chip } from "@mui/material"
import { useSelector } from "react-redux"
import CollectionInfo from "./CollectionInfo"
import { DataGrid } from '@mui/x-data-grid'
import { langLocaleDataGrid } from "../../lang/data/dataLangs"
import React from "react"
import { FormattedMessage } from 'react-intl'

export default function Items() {
    const collection = useSelector(state => state.items.collection)
    const isProccess = useSelector(state => state.items.isProccess)
    const items = useSelector(state => state.items.items)
    const lang = useSelector(state => state.lang.lang)
    const itemFields = useSelector(state => state.items.itemFields)

    const columns = [
        {
            field: 'shortId',
            headerName: 'ID'
        },
        {
            field: 'name',
            headerName: 'Name'
        },
        {
            field: 'tags',
            headerName: 'Tags',
            renderCell: params => (
                <Stack direction='row' spacing={1}>
                    {
                        params.value.map(t => (
                            <Chip 
                                key={t._id}
                                label={t.name}
                            />
                        ))
                    }
                </Stack>
            )
        }
    ]

    itemFields.forEach(f => {
        const options = {
            field: f._id,
            headerName: f.label
        }
        if(f.typeField.name === 'Date') {
            options.type = 'date'
        }
        if(f.typeField.name === 'Number') {
            options.type = 'number'
        }
        if(f.typeField.name === 'Checkbox') {
            options.renderCell = params => params.value ?
                <FormattedMessage
                    id="component.yesno.yes"
                    defaultMessage="Yes"
                /> : 
                <FormattedMessage
                    id="component.yesno.no"
                    defaultMessage="No"
                />
        }

        columns.push(options)

    })

    const rows = items.map(i => {
        const item = {
            _id: i._id,
            shortId: i.shortId,
            name: i.name,
            tags: i.tags
        }
        i.fields.forEach(f => {
            console.log(f)
            item[f.fieldItem._id] = f.value
        })
        return item
    })

    console.log(rows, columns)

    
    return(
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={row => row._id}
                getRowHeight={() => 'auto'}
                getEstimatedRowHeight={() => 10}
                pageSize={20}
                rowsPerPageOptions={[20]}
                checkboxSelection
                disableSelectionOnClick
                localeText={langLocaleDataGrid[lang].components.MuiDataGrid.defaultProps.localeText}
            />
        </Box>
    )
}