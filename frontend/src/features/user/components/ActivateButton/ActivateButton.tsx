import { Button } from "@mui/material";
import { useActivateButtonViewModel } from "./ActivateButtonViewModel";

export const ActivateButton = (): JSX.Element => {
  const { onVerifyAccount } = useActivateButtonViewModel();

  return (
    <Button onClick={onVerifyAccount} variant="contained" color="secondary">
      Verify account
    </Button>
  );
};
