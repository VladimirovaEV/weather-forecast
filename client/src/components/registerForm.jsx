import React, { useState, useEffect } from "react";
import TextField from "../components/form/textField";
import { validator } from "../utils/validator";
import { useAuth } from "../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        name: "",
        password: ""
    });
    const { signUp } = useAuth();

    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Имя должно состоять минимум из 3 символов",
                value: 3
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            await signUp(data);
            history.push("/");
        } catch (error) {
            setErrors(error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={ data.email }
                onChange={ handleChange }
                error = {errors.email}
            />
            <TextField
                label="Имя"
                name="name"
                value={ data.name }
                onChange={ handleChange }
                error = {errors.name}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={ data.password }
                onChange={ handleChange }
                error = {errors.password}
            />
            <button type="submit"
                className="btn btn-light w-100 mx-auto"
                disabled={!isValid}
            >
                        Submit
            </button>
        </form>
    );
};

export default RegisterForm;
