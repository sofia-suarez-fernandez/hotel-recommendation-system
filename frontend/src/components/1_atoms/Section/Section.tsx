import { Box, Breakpoint, Container } from "@mui/material";
import { SectionProps } from "./SectionInterfaces";
import { useSectionStyles } from "./SectionStyles";

export const Section = ({
  children,
  paddingTop,
  paddingBottom,
  marginBottom,
  isHeroSection,
}: SectionProps): JSX.Element => {
  const { classes } = useSectionStyles({
    paddingTop,
    paddingBottom,
    marginBottom,
    isHeroSection,
  });

  return isHeroSection ? (
    <Box className={classes.background}>
      <Container maxWidth={"md" as Breakpoint} className={classes.wrapper}>
        {children}
      </Container>
    </Box>
  ) : (
    <Container maxWidth={"md" as Breakpoint} className={classes.wrapper}>
      {children}
    </Container>
  );
};
