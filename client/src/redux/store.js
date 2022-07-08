import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from '../authUser/redux/authUserSlice'
import langReducer from '../lang/redux/langSlice'
import themeModeReducer from '../themeMode/redux/themeModeSlice'
import adminReducer from '../admin/redux/adminSlice'
import collectionsReducer from '../collections/redux/collectionsSlice'
import settingFieldsReducer from '../collections/redux/settingFieldsSlice'
import itemsReducer from '../items/redux/itemsSlice'
import commentsReducer from '../comments/redux/commentsSlice'
import likeReducer from '../like/redux/likeSlice'
import tagsReducer from '../tag/redux/tagSlice'
import errorsReducer from '../error/redux/errorsSlice'
import collectionReducer from '../collections/redux/collectionSlice'
import itemReducer from '../items/redux/itemSlice'

export default configureStore({
  reducer: {
    authUser: authUserReducer,
    admin: adminReducer,
    lang: langReducer,
    themeMode: themeModeReducer,
    collections: collectionsReducer,
    collection: collectionReducer,
    settingFields: settingFieldsReducer,
    items: itemsReducer,
    item: itemReducer,
    comments: commentsReducer,
    like: likeReducer,
    tags: tagsReducer,
    errors: errorsReducer
  },
})