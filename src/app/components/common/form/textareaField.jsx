import React from "react"
import PropTypes from "prop-types"

const TextareaField = ({
	label,
	name,
	value,
	onChange,
	onClick,
	error,
	placeholder,
}) => {
	const handleChange = ({ target }) => {
		onChange({ name: target.name, value: target.value })
	}
	const getInputClasses = () => {
		return "form-control " + (error ? "is-invalid" : "")
	}
	return (
		<div className="mb-4">
			<label htmlFor={ name } className="form-label">{ label }</label>
			<div className="input-group has-validation">
				<textarea
					placeholder={ placeholder }
					type="text"
					id={ name }
					name={ name }
					value={ value }
					onChange={ handleChange }
					className={ getInputClasses() }
					onClick={ onClick }
				/>
				{ error && <div className="invalid-feedback">{ error }</div> }
			</div>
		</div>
	)
}

TextareaField.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	onClick: PropTypes.func,
	error: PropTypes.string,
	placeholder: PropTypes.string,
}

export default TextareaField
