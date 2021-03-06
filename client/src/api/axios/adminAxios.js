import axios from "axios"
import { 
    CHANGE_USERS_ROLE, 
    CHANGE_USERS_STATUS, 
    DELETE_USERS, 
    GET_USERS 
} from "../routes/nameRoutes"
import creatorOptions from "../tools/creatorOptions"

const token = {
    "x-access-token": localStorage.getItem("token")
}

export const getUsers = async () => {
    return await (await axios.get(GET_USERS.axios, creatorOptions( {token: true} ))).data
}

export const changeUsersStatus = async (users, status) => {
    await axios.put(
        CHANGE_USERS_STATUS.axios, 
        users, 
        creatorOptions( {token: true, params: { status }}) 
    )
    return { users, status }
}

export const changeUsersRole = async (users, role) => {
    await axios.put(
        CHANGE_USERS_ROLE.axios, 
        users, 
        creatorOptions( {token: true, params: { role }} )
    )
    return { users, role }
}

export const deleteUsers = async (users) => {
    await axios.delete(
        DELETE_USERS.axios, 
        creatorOptions( {token: true, data: users} )
    )
    return users
}
