import { createContext, useState, useContext, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { USER_SIGNIN, USER_SIGNUP } from "../graphql/mutations";
import { message } from "antd";

const UserContext = createContext({
    username: "",
    email: "",
    token: "",
    LoginSuccess: false,
    RegisterSuccess: false,
    handleLogin: () => {},
    handleSignup: () => {},
});

const useUser = () => useContext(UserContext);

const UserProvider = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [LoginSuccess, setLoginSuccess] = useState(false);
    const [RegisterSuccess, setRegisterSuccess] = useState(false);

    const [Passin] = useMutation(USER_SIGNIN);
    const [Registerin] = useMutation(USER_SIGNUP);

    const handleLogin = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (!data.get("email")) {
            message.error("Please fill the email field");
            return;
        }
        if (!data.get("password")) {
            message.error("Please fill the password field");
            return;
        }

        const emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
        if (!emailRule.test(data.get("email"))) {
            message.error("Please enter a valid email address");
            return;
        }
        
        try {
            let user = await Passin({
                variables: {
                    email: data.get("email"),
                    password: data.get("password"),
                },
            });
            setUsername(user.data.signIn.username);
            setEmail(user.data.signIn.email);
            setToken(user.data.signIn.token);
            message.success("Login success");
            setLoginSuccess(true);
        } catch (e) {
            console.log(e);
            // message.error("Login error, please try again");
            message.error(e.message);
        }
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (!data.get("username")) {
            message.error("Please fill the username field");
            return;
        }
        if (!data.get("email")) {
            message.error("Please fill the email field");
            return;
        }
        if (!data.get("password")) {
            message.error("Please fill the password field");
            return;
        }

        const emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
        if (!emailRule.test(data.get("email"))) {
            message.error("Please enter a valid email address");
            return;
        }

        try {
            let user = await Registerin({
                variables: {
                    username: data.get("username"),
                    email: data.get("email"),
                    password: data.get("password"),
                },
            });
            setUsername(user.data.signUp.username);
            setEmail(user.data.signUp.email);
            setToken(user.data.signUp.token);
            message.success("Register success");
            setRegisterSuccess(true);
        } catch (e) {
            console.log(e);
            // e from apollo server
            message.error(e.message);
            // message.error("Register error, please try again");
        }
    };

    return (
        <UserContext.Provider
            value={{
                username,
                email,
                token,
                handleLogin,
                handleSignup,
                LoginSuccess,
                RegisterSuccess,
            }}
            {...props}
        />
    );
};

export { UserProvider, useUser };
