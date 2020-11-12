import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type StateType = {
  setAuthState: "LOGIN" | "SIGNUP" | "PROFILE"
}

const initialState: StateType = {
  setAuthState: "LOGIN",
}

const AuthPage = createSlice({
  name: "authPage",
  initialState,
  reducers: {
    changeAuthState: (
      state,
      { payload }: PayloadAction<"LOGIN" | "SIGNUP" | "PROFILE">
    ) => {
      return {
        ...state,
        setAuthState: payload,
      }
    },
  },
})

export const { changeAuthState } = AuthPage.actions
export default AuthPage.reducer
