import React from "react";
import PropTypes from "prop-types";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";

const Users = ({ match }) => {
    const userId = match.params.userId;
    return (
        /* eslint-disable */
        <>{userId ? <UserPage userId={userId} /> : <UsersListPage />}</>
    );
};

Users.propTypes = {
    match: PropTypes.object.isRequired
};

export default Users;
