import { IconButton, Stack } from "@mui/material"
import { useForm } from "react-hook-form"
import TextFieldController from "../../../components/controllers/TextFieldController"
import SendIcon from '@mui/icons-material/Send'
import { useDispatch, useSelector } from "react-redux"
import { addCommentAsync } from "../redux/commentsSlice"
import { useEffect } from "react"

export default function AddComment() {
    const { 
        handleSubmit, 
        control,
        watch,
        reset
    } = useForm()

    const dispatch = useDispatch()
    const item = useSelector(state => state.item.item)

    const addComment = data => {
        data.itemRef = item
        reset()
        dispatch(addCommentAsync(data))
    }

    return (
        <form onSubmit={handleSubmit(addComment)} noValidate>
            <Stack 
                direction="row"
                spacing={2}
            >
                <TextFieldController 
                    name="text"
                    control={control}
                    variant="outlined"
                    fullWidth
                />
                <IconButton 
                    type='submit'
                    disabled={watch('text') === ''}
                >
                    <SendIcon fontSize='large' />
                </IconButton>
            </Stack>        
        </form>
    )
}