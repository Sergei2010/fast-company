import React from "react";
import PropTypes from "prop-types";

const Qualities = ({ qualities, badgeClasse }) => {
    return (
        <>
            {qualities.map((quality) => (
                <span className={badgeClasse + quality.color} key={quality._id}>
                    {quality.name}
                </span>
            ))}
        </>
    );
};

Qualities.propTypes = {
    qualities: PropTypes.array.isRequired,
    badgeClasse: PropTypes.string.isRequired
};

export default Qualities;
