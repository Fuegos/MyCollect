import { API } from './globalRoutes'

export default function creatorRoute(method, path) {
    return {
        axios: API + path,
        redux: path + method 
    }
}