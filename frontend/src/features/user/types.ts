export type Error = {
  username?: null | string;
  email?: null | string;
  password?: null | string;
  re_password?: null | string;
  new_password?: null | string;
  re_new_password?: null | string;
  detail?: null | string;
  non_field_errors?: null | string;
  token?: null | string;
  not_email?: null | string;
};

export type InitialState = {
  access: null | string;
  refresh: null | string;
  isAuthenticated: boolean;
  user: null | User;
  error: null | Error;
};

export type User = null | {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
};
