import React, { useEffect, useState } from "react";
import { validator } from "../utils/validator";
import TextField from "./form/textField";
import CheckBoxField from "./form/checkBoxField";
import { useAuth } from "../hooks/useAuth";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const { logIn } = useAuth();
    const history = useHistory();
    const [enterError, setEnterError] = useState(null);
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        setEnterError(null);
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
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
            await logIn(data);
            history.push(
                history.location.state
                    ? history.location.state.from.pathname
                    : "/"
            );
        } catch (error) {
            setEnterError(error.message);
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
                label="Пароль"
                type="password"
                name="password"
                value={ data.password }
                onChange={ handleChange }
                error = {errors.password}
            />
            <CheckBoxField
                value={ data.stayOn }
                onChange={ handleChange }
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            {/* {loginError && <p className="text-danger">{loginError}</p>} */}
            {enterError && <p className="text-danger">{enterError}</p>}
            <button
                type="submit"
                className="btn btn-light w-100 mx-auto"
                disabled={!isValid || enterError}
            >
                        Submit
            </button>
        </form>
    );
};

export default LoginForm;
