import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { signUp } from "../../../../services/authentication";

export const useSignUpFormViewModel = () => {
  const initialFormData = Object.freeze({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    re_password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const error = useSelector((state: RootState) => state.user.error);

  const onChange = useCallback(
    (e) => {
      updateFormData({
        ...formData,
        [e.target.name]: e.target.value.trim(),
      });
    },
    [formData]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      signUp(
        formData.first_name,
        formData.last_name,
        formData.username,
        formData.email,
        formData.password,
        formData.re_password
      );
    },
    [formData]
  );

  useEffect(() => {
    if (
      error?.username === null &&
      error?.email === null &&
      error?.password === null &&
      error?.re_password === null &&
      error?.non_field_errors === null
    ) {
      setIsAccountCreated(true);
    }
  }, [error]);

  return { onChange, onSubmit, isAccountCreated };
};
