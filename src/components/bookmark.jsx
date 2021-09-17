/* import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ onToggleBookMark, userId, status }) => {
    return (
        <button onClick={() => onToggleBookMark(userId)}>
            <i className={"bi bi-bookmark" + (status ? "-heart-fill" : "")}></i>
        </button>
    );
};

BookMark.propTypes = {
    onToggleBookMark: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    status: PropTypes.bool
};

export default BookMark; */

import React from "react";
import PropTypes from "prop-types";
const BookMark = ({ status, ...rest }) => {
    return (
        <button {...rest}>
            <i className={"bi bi-bookmark" + (status ? "-heart-fill" : "")}></i>
        </button>
    );
};
BookMark.propTypes = {
    status: PropTypes.bool
};

export default BookMark;
