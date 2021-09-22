import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../API";
import QualitiesList from "./qualitiesList";

const UserPage = (userId) => {
    const idChecked = userId.userId;
    const [user, setUser] = useState();
    const [delay, setDelay] = useState(false);
    useEffect(() => {
        try {
            api.users.getById(idChecked).then((data) => {
                setUser(data);
            });
        } catch (e) {
            console.error(e.message);
        }
    }, []);
    setTimeout(() => {
        setDelay(true);
    }, 2000);
    return (
        /* eslint-disable */
        <div className="d-flex">
            {user ? (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <h1>{user.name}</h1>
                    <h2>Профессия: {user.profession.name}</h2>
                    <span>
                        <QualitiesList qualities={user.qualities} />
                    </span>
                    <h3>completedMeetings: {user.completedMeetings}</h3>
                    <h3>rate: {user.rate}</h3>
                    <Link to="/users">
                        <button className="btn btn-secondary mt-2">
                            Все пользователи
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    {delay ? (
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
