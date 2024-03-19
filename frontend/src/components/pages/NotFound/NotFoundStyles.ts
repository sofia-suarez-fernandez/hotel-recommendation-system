// // import { makeStyles } from "tss-react/mui";

// // export const useNotFoundStyles = makeStyles()((theme) => ({
// //   title: {
// //     textAlign: "center",
// //     fontSize: `${theme.spacing(7)} !important`,
// //     margin: 0,
// //   },
// //   paragraph: {
// //     textAlign: "center",
// //   },
// // }));
// import { makeStyles } from "tss-react/mui";

// export const useNotFoundStyles = makeStyles()((theme) => ({
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     textAlign: "center", // Center all text within the container
//     padding: theme.spacing(8), // Add some padding for better spacing
//   },
//   title: {
//     textAlign: "center",
//     fontSize: `${theme.spacing(7)} !important`,
//     margin: 0,
//     color: theme.palette.primary.main, // Use primary color for emphasis
//   },
//   message: {
//     marginBottom: theme.spacing(4), // Add some space between title and message
//     fontSize: theme.typography.h6.fontSize, // Set a specific font size
//   },
//   imageContainer: {
//     marginTop: theme.spacing(4), // Add space between message and image
//   },
// }));
import { makeStyles } from "tss-react/mui";

export const useNotFoundStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "100vh",
    maxWidth: "660px", // Limit container width to prevent excessive stretching
    margin: "0 auto", // Center container horizontally on the page
    gap: theme.spacing(1), // Introduce a small gap between image and text content
  },
  textContainer: {
    textAlign: "left", // Center text content
  },
  title: {
    fontSize: `${theme.spacing(7)} !important`,
    margin: 0,
    color: theme.palette.secondary.main, // Use primary color for emphasis
  },
  message: {
    marginBottom: theme.spacing(2), // Reduce space between elements
    fontSize: theme.typography.h6.fontSize, // Set a specific font size
    color: theme.palette.secondary.main,
    fontWeight: "bold",
  },
  button: {
    color: theme.palette.text.primary,
  }
}));

