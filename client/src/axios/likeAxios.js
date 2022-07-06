import axios from "axios"
import { 
    GET_LIKES,
    MODIFY_LIKE
} from "./routes/routes"
import creatorOptions from "./creatorOptions"

const token = {
    "x-access-token": localStorage.getItem("token")
}

export const getLikes = async itemShortId => {
    return await (await axios.get(GET_LIKES.axios, creatorOptions(token, null, {itemShortId}))).data
}

export const modifyLike = async itemId => {
    return await (await axios.post(MODIFY_LIKE.axios, { itemId }, creatorOptions(token))).data
}