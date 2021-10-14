import React from "react";
import TextField from "../components/textField";
import PropTypes from "prop-types";
import {
    Title_Classe,
    handleRenderColor,
    handleRenderPhrase
} from "../utils/functions";

const SearchStatus = ({
    length,
    onUserSearch,
    onClearFilter,
    value,
    placeholder,
    ...rest
}) => {
    return (
        <>
            <h1>
                <span className={Title_Classe + handleRenderColor(length)}>
                    {handleRenderPhrase(length)} с тобой сегодня
                </span>
            </h1>
            <TextField
                placeholder={placeholder}
                type="text"
                name="search"
                value={value}
                onChange={onUserSearch}
                onClick={onClearFilter}
            />
        </>
    );
};

SearchStatus.propTypes = {
    titleClasse: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    length: PropTypes.number,
    onRenderColor: PropTypes.func,
    onRenderPhrase: PropTypes.func,
    onUserSearch: PropTypes.func,
    onClearFilter: PropTypes.func
};

export default SearchStatus;
