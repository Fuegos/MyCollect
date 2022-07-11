import { 
    Dialog,
    DialogContent,
    DialogTitle,
    Box,
    Stack,
    IconButton,
    Chip, 
    Avatar
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import TextFieldController from "../controllers/TextFieldController";
import { searchAsync } from "./redux/searchSlice";
import SearchIcon from '@mui/icons-material/Search'
import { FormattedMessage } from 'react-intl'
import ListElements from "../ListElements";
import { closeDialog } from "../dialogs/redux/dialogsSlice";
import { useEffect } from "react";
import { SEARCH_DIALOG } from "../dialogs/data/dialogs";

export default function DialogSearch() {
    const isOpenedDialog = useSelector(state => state.dialogs.dialogs.includes(SEARCH_DIALOG))
    const text = useSelector(state => state.search.text)
    const isLoading = useSelector(state => state.search.isLoading)
    const result = useSelector(state => state.search.result)
    const dispatch = useDispatch()

    const { 
        handleSubmit, 
        control,
        setValue
    } = useForm()

    useEffect(() => {
        setValue("text", text)
    }, [text])


    const resultContent = result.map(r => {
        return {
            key: r._id,
            path: `../${r.type}/${r.shortId}`,
            avatar: 
                <Avatar>
                    <FormattedMessage
                        id={r.avatar}
                        defaultMessage="ITM"
                    />
                </Avatar>
            ,
            primaryText: r.text.body,
            optionalComponent: 
                <Stack
                    direction='row'
                >
                    <Chip 
                        label={
                            <FormattedMessage
                                id={r.text.head}
                                defaultMessage="In"
                            />
                        } 
                        size="small" 
                    />
                </Stack>
        }
    })

    const search = data => {
        dispatch(searchAsync(data.text))
    }

    return (
        <Dialog 
            open={isOpenedDialog} 
            onClose={() => dispatch(closeDialog(SEARCH_DIALOG))}
            fullWidth
        >
            <form onSubmit={handleSubmit(search)} noValidate>
                <DialogTitle>
                    <FormattedMessage
                        id="search.header"
                        defaultMessage="Search"
                    />
                </DialogTitle>
                <DialogContent>
                    <Box mt={2}>
                        <Stack
                            direction='column' 
                            spacing={2}
                            justifyContent="space-evenly"
                        >
                            <Stack 
                                direction='row' 
                                spacing={1}
                                justifyContent="space-evenly"
                                alignItems="center"
                            >
                                <TextFieldController 
                                    name="text"
                                    control={control}
                                    variant="outlined"
                                    fullWidth
                                />
                                <IconButton
                                    type="submit"
                                >
                                    <SearchIcon fontSize="large" />
                                </IconButton>
                            </Stack>
                            <ListElements 
                                elements={resultContent}
                                titleList={
                                    <FormattedMessage
                                        id="search.result.header"
                                        defaultMessage="Result"
                                    />
                                }
                                isLoading={isLoading}
                                noElemetsMessage={
                                    <FormattedMessage
                                        id="search.result.no"
                                        defaultMessage="No results"
                                    />
                                }
                            />
                        </Stack>
                    </Box>
                </DialogContent>
            </form>
        </Dialog>
    )
}