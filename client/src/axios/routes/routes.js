import creatorRoute from "./creatorRoute"
import { GET, POST, DELETE, PUT } from "./globalRoutes"

export const GET_COLLECTIONS = creatorRoute(GET, '/collections')
export const MODIFY_COLLECTION = creatorRoute(POST, '/collection')
export const DELETE_COLLECTION = creatorRoute(DELETE, '/collection')
export const MODIFY_COLLECTION_SETTING_FIELDS = creatorRoute(POST, '/collection/setting/fields')
export const GET_COLLECTION_SETTING_FIELDS = creatorRoute(GET, '/collection/setting/fields')
export const GET_THEMES = creatorRoute(GET, '/themes')
export const GET_TYPE_FIELDS = creatorRoute(GET, '/type/fields')
export const UPLOAD_IMAGE = creatorRoute(POST, '/image')
export const DELETE_IMAGE = creatorRoute(DELETE, '/image')

export const GET_COLLECTION_ITEMS = creatorRoute(GET, '/collection/items') 



