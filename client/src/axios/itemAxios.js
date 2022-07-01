import axios from "axios"
import { 
    GET_COLLECTION_ITEMS
} from "./routes/routes"
import creatorOptions from "./creatorOptions"

const token = {
    "x-access-token": localStorage.getItem("token")
}

export const getItems = async collectionId => {
    return await (await axios.get(GET_COLLECTION_ITEMS.axios, creatorOptions(token, null, {collectionId}))).data
}