import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField";
import { validator } from "../../../utils/validator";
import SelectField, { OptionsArray } from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import api from "../../../api";
import PropTypes from "prop-types";

const UserPageEdit = ({ userId }) => {
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "",
        qualities: []
    });
    const [qualities, setQualities] = useState({});
    const [professions, setProfessions] = useState({});
    const [errors, setErrors] = useState({});
    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setData({
                name: data.name,
                email: (data.email = ""),
                profession: {
                    name: data.profession.name,
                    _id: data.profession._id
                },
                qualities: data.qualities.map((quality) => ({
                    label: quality.name,
                    value: quality._id
                })),
                sex: "male"
            });
        });
        api.professions.fetchAll().then((data) => {
            setProfessions(data);
        });
        api.qualities.fetchAll().then((data) => {
            setQualities(data);
        });
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValidate = validate();
        if (!isValidate) return;
        api.users.update(userId, data);
        location.href = `/users/${userId}`;
    };
    const handleChange = (target) => {
        let professionsArray;
        let professionObj;
        if (target.name !== "profession") {
            setData((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }));
        }
        if (target.name === "profession") {
            professionsArray = OptionsArray.map((item) => ({
                name: item.name,
                _id: item.value
            }));
            professionObj = professionsArray.filter((item) => {
                return item._id === target.value;
            })[0];
            setData((prevState) => ({
                ...prevState,
                profession: professionObj
            }));
        }
    };
    const validateConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Электронный адрес введён некорректно"
            }
        }
        /* profession: {
            isRequired: {
                message: "Обязательно выберите Вашу профессию"
            }
        } */
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validateConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    if (data && qualities && professions) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 ofset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Введите Вашу электронную почту"
                                placeholder="email..."
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                onChange={handleChange}
                                defaultOption={data.profession.name}
                                options={professions}
                                value={data.profession.value}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите Ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualities}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите Ваши качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    return "Loading ...";
};

UserPageEdit.propTypes = {
    userId: PropTypes.string
};

export default UserPageEdit;
