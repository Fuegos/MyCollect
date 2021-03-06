import axios from "axios"
import { 
    CHECK_USER_TOKEN, 
    SIGN_IN_USER, 
    SIGN_UP_USER 
} from "../routes/nameRoutes"
import creatorOptions from "../tools/creatorOptions"


export const signUpUser = async user => {
    return await (await axios.post(SIGN_UP_USER.axios, user)).data
} 

export const signInUser = async user => {
    return await (
        await axios.get(
            SIGN_IN_USER.axios, 
            creatorOptions( {params: {
                email: user.email,
                password: user.password
            }} )
        )
    ).data
}

export const checkUserToken = async () => {
    return await (
        await axios.get(
            CHECK_USER_TOKEN.axios, 
            creatorOptions( {token: true} )
        )
    ).data
}