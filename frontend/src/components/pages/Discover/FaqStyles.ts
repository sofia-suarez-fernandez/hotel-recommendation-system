import { makeStyles } from "tss-react/mui";

export const useFaqStyles = makeStyles()((theme) => ({
    faq: {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: theme.palette.secondary.dark,
        paddingTop: theme.spacing(6),
    },
    pregunta: {
        color: theme.palette.secondary.dark,
        fontWeight: "bold",
        marginBottom: "5px",
    },
    respuesta: {
        color: theme.palette.primary.main,
        marginBottom: "15px",
    },
    separador: {
        border: "1px solid #ddd",
        margin: "10px 0",
    },
}));
