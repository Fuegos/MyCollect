import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from '../authUser/redux/authUserSlice'
import langReducer from '../lang/redux/langSlice'
import themeModeReducer from '../themeMode/redux/themeModeSlice'
import adminReducer from '../admin/redux/adminSlice'


export default configureStore({
  reducer: {
    authUser: authUserReducer,
    admin: adminReducer,
    lang: langReducer,
    themeMode: themeModeReducer
  },
})