import { Box, Stack, Chip, IconButton } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { DataGrid } from '@mui/x-data-grid'
import { langLocaleDataGrid } from "../../../components/langs/data/dataLangs"
import React from "react"
import { FormattedMessage } from 'react-intl'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import { setSelectedItems } from "../redux/itemsSlice"
import { useNavigate } from "react-router-dom"
import { setItem } from "../redux/itemSlice"
import AccessProvider from "../../../components/access/AccessProvider"
import { openDialog } from "../../../components/dialogs/redux/dialogsSlice"
import { ITEM_DIALOG } from "../../../components/dialogs/data/dialogs"


export default function Items() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const items = useSelector(state => state.items.items)
    const lang = useSelector(state => state.langs.lang)
    const settingFields = useSelector(state => state.collection.collection.settingFields)
    const selectedItems = useSelector(state => state.items.selectedItems)
    const isLoading = useSelector(state => state.items.getIsLoading)

    const columns = [
        {
            field: 'show',
            filterable: false,
            sortable: false,
            hideable: false,
            renderHeader: () => null,
            align: 'center',
            width: 20,
            renderCell: params => (
                <IconButton
                    onClick={() => {
                        const selectedItem = items.filter(i => i._id === params.row._id)[0]
                        navigate(`../item/${selectedItem.shortId}`)
                    }}
                >
                    <VisibilityIcon />
                </IconButton>
            )
        },
        {
            field: 'edit',
            filterable: false,
            sortable: false,
            hideable: false,
            renderHeader: () => null,
            align: 'center',
            width: 20,
            renderCell: params => (
                <AccessProvider 
                    component={() =>
                        <IconButton
                            onClick={() => {
                                const selectedItem = items.filter(i => i._id === params.row._id)[0]
                                dispatch(setItem(selectedItem))
                                dispatch(openDialog(ITEM_DIALOG))
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                    }
                    item={items.filter(i => i._id === params.row._id)[0]}
                />
            )
        },
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

    settingFields.forEach(f => {
        const options = {
            field: f._id,
            headerName: f.label
        }
        if(f.typeField.name === 'Date') {
            options.type = 'date'
        }
        if(f.typeField.name === 'Number') {
            options.type = 'number'
            options.align = 'center'
        }
        if(f.typeField.name === 'Checkbox') {
            options.align = 'center'
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
            item[f.settingField._id] = f.value
        })
        return item
    })

    
    return(
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                onSelectionModelChange={newSelected => {
                    dispatch(setSelectedItems(newSelected))
                }}
                selectionModel={selectedItems}
                getRowId={row => row._id}
                getRowHeight={() => 'auto'}
                getEstimatedRowHeight={() => 10}
                pageSize={20}
                rowsPerPageOptions={[20]}
                loading={isLoading}
                checkboxSelection
                disableSelectionOnClick
                showColumnRightBorder
                showCellRightBorder
                localeText={langLocaleDataGrid[lang].components.MuiDataGrid.defaultProps.localeText}
            />
        </Box>
    )
}