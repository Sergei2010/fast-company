import React from "react"
import { Redirect } from "react-router-dom"
import PropTypes from "prop-types"
import UserPage from "../components/page/userPage"
import EditUserPage from "../components/page/editUserPage"
import UsersListPage from "../components/page/usersListPage"
import UserProvider from "../hooks/useUsers"
import { useAuth } from "../hooks/useAuth"

const Users = ({ match }) => {
    const userId = match.params.userId
    const edit = match.params.edit
    const { currentUser } = useAuth()
    return (
        /* eslint-disable */
        <>
            <UserProvider>
                { userId ? (
                    edit ? (userId === currentUser._id ? <EditUserPage /> : <Redirect to={ `/users/${currentUser._id / edit}` } />
                    ) : (
                        <UserPage userId={ userId } />
                    )
                ) : (
                    <UsersListPage />
                ) }
            </UserProvider>
        </>
    );
};

Users.propTypes = {
    match: PropTypes.object.isRequired
};

export default Users;
