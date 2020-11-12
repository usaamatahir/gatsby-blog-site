import React from "react"
import "firebase/auth"
import store from "./src/Redux/Store"
import { Provider } from "react-redux"

export const wrapRootElement = ({ element }) => (
  <Provider store={store}>{element}</Provider>
)
