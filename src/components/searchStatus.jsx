import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({
    titleClasse,
    users,
    onRenderColor,
    onRenderPhrase
}) => {
    return (
        <h1>
            <span className={titleClasse + onRenderColor(users.length)}>
                {onRenderPhrase(users.length)} с тобой сегодня
            </span>
        </h1>
    );
};

SearchStatus.propTypes = {
    titleClasse: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired,
    onRenderColor: PropTypes.func.isRequired,
    onRenderPhrase: PropTypes.func.isRequired
};

export default SearchStatus;
