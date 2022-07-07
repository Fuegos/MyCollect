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
export const MODIFY_COLLECTION_ITEM = creatorRoute(POST, '/collection/item')
export const GET_TAGS = creatorRoute(GET, '/tags')
export const DELETE_COLLECTION_ITEMS = creatorRoute(DELETE, '/collection/items')

export const GET_COMMENTS = creatorRoute(GET, '/comments')
export const ADD_COMMENT = creatorRoute(POST, '/comment')

export const GET_LIKES = creatorRoute(GET, '/likes')
export const MODIFY_LIKE = creatorRoute(POST, '/like')

export const GET_ITEMS_LAST = creatorRoute(GET, '/items/last')
export const GET_COLLECTIONS_BIGGEST = creatorRoute(GET, '/collections/biggest')

export const GET_USERS = creatorRoute(GET, '/users')
export const CHANGE_USERS_STATUS = creatorRoute(PUT, '/users/status')
export const CHANGE_USERS_ROLE = creatorRoute(PUT, '/users/role')
export const DELETE_USERS = creatorRoute(DELETE, '/users')
export const SIGN_IN_USER = creatorRoute(GET, '/user/sign/in')
export const SIGN_UP_USER = creatorRoute(POST, '/user/sign/up')
export const CHECK_USER_TOKEN = creatorRoute(GET, '/user/token')