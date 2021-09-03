import React from "react";
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

export default BookMark;
