import axios from "axios"
import { 
    MODIFY_LIKE
} from "../routes/nameRoutes"
import creatorOptions from "../tools/creatorOptions"

const token = {
    "x-access-token": localStorage.getItem("token")
}

export const modifyLike = async itemId => {
    return await (await axios.post(MODIFY_LIKE.axios, { itemId }, creatorOptions(token))).data
}