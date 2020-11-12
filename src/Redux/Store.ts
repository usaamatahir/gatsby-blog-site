import { configureStore } from "@reduxjs/toolkit"
import AuthReducer from "./Slicer"

const store = configureStore({
  reducer: AuthReducer,
})

export default store
