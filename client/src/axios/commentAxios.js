import axios from "axios"
import { 
    GET_COMMENTS,
    ADD_COMMENT
} from "./routes/routes"
import creatorOptions from "./creatorOptions"

const token = {
    "x-access-token": localStorage.getItem("token")
}

export const getComments = async itemShortId => {
    return await (await axios.get(GET_COMMENTS.axios, creatorOptions(token, null, {itemShortId}))).data
}

export const addComment = async comment => {
    return await (await axios.post(ADD_COMMENT.axios, comment, creatorOptions(token))).data
}