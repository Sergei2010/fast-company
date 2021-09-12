import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./API/index";
import { Badge_Classe, Title_Classe } from "./utils/functions";

const App = () => {
    const [users, setUsers] = useState();
    useEffect(() => {
        // Вызывается каждый раз, когда что-либо монтируется в DOM, когда отслеживаемый элемент меняется в DOMе и когда элемент демонтируется
        api.users.fetchAll().then((data) => {
            setUsers(data);
        });
    }, []);
    const handleDelete = (userId) => {
        const updateUsers = users.filter((user) => user._id !== userId);
        setUsers(updateUsers);
    };
    const handleToggleBookMark = (id) => {
        console.log("OK");
        setUsers(
            users.filter((user) => {
                if (user._id === id) {
                    user.status = !user.status;
                    return user;
                }
                return user;
            })
        );
    };

    return (
        <>
            {users && (
                <Users
                    onDelete={handleDelete}
                    badgeClasse={Badge_Classe}
                    titleClasse={Title_Classe}
                    onToggleBookMark={handleToggleBookMark}
                    users={users}
                />
            )}
        </>
    );
};
export default App;
