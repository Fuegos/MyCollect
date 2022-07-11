import { useSelector } from "react-redux"
import { Box, Chip, Typography, Stack } from "@mui/material"
import { FormattedMessage } from 'react-intl'
import Like from "../../../components/likes/Like"
import dateFormat, { masks } from 'dateformat'


export default function Item() {
    const item = useSelector(state => state.item.item)

    const fields = item.fields.map(f => {
        if(f.settingField.typeField.name === 'Checkbox') {
            return {
                _id: f._id,
                label: f.settingField.label,
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
        } else if(f.settingField.typeField.name === 'Date') {
            return {
                _id: f._id,
                label: f.settingField.label,
                value: dateFormat(f.value, "dd mmmm yyyy")
            }
        } else {
            return {
                _id: f._id,
                label: f.settingField.label,
                value: f.value
            }
        }
    })


    return (
        <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 2 }}>
            <Stack
                direction='row'
                spacing={1}
            >
                <Typography variant="h4" >
                    {item.name}
                </Typography>
                {
                    item.tags.map(t => (
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
                    <Typography variant="subtitle1" key={f._id}>
                        {f.label}: {f.value}
                    </Typography>
                ))
            }
            <Box>
                <Like />
            </Box>
        </Box>
    )
}