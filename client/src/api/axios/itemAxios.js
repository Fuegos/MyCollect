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


export const getItems = async collectionShortId => {
    return await (
        await axios.get(
            GET_COLLECTION_ITEMS.axios, 
            creatorOptions( {token: true, params: {collectionShortId}} )
        )
    ).data
}

export const getItem = async itemShortId => {
    return await (
        await axios.get(
            GET_ITEM.axios, 
            creatorOptions( {params: { itemShortId }} )
        )
    ).data
}

export const getItemsLast = async limit => {
    return await (
        await axios.get(
            GET_ITEMS_LAST.axios, 
            creatorOptions( {params: { limit }} )
        )
    ).data
}

export const modifyItem = async item => {
    return await (
        await axios.post(MODIFY_COLLECTION_ITEM.axios, item, creatorOptions( {token: true} ))
    ).data
}

export const getTags = async () => {
    return await (await axios.get(GET_TAGS.axios, creatorOptions( {token: true} ))).data
}

export const deleteItems = async itemIds => {
    await axios.delete(
        DELETE_COLLECTION_ITEMS.axios, 
        creatorOptions( {token: true, data: itemIds })
    )
    return itemIds
}