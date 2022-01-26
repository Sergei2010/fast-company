import React from "react"
import PropTypes from "prop-types"
export let OptionsArray = []

const SelectField = ({
    label,
    value,
    name,
    onChange,
    defaultOption,
    options,
    error,
}) => {
    const handleChange = ({ target }) => {
        // console.log("target--handleChange: ", target)
        onChange({ name: target.name, value: target.value })
    }
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "")
    }
    OptionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                name: options[optionName].name,
                value: options[optionName]._id,
            }))
            : options
    return (
        <div className="mb-4">
            <label htmlFor="validationCustom05" className="form-label">
                { label }
            </label>
            <select
                className={ getInputClasses() }
                id="validationCustom05"
                name={ name }
                value={ value }
                onChange={ handleChange }
            >
                <option value="">{ defaultOption }</option>
                { OptionsArray &&
                    OptionsArray.map((option) => (
                        <option value={ option.value } key={ option.value }>
                            { option.label }
                        </option>
                    )) }
            </select>
            { error && <div className="invalid-feedback">{ error }</div> }
        </div>
    )
}

SelectField.propTypes = {
    label: PropTypes.string,
    defaultOption: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default SelectField
