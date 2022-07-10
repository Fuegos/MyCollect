import axios from "axios"
import { 
    ADD_COMMENT
} from "../routes/nameRoutes"
import creatorOptions from "../tools/creatorOptions"


export const addComment = async comment => {
    return await (
        await axios.post(
            ADD_COMMENT.axios, 
            comment, 
            creatorOptions( {token: true} )
        )
    ).data
}