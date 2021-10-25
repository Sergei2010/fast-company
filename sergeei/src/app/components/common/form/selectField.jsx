import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    value,
    onChange,
    defaultOption,
    options,
    error
}) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };
    const optionsArray =
        // eslint-disable-next-line multiline-ternary
        !Array.isArray(options) && typeof options === "object"
            // eslint-disable-next-line multiline-ternary
            ? Object.keys(options).map((optionName) => ({
                  name: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options;
    return (
        <div className="mb-4">
            <label htmlFor="validationCustom05" className="form-label">
                {label}
            </label>
            <select
                className={getInputClasses()}
                id="validationCustom05"
                name="profession"
                value={value}
                onChange={handleChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray &&
                    optionsArray.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.name}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectField.propTypes = {
    label: PropTypes.string,
    defaultOption: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default SelectField;
