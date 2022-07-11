import { 
    Typography, 
    Box,
    LinearProgress,
    Stack 
} from "@mui/material"
import React, { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SocketContext } from "../../../api/socket/socketContext"
import AddComment from "../components/AddComment"
import Comment from "./Comment"
import { getComment } from "../redux/commentsSlice"
import { FormattedMessage } from 'react-intl'


export default function Comments() {
    const comments = useSelector(state => state.comments.comments)
    const isProccess = useSelector(state => state.comments.isProccess)
    const item = useSelector(state => state.item.item)
    const socket = useContext(SocketContext)
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.authUsers.isAuth)

    useEffect(() => {
        if(item._id) {
            socket.emit('join:item', item._id)
        }

        socket.on('get:comment', comment => {
            dispatch(getComment(comment))
        })

        return () => {
            if(item._id) {
                socket.emit('leave:item', item._id)
            }
            socket.off('get:comment')
        }
    }, [item])


    return (
        <Box sx={{ 
            bgcolor: 'primary.main', 
            p: 2, 
            mt: 2
        }}>
            <Stack
                direction='column'
                spacing={1}
            >
                <Typography variant="h4" >
                    <FormattedMessage
                        id="comments.header"
                        defaultMessage="Comments"
                    />
                </Typography>
                {comments.map(c => (
                    <Comment key={c._id} comment={c} />
                ))}
                {isAuth && <AddComment /> }
            </Stack>
        </Box>
    )
}