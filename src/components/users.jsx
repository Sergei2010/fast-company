import React, { useState, useEffect } from "react";
import User from "./user";
import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../API";

const Users = ({ users, onRenderClasse, ...rest }) => {
    let filteredUsers;
    let count;
    let usersCrops;

    const pageSize = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();

    useEffect(() => {
        // Вызывается каждый раз, когда что-либо монтируется в DOM, когда отслеживаемый элемент меняется в DOMе и когда элемент демонтируется
        api.professions.fetchAll().then((data) => {
            setProfession(data);
        });
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    if (users) {
        filteredUsers = selectedProf
            ? users.filter((user) => {
                  return user.profession.name === selectedProf.name;
              })
            : users;
        count = filteredUsers.length;
        usersCrops = paginate(filteredUsers, currentPage, pageSize);
    }
    const clearFilter = () => {
        setSelectedProf();
    };
    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                {count > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качество</th>
                                <th scope="col">Профессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(usersCrops)
                                ? usersCrops.map((user) => {
                                      return (
                                          <User
                                              key={user._id}
                                              user={user}
                                              {...rest}
                                          />
                                      );
                                  })
                                : Object.keys(usersCrops).map((user) => {
                                      return (
                                          <User
                                              key={user._id}
                                              user={user}
                                              {...rest}
                                          />
                                      );
                                  })}
                        </tbody>
                    </table>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    count: PropTypes.number,
    pageSize: PropTypes.number,
    handlePageChange: PropTypes.func,
    onRenderClasse: PropTypes.func
};

export default Users;
