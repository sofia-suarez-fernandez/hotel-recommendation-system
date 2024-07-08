import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyAccount } from "../../../../services/authentication";

export const useActivateButtonViewModel = () => {
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const routeParams = useParams();

  const uid = routeParams.uid;
  const token = routeParams.token;

  const onVerifyAccount = useCallback(
    (e) => {
      verifyAccount(uid, token);
      setIsVerified(true);
    },
    [token, uid]
  );

  useEffect(() => {
    if (isVerified) {
      navigate("/sign_in");
    }
  }, [isVerified, navigate]);

  return { onVerifyAccount };
};
