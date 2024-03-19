import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../../app/store";
import { resetPasswordConfirm } from "../../../../services/authentication";

export const useResetPasswordConfirmFormViewModel = () => {
  const initialFormData = Object.freeze({
    new_password: "",
    re_new_password: "",
  });

  const [isRequestSent, setIsRequestSent] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  const routeParams = useParams();
  const error = useSelector((state: RootState) => state.user.error);

  const uid = routeParams.uid;
  const token = routeParams.token;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    resetPasswordConfirm(
      uid,
      token,
      formData.new_password,
      formData.re_new_password
    );
    setIsRequestSent(true);
  };

  useEffect(() => {
    if (
      isRequestSent &&
      error?.new_password === null &&
      error?.re_new_password === null &&
      error?.non_field_errors === null
    ) {
      navigate("/sign_in");
    }
  }, [error, isRequestSent, navigate]);

  return { onChange, onSubmit };
};
