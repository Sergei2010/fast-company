import React, { useState, useEffect } from "react"
import TextField from "../common/form/textField"
import { validator } from "../../utils/validator"
import CheckBoxField from "../common/form/checkBoxField"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getAuthErrors, login } from "../../store/users"

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false,
    })
    const loginError = useSelector(getAuthErrors())
    const history = useHistory()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }))
    }
    const validateConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения",
            },
        },
        password: {
            isRequired: {
                message: "Необходимо ввести пароль",
            },
        },
    }
    useEffect(() => {
        validate()
    }, [data])
    const validate = () => {
        const errors = validator(data, validateConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0
    const handleSubmit = (e) => {
        e.preventDefault()
        const isValidate = validate()
        if (!isValidate) return
        const redirect = history.location.state ? history.location.state.from.pathname : "/"
        dispatch(login({ payload: data, redirect }))
    }
    return (
        <form onSubmit={ handleSubmit }>
            <TextField
                label="Электронная почта"
                name="email"
                value={ data.email }
                onChange={ handleChange }
                error={ errors.email }
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={ data.password }
                onChange={ handleChange }
                error={ errors.password }
            />
            <CheckBoxField
                value={ data.stayOn }
                onChange={ handleChange }
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            { loginError && <p className="text-danger">{ loginError }</p> }

            <button
                type="submit"
                disabled={ !isValid }
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    )
}

export default LoginForm
