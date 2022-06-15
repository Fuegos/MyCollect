import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from './authUser/redux/authUserSlice'

export default configureStore({
  reducer: {
    authUser: authUserReducer
  },
})