import React from "react"
import DatePickerController from "../../components/DatePickerController"
import TextFieldController from "../../components/TextFieldController"
import YesNoController from "../../components/YesNoController"


export default function ItemField(props) {
    const control = props.control
    const field = props.field

    return (
        <React.Fragment>
            {
                (field.fieldItem.typeField.name === 'Number' &&
                    <TextFieldController 
                        name={`fields[${props.index}].value`}
                        control={control}
                        defaultValue={field.value}
                        label={field.fieldItem.label}
                        variant="outlined"
                        type="number"
                        fullWidth
                    />
                ) ||
                (field.fieldItem.typeField.name === 'Text Line' &&
                    <TextFieldController 
                        name={`fields[${props.index}].value`}
                        control={control}
                        defaultValue={field.value}
                        label={field.fieldItem.label}
                        variant="outlined"
                        fullWidth
                    />
                ) ||
                (field.fieldItem.typeField.name === 'Text Multiple' &&
                    <TextFieldController 
                        name={`fields[${props.index}].value`}
                        control={control}
                        defaultValue={field.value}
                        label={field.fieldItem.label}
                        variant="outlined"
                        multiline
                        rows={5}
                        fullWidth
                    />
                ) ||
                (field.fieldItem.typeField.name === 'Date' &&
                    <DatePickerController 
                        name={`fields[${props.index}].value`}
                        control={control}
                        defaultValue={field.value}
                        label={field.fieldItem.label}
                        variant="outlined"
                        fullWidth
                    />
                ) ||
                (field.fieldItem.typeField.name === 'Checkbox' &&
                    <YesNoController 
                        name={`fields[${props.index}].value`}
                        control={control}
                        defaultValue={field.value}
                        label={field.fieldItem.label}
                    />
                )
            }

        </React.Fragment>
    )
}