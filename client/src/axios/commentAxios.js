import axios from "axios"
import { 
    ADD_COMMENT
} from "./routes/routes"
import creatorOptions from "./creatorOptions"

const token = {
    "x-access-token": localStorage.getItem("token")
}

export const addComment = async comment => {
    return await (await axios.post(ADD_COMMENT.axios, comment, creatorOptions(token))).data
}