import {
  Breakpoint,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

const darkGrey = "#353535";
const white = "#FFFFFF";
const red = "#d32f2f";
const darkRed = "#5f2120";

// new
const pink = "#F770A8";
const lightPink = "#EDB3E1";
const darkPink = "#B55F96";
const purple = "#9650B9";
const darkPurple = "#35215E";

const theme = createTheme({
  palette: {
    primary: {
      main: pink,
      dark: darkPink,
    },
    secondary: {
      main: purple,
      dark: darkPurple,
      light: lightPink,
    },
    grey: {
      900: darkGrey,
    },
    text: {
      primary: darkPurple,
      secondary: white,
    },
    background: {
      default: white,
      paper: white,
    },
    error: {
      main: red,
      dark: darkRed,
    },
  },
  typography: {
    // fontFamily: "Helvetica, Franklin Gothic Medium, Arial, sans-serif",
    fontFamily: "Poppins, sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 500,
    fontWeightBold: 700,
    allVariants: {
      letterSpacing: 0,
      textAlign: "left",
      fontWeight: 500,
    },
    h1: {
      fontSize: "2.2rem",
    },
    h2: {
      fontSize: "1.5rem",
    },
    h3: {
      fontSize: "1.3rem",
    },
    h4: {
      fontSize: "1.2rem",
    },
    h5: {
      fontSize: "1.1rem",
    },
    h6: {
      fontSize: "1rem",
    },
    body1: {
      fontSize: "0.9rem",
    },
    body2: {
      fontSize: "0.9rem",
    },
    button: {
      fontSize: "0.9rem",
      textTransform: "none",
    },
    subtitle1: {
      fontSize: "0.8rem",
      lineHeight: 1.5,
    },
  },
  spacing: (factor: number) => `${1 * factor}rem`,
});

const themeWithOverrides = {
  ...theme,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          color: theme.palette.primary.dark,
          textDecoration: "none",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontWeight: theme.typography.fontWeightBold,
          marginBottom: theme.spacing(2),
        },
        h2: {
          fontWeight: theme.typography.fontWeightBold,
          marginBottom: theme.spacing(1),
        },
        h3: {
          fontWeight: theme.typography.fontWeightBold,
          marginBottom: theme.spacing(0.5),
        },
        h4: {
          fontWeight: theme.typography.fontWeightBold,
        },
        h5: {
          fontWeight: theme.typography.fontWeightBold,
        },
        h6: {
          fontWeight: theme.typography.fontWeightBold,
        },
        body1: {
          fontWeight: theme.typography.fontWeightRegular,
        },
        body2: {
          fontWeight: theme.typography.fontWeightLight,
        },
        subtitle1: {
          fontWeight: theme.typography.fontWeightLight,
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg" as Breakpoint,
      },
    },
    MuiPaper: {
      defaultProps: {
        square: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: theme.spacing(0),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1.5),
          "&:last-child": {
            paddingBottom: theme.spacing(1.5),
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginTop: 0,
          marginBottom: theme.spacing(1),
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.grey[500],
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: `1px solid ${theme.palette.grey[300]}`,
          "&::before": {
            display: "none",
          },
        },
      },
    },
  },
};

const themeWithResponsiveFontSizes = responsiveFontSizes(themeWithOverrides, {
  factor: 3,
  breakpoints: ["xs", "sm", "md", "lg", "xl"],
});

export default themeWithResponsiveFontSizes;
