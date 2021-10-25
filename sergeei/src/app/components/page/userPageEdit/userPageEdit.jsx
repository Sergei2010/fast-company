import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import api from "../../../api";
import PropTypes from "prop-types";

const UserPageEdit = ({ userId }) => {
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [qualities, setQualities] = useState({});
    const [professions, setProfessions] = useState();
    // const [errors, setErrors] = useState({});
    useEffect(() => {
        api.users.getById(userId).then((data) => {
            console.log("data--user: ", data);
            setData({
                name: data.name,
                email: data.email,
                profession: data.profession.name,
                qualities: data.qualities.map((quality) => ({
                    label: quality.name,
                    value: quality._id
                }))
            });
        });
        api.professions.fetchAll().then((data) => {
            console.log("data--professions: ", data);
            setProfessions(data);
        });
        api.qualities.fetchAll().then((data) => {
            console.log("data--qualities: ", data);
            setQualities(data);
        });
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        // const isValidate = validate();
        // if (!isValidate) return;
    };
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
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
                                // error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                // error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                onChange={handleChange}
                                options={professions}
                                defaultOption=""
                                // error={errors.profession}
                                value={data.profession}
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
                                // disabled={!isValid}
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

    return "LOADING";
};

UserPageEdit.propTypes = {
    userId: PropTypes.string,
    professions: PropTypes.object
};

export default UserPageEdit;
