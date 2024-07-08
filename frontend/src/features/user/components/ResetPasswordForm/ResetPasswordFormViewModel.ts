import { useState } from "react";
import { resetPassword } from "../../../../services/authentication";

export const useResetPasswordFormViewModel = () => {
  const initialFormData = Object.freeze({
    email: "",
  });

  const [isRequestSent, setIsRequestSent] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    resetPassword(formData.email);
    setIsRequestSent(true);
  };

  return { onChange, onSubmit, isRequestSent };
};
