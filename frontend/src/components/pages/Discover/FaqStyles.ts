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
        color: theme.palette.text.primary,
    },
    pregunta: {
        color: theme.palette.text.primary,
        fontWeight: "bold",
        marginBottom: "5px",
    },
    respuesta: {
        color: theme.palette.text.primary,
        marginBottom: "15px",
    },
    separador: {
        border: "1px solid #ddd",
        margin: "10px 0",
    },
}));
