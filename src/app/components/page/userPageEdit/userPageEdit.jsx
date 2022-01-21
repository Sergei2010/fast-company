import React, { useState, useEffect } from "react"
import TextField from "../../common/form/textField"
import { validator } from "../../../utils/validator"
import SelectField, { OptionsArray } from "../../common/form/selectField"
import RadioField from "../../common/form/radioField"
import MultiSelectField from "../../common/form/multiSelectField"
import api from "../../../api"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const UserPageEdit = ({ userId }) => {
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "",
        qualities: [],
    })
    const [dataForUpdate, setDataForUpdate] = useState({})
    const [qualities, setQualities] = useState({})
    const [professions, setProfessions] = useState({})
    const [errors, setErrors] = useState({})
    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setData({
                name: data.name,
                email: data.email,
                profession: {
                    name: data.profession.name,
                    _id: data.profession._id,
                },
                qualities: data.qualities.map((quality) => ({
                    label: quality.name,
                    value: quality._id,
                    color: quality.color,
                })),
                sex: "male",
            })
            setDataForUpdate(data)
            api.professions.fetchAll().then((data) => {
                setProfessions(data)
            })
            api.qualities.fetchAll().then((data) => {
                setQualities(data)
            })
        })
    }, [])
    const handleSubmit = () => {
        const isValidate = validate()
        if (!isValidate) return
        api.users.update(userId, dataForUpdate)
    }
    const handleChange = (target) => {
        let professionsArray
        let professionObj
        if (target.name === "profession") {
            professionsArray = OptionsArray.map((item) => ({
                name: item.name,
                _id: item.value,
            }))
            professionObj = professionsArray.filter((item) => {
                return item._id === target.value
            })[0]
            setData((prevState) => ({
                ...prevState,
                profession: professionObj,
            }))
        } else {
            setData((prevState) => ({
                ...prevState,
                [target.name]: target.value,
            }))
        }
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
    }
    useEffect(() => {
        validate()
        setDataForUpdate({
            ...data,
            qualities: data.qualities.map((quality) => ({
                name: quality.label,
                _id: quality.value,
                color: quality.color,
            })),
        })
    }, [data])
    const validate = () => {
        const errors = validator(data, validateConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0
    if (data && qualities && professions) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card mb-3 h-50 border-white">
                            <div className="card-body">
                                <Link to={ `/users/${userId}` }
                                    className="
                                    position-absolute
                                    top-50
                                    start-50
                                    btn btn btn-primary btn-lg
                                    aria-pressed='true'
                                "
                                >
                                    <i className="bi bi-caret-left"></i>
                                    <span className="align--middle p-2">
                                        Назад
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card mb-2 p-4">
                            <div className="card-body p-4">
                                <div className="shadow p-4">
                                    <form onSubmit={ handleSubmit }>
                                        <TextField
                                            label="Имя"
                                            name="name"
                                            value={ data.name || "" }
                                            onChange={ handleChange }
                                            error={ errors.name }
                                        />
                                        <TextField
                                            label="Введите Вашу электронную почту"
                                            placeholder={
                                                data.email
                                                    ? data.email
                                                    : "email..."
                                            }
                                            name="email"
                                            value={ data.email || "" }
                                            onChange={ handleChange }
                                            error={ errors.email }
                                        />
                                        <SelectField
                                            label="Выбери свою профессию"
                                            name="professions"
                                            onChange={ handleChange }
                                            defaultOption={ data.profession.name }
                                            options={ professions }
                                            value={ data.profession.value || "" }
                                            error={ errors.profession }
                                        />
                                        <RadioField
                                            options={ [
                                                {
                                                    name: "Male",
                                                    value: "male",
                                                },
                                                {
                                                    name: "Female",
                                                    value: "female",
                                                },
                                                {
                                                    name: "Other",
                                                    value: "other",
                                                },
                                            ] }
                                            value={ data.sex || "" }
                                            name="sex"
                                            onChange={ handleChange }
                                            label="Выберите Ваш пол"
                                        />
                                        <MultiSelectField
                                            defaultValue={ data.qualities }
                                            options={ qualities }
                                            onChange={ handleChange }
                                            name="qualities"
                                            label="Выберите Ваши качества"
                                        />
                                        <Link
                                            to={ `/users/${userId}` }
                                            type="submit"
                                            onClick={ () => {
                                                handleSubmit()
                                            } }
                                            disabled={ !isValid }
                                            className="btn btn-primary w-100 mx-auto"
                                        >
                                            Обновить
                                        </Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return "Loading ..."
}

UserPageEdit.propTypes = {
    userId: PropTypes.string,
}

export default UserPageEdit
