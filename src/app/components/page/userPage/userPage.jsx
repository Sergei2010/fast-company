import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../api";
import Qualities from "../../ui/qualities/qualitiesList";

const UserPage = (userId) => {
    const idChecked = userId.userId;
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let cleanupFunction = false;
        try {
            api.users.getById(idChecked).then((data) => {
                if (!cleanupFunction) setUser(data);
            });
        } catch (e) {
            console.error(e.message);
        }
        return () => (cleanupFunction = true);
    }, []);
    setTimeout(() => {
        setLoading(false);
    }, 2000);
    return (
        /* eslint-disable */
        <div className="d-flex">
            {user ? (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <h1>{user.name}</h1>
                    <h3>
                        Электронная почта:{" "}
                        {user.email ? user.email : "Нет данных"}
                    </h3>
                    <h3>Профессия: {user.profession.name}</h3>
                    <h3>Sex: {user.sex ? user.sex : "Нет данных"}</h3>
                    <span>
                        <Qualities qualities={user.qualities} />
                    </span>
                    <h3>completedMeetings: {user.completedMeetings}</h3>
                    <h3>rate: {user.rate}</h3>
                    <Link
                        to={`/users/${user._id}/edit`}
                        className="btn btn-secondary mt-2"
                        disabled={loading}
                    >
                        Редактировать
                    </Link>
                </div>
            ) : (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    {!loading ? (
                        <h2>{`User with id: ${idChecked} not found`}</h2>
                    ) : (
                        <p>Loading ...</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserPage;
