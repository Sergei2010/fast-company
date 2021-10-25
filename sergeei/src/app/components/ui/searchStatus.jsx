import React from "react";
import PropTypes from "prop-types";
import {
    Title_Classe,
    handleRenderColor,
    handleRenderPhrase
} from "../../utils/functions";

const SearchStatus = ({ length, ...rest }) => {
    return (
        <>
            <h1>
                <span className={Title_Classe + handleRenderColor(length)}>
                    {handleRenderPhrase(length)} с тобой сегодня
                </span>
            </h1>
        </>
    );
};

SearchStatus.propTypes = {
    titleClasse: PropTypes.string,
    length: PropTypes.number,
    onRenderColor: PropTypes.func,
    onRenderPhrase: PropTypes.func
};

export default SearchStatus;
