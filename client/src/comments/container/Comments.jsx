import { 
    Typography, 
    Box,
    LinearProgress,
    Stack 
} from "@mui/material"
import React, { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SocketContext } from "../../socket/socketContext"
import AddComment from "../components/AddComment"
import Comment from "../components/Comment"
import { getComment } from "../redux/commentsSlice"


export default function Comments() {
    const comments = useSelector(state => state.comments.comments)
    const isProccess = useSelector(state => state.comments.isProccess)
    const item = useSelector(state => state.comments.item)
    const socket = useContext(SocketContext)
    const dispatch = useDispatch()

    useEffect(() => {
        if(item) {
            socket.emit('join:item', item._id)
        }

        socket.on('get:comment', comment => {
            dispatch(getComment(comment))
        })

        return () => {
            if(item) {
                socket.emit('leave:item', item._id)
            }
            socket.off('get:comment')
        }
    }, [item])

    const content = isProccess ?
        <LinearProgress /> :
        (
            <Stack
                direction='column'
                spacing={1}
            >
                <Typography variant="h4" >
                    Comments
                </Typography>
                {comments.map(c => (
                    <Comment key={c._id} comment={c} />
                ))}
                <AddComment />
            </Stack>
            
        )

    return (
        <Box sx={{ 
            bgcolor: 'primary.main', 
            color: 'primary.contrastText', 
            p: 2, 
            mt: 3, 
            mx: 5 
        }}>
            {content}
        </Box>
    )
}