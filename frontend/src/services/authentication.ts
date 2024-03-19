import axios from "axios";
import store from "../app/store";
import {
  activationFailed,
  activationSucceed,
  authenticationFailed,
  authenticationSucceed,
  loadFailed,
  loadSucceed,
  passwordResetConfirmFailed,
  passwordResetConfirmSucceed,
  passwordResetFailed,
  passwordResetSucceed,
  signInFailed,
  signInSucceed,
  signUpFailed,
  signUpSucceed,
  tokensRefreshed,
} from "../features/user/userSlice";

export const loadUser = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "JWT " + localStorage.getItem("access"),
      Accept: "application/json",
    },
  };
  const response = await axios
    .get(`http://localhost:8000/auth/users/me/`, config)
    .then((response) => {
      store.dispatch(loadSucceed(response.data));
    })
    .catch(() => {
      store.dispatch(loadFailed());
    });
  return response;
};

export const signIn = async (email, password) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const body = {
    email: email,
    password: password,
  };

  const response = await axios
    .post(`http://localhost:8000/auth/jwt/create/`, body, config)
    .then((response) => {
      store.dispatch(signInSucceed(response.data));
    })
    .then(() => {
      loadUser();
    })
    .catch((error) => {
      store.dispatch(signInFailed(error.response.data));
    });

  return response;
};

export const refreshTokens = async () => {
  if (localStorage.getItem("refresh")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const body = {
      refresh: localStorage.getItem("refresh"),
    };
    const response = await axios
      .post(`http://localhost:8000/auth/jwt/refresh/`, body, config)
      .then((response) => {
        store.dispatch(tokensRefreshed(response.data));
      })
      .then(() => {
        checkUserAuthentication();
      })
      .catch(() => {
        store.dispatch(authenticationFailed());
      });

    return response;
  } else {
    store.dispatch(authenticationFailed());
  }
};

export const checkUserAuthentication = async () => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const body = {
      token: localStorage.getItem("access"),
    };
    const response = await axios
      .post(`http://localhost:8000/auth/jwt/verify/`, body, config)
      .then((response) => {
        if (response.data.code !== "token_not_valid") {
          store.dispatch(authenticationSucceed());
        } else {
          refreshTokens();
        }
      })
      .catch(() => {
        refreshTokens();
      });

    return response;
  } else {
    store.dispatch(authenticationFailed());
  }
};

export const resetPassword = async (email) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = {
    email: email,
  };
  const response = await axios
    .post(`http://localhost:8000/auth/users/reset_password/`, body, config)
    .then(() => {
      store.dispatch(passwordResetSucceed());
    })
    .catch((error) => {
      store.dispatch(passwordResetFailed(error.response.data));
    });
  return response;
};

export const resetPasswordConfirm = async (
  uid,
  token,
  new_password,
  re_new_password
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = {
    uid: uid,
    token: token,
    new_password: new_password,
    re_new_password: re_new_password,
  };
  const response = await axios
    .post(
      `http://localhost:8000/auth/users/reset_password_confirm/`,
      body,
      config
    )
    .then(() => {
      store.dispatch(passwordResetConfirmSucceed());
    })
    .catch((error) => {
      store.dispatch(passwordResetConfirmFailed(error.response.data));
    });
  return response;
};

export const signUp = async (
  first_name,
  last_name,
  username,
  email,
  password,
  re_password
) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const body = {
    first_name: first_name,
    last_name: last_name,
    username: username,
    email: email,
    password: password,
    re_password: re_password,
  };

  const response = await axios
    .post(`http://localhost:8000/auth/users/`, body, config)
    .then((response) => {
      store.dispatch(signUpSucceed(response.data));
    })
    .catch((error) => {
      store.dispatch(signUpFailed(error.response.data));
    });
  return response;
};

export const verifyAccount = async (uid, token) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const body = {
    uid: uid,
    token: token,
  };

  const response = await axios
    .post(`http://localhost:8000/auth/users/activation/`, body, config)
    .then(() => {
      store.dispatch(activationSucceed());
    })
    .catch((error) => {
      store.dispatch(activationFailed());
    });
  return response;
};
