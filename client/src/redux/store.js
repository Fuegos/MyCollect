import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from '../authUser/redux/authUserSlice'
import langReducer from '../lang/redux/langSlice'
import themeModeReducer from '../themeMode/redux/themeModeSlice'
import adminReducer from '../admin/redux/adminSlice'
import collectionsReducer from '../collections/redux/collectionsSlice'
import settingFieldsReducer from '../collections/redux/settingFieldsSlice'


export default configureStore({
  reducer: {
    authUser: authUserReducer,
    admin: adminReducer,
    lang: langReducer,
    themeMode: themeModeReducer,
    collections: collectionsReducer,
    settingFields: settingFieldsReducer
  },
})