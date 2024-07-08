import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../app/store";
import { signIn } from "../../../../services/authentication";

export const useSignInFormViewModel = () => {
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const isUserLoaded = user === null ? false : true;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signIn(formData.email, formData.password);
  };

  useEffect(() => {
    if (isUserLoaded) {
      navigate("/");
    }
  }, [isUserLoaded, navigate]);

  return { onChange, onSubmit };
};
