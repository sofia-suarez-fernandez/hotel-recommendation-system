import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./types";

const initialState: InitialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: false,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSucceed: (state, action) => {
      localStorage.setItem("access", action.payload.access);
      localStorage.setItem("refresh", action.payload.refresh);

      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      state.isAuthenticated = true;
      state.error = null;
    },
    loadSucceed: (state, action) => {
      state.user = {
        id: action.payload.id,
        email: action.payload.email,
        username: action.payload.username,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        is_staff: action.payload.is_staff,
      };
    },
    signInFailed: (state, action) => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      state.access = null;
      state.refresh = null;
      state.isAuthenticated = false;
      state.user = null;
      state.error = {
        email: action.payload.email,
        password: action.payload.password,
        detail: action.payload.detail,
      };
    },
    loadFailed: (state) => {
      state.user = null;
    },
    signOut: (state) => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      state.access = null;
      state.refresh = null;
      state.isAuthenticated = false;
      state.user = null;

      window.location.reload();
    },
    authenticationSucceed: (state) => {
      state.isAuthenticated = true;
    },
    authenticationFailed: (state) => {
      state.isAuthenticated = false;
    },
    tokensRefreshed: (state, action) => {
      localStorage.setItem("access", action.payload.access);

      state.access = action.payload.access;
    },
    passwordResetSucceed: () => {},
    passwordResetFailed: (state, action) => {
      state.error = {
        email: action.payload.email,
        not_email: action.payload,
      };
    },
    passwordResetConfirmSucceed: (state) => {
      state.error = {
        new_password: null,
        re_new_password: null,
        non_field_errors: null,
        token: null,
      };
    },
    passwordResetConfirmFailed: (state, action) => {
      state.error = {
        new_password: action.payload.new_password,
        re_new_password: action.payload.re_new_password,
        non_field_errors: action.payload.non_field_errors,
        token: action.payload.token,
      };
    },
    activationSucceed: () => {},
    activationFailed: () => {},
    signUpSucceed: (state) => {
      state.isAuthenticated = false;
      state.error = {
        username: null,
        email: null,
        password: null,
        re_password: null,
        non_field_errors: null,
      };
    },
    signUpFailed: (state, action) => {
      state.access = null;
      state.refresh = null;
      state.isAuthenticated = false;
      state.user = null;
      state.error = {
        username: action.payload.username,
        email: action.payload.email,
        password: action.payload.password,
        re_password: action.payload.re_password,
        non_field_errors: action.payload.non_field_errors,
      };
    },
  },
});

export default userSlice.reducer;
export const {
  signInFailed,
  signInSucceed,
  loadFailed,
  loadSucceed,
  signOut,
  authenticationSucceed,
  authenticationFailed,
  tokensRefreshed,
  passwordResetSucceed,
  passwordResetFailed,
  passwordResetConfirmSucceed,
  passwordResetConfirmFailed,
  activationSucceed,
  activationFailed,
  signUpSucceed,
  signUpFailed,
} = userSlice.actions;
