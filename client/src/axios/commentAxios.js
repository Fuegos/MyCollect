import axios from "axios"
import { 
    GET_COMMENTS,
    ADD_COMMENT
} from "./routes/routes"
import creatorOptions from "./creatorOptions"

const token = {
    "x-access-token": localStorage.getItem("token")
}

export const getComments = async itemId => {
    return await (await axios.get(GET_COMMENTS.axios, creatorOptions(token, null, {itemId}))).data
}

export const addComment = async comment => {
    return await (await axios.post(ADD_COMMENT.axios, comment, creatorOptions(token, null, {room: comment.item._id}))).data
}