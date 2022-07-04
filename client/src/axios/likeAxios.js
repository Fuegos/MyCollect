import axios from "axios"
import { 
    GET_LIKES,
    MODIFY_LIKE
} from "./routes/routes"
import creatorOptions from "./creatorOptions"

const token = {
    "x-access-token": localStorage.getItem("token")
}

export const getLikes = async itemId => {
    return await (await axios.get(GET_LIKES.axios, creatorOptions(token, null, {itemId}))).data
}

export const modifyLike = async item => {
    return await (await axios.post(MODIFY_LIKE.axios, item, creatorOptions(token))).data
}