import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
// import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService, { setTokens } from "../services/localStorage.service";
import { useHistory } from "react-router-dom";
import config from "../utils/config.json";

export const httpAuth = axios.create({
    baseURL: config.apiEndpoint + "/auth/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState(localStorageService.getUserId());
    const [error, setError] = useState(null);
    const [isLoading] = useState(false);
    const history = useHistory();
    async function logIn({ email, password }) {
        try {
            const { data } = await httpAuth.post(`signInWithPassword`, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            // await getUserData();
            setUser(data.userId);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                switch (message) {
                case "INVALID_PASSWORD":
                    throw new Error("Email или пароль введены некорректно");
                default:
                    throw new Error(
                        "Слишком много попыток входа.Попробуйте позже"
                    );
                }
            }
        }
    };
    function logOut() {
        localStorageService.removeAuthData();
        setUser(null);
        history.push("/");
    };
    async function signUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post(`signUp`, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            setUser(data.userId);
            // await createUser({
            //     _id: data.localId,
            //     email,
            //     favorite: [],
            //     ...rest
            // });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким Email уже существует"
                    };
                    throw errorObject;
                }
            }
        }
    }
    // async function createUser(data) {
    //     try {
    //         const { content } = await userService.create(data);
    //         console.log(content);
    //         setUser(content);
    //     } catch (error) {
    //         errorCatcher(error);
    //     }
    // }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    };
    // async function getUserData() {
    //     try {
    //         const { content } = await userService.getCurrentUser();
    //         setUser(content);
    //     } catch (error) {
    //         errorCatcher(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }
    // useEffect(() => {
    //     if (localStorageService.getAccessToken()) {
    //         getUserData();
    //     } else {
    //         setLoading(false);
    //     }
    // }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    return (
        <AuthContext.Provider value = {{ signUp, currentUser, logIn, logOut }}>
            { !isLoading ? children : "Loading..." }
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
