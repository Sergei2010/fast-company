import React from "react"
import PropTypes from "prop-types"

const ImageField = ({ id, src, className, name, width, alt, onClick }) => {
    return (
        <div className="mb-4">
            <img
                id={name}
                src={src}
                className={className}
                width={width}
                alt={alt}
                name={name}
                onClick={onClick}
            />
        </div>
    )
}

ImageField.propTypes = {
    id: PropTypes.string,
    src: PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.string,
    alt: PropTypes.string,
    name: PropTypes.string,
    onClick: PropTypes.func,
}

export default ImageField
