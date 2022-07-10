import axios from "axios"
import { 
    GET_COLLECTION_ITEMS, 
    GET_TAGS, 
    MODIFY_COLLECTION_ITEM,
    DELETE_COLLECTION_ITEMS,
    GET_ITEMS_LAST,
    GET_ITEM
} from "../routes/nameRoutes"
import creatorOptions from "../tools/creatorOptions"

const token = {
    "x-access-token": localStorage.getItem("token")
}

export const getItems = async collectionShortId => {
    return await (await axios.get(GET_COLLECTION_ITEMS.axios, creatorOptions(token, null, {collectionShortId}))).data
}

export const getItem = async itemShortId => {
    return await (await axios.get(GET_ITEM.axios, creatorOptions(null, null, { itemShortId }))).data
}

export const getItemsLast = async limit => {
    return await (await axios.get(GET_ITEMS_LAST.axios, creatorOptions(null, null, { limit }))).data
}

export const modifyItem = async item => {
    return await (await axios.post(MODIFY_COLLECTION_ITEM.axios, item, creatorOptions(token))).data
}

export const getTags = async () => {
    return await (await axios.get(GET_TAGS.axios, creatorOptions(token))).data
}

export const deleteItems = async itemIds => {
    await axios.delete(DELETE_COLLECTION_ITEMS.axios, creatorOptions(token, itemIds))
    return itemIds
}