import axios from "axios"
import { 
    SEARCH
} from "../routes/nameRoutes"
import creatorOptions from "../tools/creatorOptions"


export const search = async text => {
    return await (await axios.get(SEARCH.axios, creatorOptions(null, null, { text }))).data
}