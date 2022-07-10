import { 
    IconButton, 
    Grid
} from '@mui/material'
import AutocompleteController from '../../../components/controllers/AutocompleteController'
import ClearIcon from '@mui/icons-material/Clear'
import TextFieldController from "../../../components/controllers/TextFieldController"
import { FormattedMessage } from 'react-intl'


export default function SettingField(props) {
    const settingField = props.settingField
    
    return (
        <Grid container 
            direction='row' 
            spacing={1}
        >
            <Grid item xs={5}>
                <AutocompleteController 
                    name={`settingFields[${props.index}].typeField`}
                    control={props.control}
                    defaultValue={settingField.typeField}
                    options={props.options}
                    getOptionLabel={o => o.name}
                    error={props.errors?.settingFields?.[props.index]?.typeField}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    label = {
                        <FormattedMessage
                            id="collection.setting.field.label.type.field"
                            defaultMessage="Type Field"
                        />
                    }
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={5}>
                <TextFieldController 
                    name={`settingFields[${props.index}].label`}
                    control={props.control}
                    defaultValue={settingField.label}
                    error={props.errors?.settingFields?.[props.index]?.label}
                    variant="outlined"
                    label = {
                        <FormattedMessage
                            id="collection.setting.field.label.label"
                            defaultMessage="Label"
                        />
                    }
                    fullWidth
                />
            </Grid>
            <Grid item xs={2}>
                <IconButton
                    onClick={() => props.remove(props.index)}
                >
                    <ClearIcon />
                </IconButton>
            </Grid>
        </Grid>
    )
}