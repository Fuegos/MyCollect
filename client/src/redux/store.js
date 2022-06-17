import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from '../authUser/redux/authUserSlice'
import langReducer from '../lang/redux/langSlice'
import themeModeReducer from '../themeMode/redux/themeModeSlice'


export default configureStore({
  reducer: {
    authUser: authUserReducer,
    lang: langReducer,
    themeMode: themeModeReducer
  },
})