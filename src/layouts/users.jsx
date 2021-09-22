import React from "react";
import PropTypes from "prop-types";
import UserPage from "../components/userPage";
import UsersComponent from "../components/users";

const Users = ({ match }) => {
    const userId = match.params.userId;
    return (
        /* eslint-disable */
        <>{userId ? <UserPage userId={userId} /> : <UsersComponent />}</>
    );
};

Users.propTypes = {
    match: PropTypes.object.isRequired
};

export default Users;
