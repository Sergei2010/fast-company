import React from "react";
import PropTypes from "prop-types";
import UserPage from "../components/page/userPage";
import UserPageEdit from "../components/page/userPageEdit";
import UsersListPage from "../components/page/usersListPage";

const Users = ({ match }) => {
    const userId = match.params.userId;
    const edit = match.params.edit;
    return (
        /* eslint-disable */
        <>
            {userId ? (
                edit ? (
                    <UserPageEdit edit={edit} userId={userId} />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

Users.propTypes = {
    match: PropTypes.object.isRequired
};

export default Users;
