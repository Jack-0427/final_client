import { useState, useEffect } from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import png from "../data/Mainpage.png";
import { useQuery, useMutation } from "@apollo/client";
import { USER_SIGNIN, USER_SIGNUP } from "../graphql/mutations";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./Login";
import SignUp from "./Signup";
import { useUser } from "../hooks/useUser";
import { setIn } from "formik";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

export default function SignInSide() {
    const [rotate, setRotate] = useState(180);
    const { RegisterSuccess, handleLogin, handleSignup } = useUser();

    useEffect(() => {
        if (RegisterSuccess) setRotate(rotate + 180);
    }, [RegisterSuccess]);

    return (
        <ThemeProvider theme={theme}>
            <Grid
                container
                component="main"
                sx={{
                    height: "auto",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: rotate % 360 !== 0 ? "row" : "row-reverse",
                    // flexWrap: "nowrap",
                    backgroundImage: `url(${png})`,
                    backgroundRepeat: "no-repeat",
                    backgroundColor: (t) =>
                        t.palette.mode === "light"
                            ? t.palette.grey[50]
                            : t.palette.grey[900],
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <CssBaseline />
                <Grid item={true} xs={false} sm={4.5} md={4.5} />
                <Grid
                    item={true}
                    xs={12}
                    sm={3}
                    md={3}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <KeyboardDoubleArrowRightIcon
                        onClick={() => {
                            setRotate(rotate + 180);
                        }}
                        sx={{
                            width: "160px",
                            height: "160px",
                            transform: `rotate(${rotate}deg)`,
                            color:
                                rotate % 360 !== 0 ? "lightskyblue" : "yellow",
                        }}
                    />
                </Grid>
                <Grid
                    item={true}
                    xs={12}
                    sm={4.5}
                    md={4.5}
                    component={Paper}
                    height="auto"
                    elevation={6}
                    square
                >
                    {rotate % 360 !== 0 ? (
                        <Login
                            handleLogin={handleLogin}
                            Copyright={Copyright}
                        />
                    ) : (
                        <SignUp
                            handleSignup={handleSignup}
                            Copyright={Copyright}
                        />
                    )}
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
