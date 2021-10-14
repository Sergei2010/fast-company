import React, { useState, useEffect } from "react";
import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../API";
import UserTable from "./usersTable";
import _ from "lodash";

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 8;
    const [users, setUsers] = useState();
    const [data, setData] = useState();
    const [searchSubString, setSearchSubString] = useState("");
    const [placeholder, setPlaceholder] = useState("Search");

    useEffect(() => {
        try {
            api.users.fetchAll().then((data) => {
                setUsers(data);
                setData(data);
            });
        } catch (e) {
            console.error(e.message);
        }
    }, []);
    const handleDelete = (userId) => {
        const updateUsers = users.filter((user) => user._id !== userId);
        setUsers(updateUsers);
    };
    const handleSearch = ({ target }) => {
        const value = target.value.toLowerCase();
        setSearchSubString(target.value);
        const updateUsers = users.filter((user) =>
            user.name.toLowerCase().includes(value)
        );
        setUsers(updateUsers);
        if (!updateUsers.length || !value) {
            setTimeout(() => {
                setUsers(data);
                setSearchSubString("");
                setPlaceholder("Try another one ...");
            }, 1500);
        }
    };
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };
    useEffect(() => {
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
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setUsers(data);
        setSearchSubString("");
        setPlaceholder("Search");
    };
    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrops = paginate(sortedUsers, currentPage, pageSize);
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
                    <SearchStatus
                        length={count}
                        onUserSearch={handleSearch}
                        onClearFilter={clearFilter}
                        placeholder={placeholder}
                        value={searchSubString}
                    />
                    {count > 0 && (
                        <UserTable
                            users={usersCrops}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
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
    }
    return <span className="span">Loading ...</span>;
};

Users.propTypes = {
    users: PropTypes.array,
    data: PropTypes.array,
    count: PropTypes.number,
    pageSize: PropTypes.number,
    handlePageChange: PropTypes.func,
    onRenderClasse: PropTypes.func
};

export default Users;
