import axios from "axios"
import { 
    GET_COLLECTION_ITEMS, 
    GET_TAGS, 
    MODIFY_COLLECTION_ITEM,
    DELETE_COLLECTION_ITEMS
} from "./routes/routes"
import creatorOptions from "./creatorOptions"

const token = {
    "x-access-token": localStorage.getItem("token")
}

export const getItems = async collectionId => {
    return await (await axios.get(GET_COLLECTION_ITEMS.axios, creatorOptions(token, null, {collectionId}))).data
}

export const modifyItem = async (item) => {
    return await (await axios.post(MODIFY_COLLECTION_ITEM.axios, item, creatorOptions(token))).data
}

export const getTags = async () => {
    return await (await axios.get(GET_TAGS.axios, creatorOptions(token))).data
}

export const deleteItems = async items => {
    await axios.delete(DELETE_COLLECTION_ITEMS.axios, creatorOptions(token, items))
    return items
}