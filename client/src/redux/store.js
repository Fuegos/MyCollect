import { configureStore } from '@reduxjs/toolkit'
import authUsersReducer from '../modules/authUsers/redux/authUsersSlice'
import langsReducer from '../components/langs/redux/langSlice'
import themesReducer from '../components/themes/redux/themeModeSlice'
import adminReducer from '../modules/admin/redux/adminSlice'
import collectionsReducer from '../modules/collections/redux/collectionsSlice'
import settingFieldsReducer from '../modules/collections/redux/settingFieldsSlice'
import itemsReducer from '../modules/items/redux/itemsSlice'
import commentsReducer from '../modules/comments/redux/commentsSlice'
import likesReducer from '../components/likes/redux/likeSlice'
import tagsReducer from '../components/tags/redux/tagSlice'
import errorsReducer from '../components/errors/redux/errorsSlice'
import collectionReducer from '../modules/collections/redux/collectionSlice'
import itemReducer from '../modules/items/redux/itemSlice'
import searchReducer from '../components/search/redux/searchSlice'
import dialogsReducer from '../components/dialogs/redux/dialogsSlice'


export default configureStore({
  reducer: {
    authUsers: authUsersReducer,
    admin: adminReducer,
    langs: langsReducer,
    themes: themesReducer,
    collections: collectionsReducer,
    collection: collectionReducer,
    settingFields: settingFieldsReducer,
    items: itemsReducer,
    item: itemReducer,
    comments: commentsReducer,
    likes: likesReducer,
    tags: tagsReducer,
    errors: errorsReducer,
    search: searchReducer,
    dialogs: dialogsReducer
  },
})