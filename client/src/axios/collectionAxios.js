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
    MODIFY_COLLECTION_SETTING_FIELDS
} from "./routes/routes"
import creatorOptions from "./creatorOptions"

const token = {
    "x-access-token": localStorage.getItem("token")
}

const tokenUpload = {
    "x-access-token": localStorage.getItem("token"),
    "Content-Type": "multipart/form-data"
}

export const getThemes = async () => {
    return await (await axios.get(GET_THEMES.axios, creatorOptions(token))).data
}

export const getTypeFields = async () => {
    return await (await axios.get(GET_TYPE_FIELDS.axios, creatorOptions(token))).data
}

export const getSettingFields = async collectionId => {
    const settingFields = await (
        await axios.get(GET_COLLECTION_SETTING_FIELDS.axios, creatorOptions(token, null, { collectionId }))
    ).data
    return { settingFields, collectionId }
}

export const getCollections = async () => {
    return await (await axios.get(GET_COLLECTIONS.axios, creatorOptions(token))).data
}

export const deleteCollection = async collectionId => {
    await axios.delete(DELETE_COLLECTION.axios, creatorOptions(token, null, { collectionId }))
    return collectionId
}

export const modifyCollection = async (_id, collection, newImg) => {
    if(newImg) {
        if(collection.img) {
            await axios.delete(DELETE_IMAGE.axios, creatorOptions(token, collection.img))
        }
        const uploadData = new FormData()
        uploadData.append("file", newImg, "file")
        collection.img = await (await axios.post(UPLOAD_IMAGE.axios, uploadData, creatorOptions(tokenUpload))).data
    }
    
    return await (await axios.post(MODIFY_COLLECTION.axios, {_id, collection}, creatorOptions(token))).data
}

export const modifySettingFields = async (settingFields, collectionId) => {
    return await (
        await axios.post(MODIFY_COLLECTION_SETTING_FIELDS.axios, settingFields, creatorOptions(token, null, { collectionId }))
    ).data
}
