import axios from "axios"
import { 
    GET_THEMES, 
    GET_TYPE_FIELDS,
    GET_COLLECTION_SETTING_FIELDS,
    GET_COLLECTIONS,
    DELETE_COLLECTION,
    MODIFY_COLLECTION,
    DELETE_IMAGE,
    UPLOAD_IMAGE, 
    MODIFY_COLLECTION_SETTING_FIELDS,
    GET_COLLECTIONS_BIGGEST
} from "../routes/nameRoutes"
import creatorOptions from "../tools/creatorOptions"


export const getThemes = async () => {
    return await (
        await axios.get(
            GET_THEMES.axios, 
            creatorOptions( {token: true} )
        )
    ).data
}

export const getTypeFields = async () => {
    return await (
        await axios.get(
            GET_TYPE_FIELDS.axios, 
            creatorOptions( {token: true} )
        )
    ).data
}

export const getSettingFields = async collectionId => {
    const settingFields = await (
        await axios.get(
            GET_COLLECTION_SETTING_FIELDS.axios, 
            creatorOptions( {token: true, params: { collectionId }} )
        )
    ).data
    return { settingFields, collectionId }
}

export const getCollections = async () => {
    return await (
        await axios.get(
            GET_COLLECTIONS.axios, 
            creatorOptions( {token: true} )
        )
    ).data
}

export const getCollectionsBiggest = async limit => {
    return await (
        await axios.get(
            GET_COLLECTIONS_BIGGEST.axios, 
            creatorOptions( {params: { limit }} )
        )
    ).data
}

export const deleteCollection = async collectionId => {
    await axios.delete(
        DELETE_COLLECTION.axios, 
        creatorOptions( {token: true, params: { collectionId }} )
    )
    return collectionId
}

export const modifyCollection = async (_id, collection, newImg) => {
    if(newImg) {
        if(collection.img) {
            await axios.delete(
                DELETE_IMAGE.axios, 
                creatorOptions( {token: true, data: collection.img} )
            )
        }
        const uploadData = new FormData()
        uploadData.append("file", newImg, "file")
        collection.img = await (
            await axios.post(
                UPLOAD_IMAGE.axios, 
                uploadData, 
                creatorOptions( {token: true, upload: true} )
            )
        ).data
    }
    
    return await (
        await axios.post(
            MODIFY_COLLECTION.axios, 
            {_id, collection}, 
            creatorOptions( {token: true} )
        )
    ).data
}

export const modifySettingFields = async (settingFields, collectionId) => {
    return await (
        await axios.post(
            MODIFY_COLLECTION_SETTING_FIELDS.axios, 
            settingFields, 
            creatorOptions( {token: true, params: { collectionId }} )
        )
    ).data
}
