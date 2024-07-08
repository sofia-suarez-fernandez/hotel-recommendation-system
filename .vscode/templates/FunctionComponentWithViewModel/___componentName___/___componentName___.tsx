import { Box, Typography } from "@mui/material";
import { ___ComponentName___Props } from "./___componentName___Interfaces";
import { use___ComponentName___Styles } from "./___componentName___Styles";
import { use___ComponentName___ViewModel } from "./___componentName___ViewModel";

export const ___Component_Name___ = (
  props: ___ComponentName___Props
): JSX.Element => {
  const viewModel = use___ComponentName___ViewModel(props);
  const { classes } = use___ComponentName___Styles();

  return (
    <Box className={classes.wrapper}>
      <Typography variant="h2">___ComponentName___</Typography>
    </Box>
  );
};
