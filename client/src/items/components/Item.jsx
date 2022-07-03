import { useSelector } from "react-redux"
import { Box, Chip, Typography, Stack } from "@mui/material"
import { FormattedMessage } from 'react-intl'


export default function Item() {
    const selectedItem = useSelector(state => state.items.editableItem)
    const fields = selectedItem.fields.map(f => {
        if(f.fieldItem.typeField.name === 'Checkbox') {
            return {
                _id: f._id,
                label: f.fieldItem.label,
                value: f.value ?
                    <FormattedMessage
                        id="component.yesno.yes"
                        defaultMessage="Yes"
                    /> : 
                    <FormattedMessage
                        id="component.yesno.no"
                        defaultMessage="No"
                    />
            }   
        } else {
            return {
                _id: f._id,
                label: f.fieldItem.label,
                value: f.value
            }
        }
    })
    console.log(selectedItem, fields)

    return (
        <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 2, mt: 3, mx: 5 }}>
            <Stack
                direction='row'
                spacing={1}
            >
                <Typography variant="h4" >
                    {selectedItem.name}
                </Typography>
                {
                    selectedItem.tags.map(t => (
                        <Chip 
                            key={t._id}
                            label={t.name}
                            color="success"
                            size="small"
                        />
                    ))
                }
            </Stack>
            {
                fields.map(f => (
                    <Typography variant="h6" key={f._id}>
                        {f.label}:{f.value}
                    </Typography>
                ))
            }
            
        </Box>
    )
}