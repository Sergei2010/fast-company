import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { localStorageId } from "../../../utils/constans";
import PropTypes from "prop-types";

const UserPageEdit = ({ userId }) => {
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [qualities] = useState({});
    const [professions] = useState();
    const [errors] = useState({});
    const [, setIsCreatedUser] = useState(false);
    useEffect(() => {
        const data = localStorage.getItem(localStorageId);
        if (data) {
            const dataEdit = JSON.parse(data).filter(
                (item) => item._id === userId
            );
            handleChangeData(dataEdit);
            setIsCreatedUser(true);
        }
    }, []);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleChangeData = (data) => setData(data);
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 ofset-md-3 shadow p-4">
                    <form>
                        {console.log("data: ", data)}
                        {console.log("userId: ", userId)}
                        <TextField
                            label="Имя"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <SelectField
                            label="Выбери свою профессию"
                            onChange={handleChange}
                            options={professions}
                            defaultOption="Choose ..."
                            error={errors.profession}
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
};

UserPageEdit.propTypes = {
    userId: PropTypes.string
};

export default UserPageEdit;
