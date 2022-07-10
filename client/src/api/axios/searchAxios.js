import axios from "axios"
import { 
    SEARCH, SEARCH_BY_TAG
} from "../routes/nameRoutes"
import creatorOptions from "../tools/creatorOptions"


export const search = async text => {
    return await (
        await axios.get(
            SEARCH.axios, 
            creatorOptions( {params: { text }} )
        )
    ).data
}

export const searchByTag = async text => {
    return await (
        await axios.get(
            SEARCH_BY_TAG.axios, 
            creatorOptions( {params: { text }} )
        )
    ).data
}