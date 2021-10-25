import React, { useState, useEffect } from "react";
import SearchStatus from "../../ui/searchStatus";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import api from "../../../api";
import UserTable from "../../ui/usersTable";
import _ from "lodash";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 8;
    const [users, setUsers] = useState();

    useEffect(() => {
        try {
            api.users.fetchAll().then((data) => {
                setUsers(data);
            });
        } catch (e) {
            console.error(e.message);
        }
    }, []);
    const handleDelete = (userId) => {
        const updateUsers = users.filter((user) => user._id !== userId);
        setUsers(updateUsers);
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
    }, [selectedProf, searchQuery]);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleProfessionSelect = (item) => {
        if (searchQuery !== "") {
            setSearchQuery("");
        }
        setSelectedProf(item);
    };
    const handleSearchQuery = ({ target }) => {
        setSelectedProf(undefined);
        setSearchQuery(target.value);
    };
    if (users) {
        // eslint-disable-next-line multiline-ternary
        const filteredUsers = searchQuery
            // eslint-disable-next-line multiline-ternary
            ? users.filter(
                  (user) =>
                      user.name
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1
              )
            // eslint-disable-next-line multiline-ternary
            : selectedProf
            // eslint-disable-next-line multiline-ternary
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
                    <SearchStatus length={count} />
                    <input
                        type="text"
                        name="searchQuery"
                        placeholder="Search ..."
                        onChange={handleSearchQuery}
                        value={searchQuery}
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

UsersListPage.propTypes = {
    users: PropTypes.array,
    data: PropTypes.array,
    count: PropTypes.number,
    pageSize: PropTypes.number,
    handlePageChange: PropTypes.func,
    onRenderClasse: PropTypes.func
};

export default UsersListPage;
