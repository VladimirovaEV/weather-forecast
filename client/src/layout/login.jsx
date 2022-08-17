import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/loginForm";
import RegisterForm from "../components/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(type === "register" ? type : "login");
    const toggleFormType = () => {
        setFormType(prevState =>
            prevState === "register" ? "login" : "register");
    };
    return (<div className="container mt-5">
        <div className="row">
            <div className="col-md-6 offset-md-3 shadow p-4 bg-primary">
                {formType === "register" ? (
                    <>
                        <h3 className="mb-4">Регистрация</h3>
                        <RegisterForm />
                        <p>
                            Регистрировались ранее?
                            <a role="button" onClick={toggleFormType}> Вход
                            </a>
                        </p>
                    </>
                ) : (
                    <>
                        <h3 className="mb-4">Вход</h3>
                        <LoginForm />
                        <p>
                            Вы здесь впервые?
                            <a role="button" onClick={toggleFormType}> Регистрация
                            </a>
                        </p>
                    </>
                )}
            </div>
        </div>
    </div>
    );
};

export default Login;
