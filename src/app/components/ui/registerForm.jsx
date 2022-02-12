import React, { useState, useEffect } from "react"
import TextField from "../common/form/textField"
import { validator } from "../../utils/validator"
import SelectField from "../common/form/selectField"
import RadioField from "../common/form/radioField"
import MultiSelectField from "../common/form/multiSelectField"
import CheckBoxField from "../common/form/checkBoxField"
import { useSelector, useDispatch } from "react-redux"
import { getQualities } from "../../store/qualities"
import { getProfessions } from "../../store/professions"
import { signUp } from "../../store/users"

const RegisterForm = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        name: "",
        sex: "male",
        qualities: [],
        licence: false,
    })

    const qualities = useSelector(getQualities())
    const qualitiesList = qualities.map(q => ({ label: q.name, value: q._id }))
    const professions = useSelector(getProfessions())
    const professionsList = professions.map(p => ({ label: p.name, value: p._id }))
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
            isEmail: {
                message: "Электронный адрес введён некорректно",
            },
        },
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения",
            },
            min: {
                message: "Имя должено состоять минимум из 3 символов",
                value: 3,
            },
        },
        password: {
            isRequired: {
                message: "Необходимо ввести пароль",
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву",
            },
            isContainDigital: {
                message: "Пароль должен содержать хотя бы одно число",
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8,
            },
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите Вашу профессию",
            },
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения",
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
    const handleSubmit = async (e) => {
        e.preventDefault()
        const isValidate = validate()
        if (!isValidate) return
        const newData = { ...data, qualities: data.qualities.map(q => q.value) }
        dispatch(signUp(newData))
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
                label="Имя"
                name="name"
                value={ data.name }
                onChange={ handleChange }
                error={ errors.name }
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={ data.password }
                onChange={ handleChange }
                error={ errors.password }
            />
            <SelectField
                label="Выбери свою профессию"
                onChange={ handleChange }
                name="profession"
                options={ professionsList }
                defaultOption="Choose ..."
                error={ errors.profession }
            />
            <RadioField
                options={ [
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" },
                ] }
                value={ data.sex }
                name="sex"
                onChange={ handleChange }
                label="Выберите Ваш пол"
            />
            <MultiSelectField
                key={ qualities.value }
                defaultValue={ data.qualities }
                options={ qualitiesList }
                onChange={ handleChange }
                name="qualities"
                label="Выберите Ваши качества"
            />
            <CheckBoxField
                value={ data.licence }
                onChange={ handleChange }
                name="licence"
                error={ errors.licence }
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>
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

export default RegisterForm
