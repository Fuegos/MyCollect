import axios from "axios"
import { 
    MODIFY_LIKE
} from "./routes/routes"
import creatorOptions from "./creatorOptions"

const token = {
    "x-access-token": localStorage.getItem("token")
}

export const modifyLike = async itemId => {
    return await (await axios.post(MODIFY_LIKE.axios, { itemId }, creatorOptions(token))).data
}