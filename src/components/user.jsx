import React from "react";
// import Qualities from "./qualities";
import Quality from "./quality";
import BookMark from "./bookmark";
import PropTypes from "prop-types";

const User = ({ user, onDelete, onToggleBookMark, ...rest }) => {
    return (
        <>
            {user && (
                <tr key={user._id}>
                    <td>{user.name}</td>
                    {/* <td>
                        <Qualities qualities={user.qualities} {...rest} />
                    </td> */}
                    <td>
                        {qualities.map((qual) => (
                            <Quality key={qual._id} {...qual} />
                        ))}
                    </td>
                    <td>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate} /5</td>
                    <td>
                        {/* <BookMark
                            status={user.status}
                            userId={user._id}
                            {...rest}
                            onToggleBookMark={onToggleBookMark}
                        /> */}
                        <BookMark
                            status={bookmark}
                            onClick={() => onToggleBookMark(_id)}
                        />
                    </td>
                    <td>
                        <button
                            onClick={() => onDelete(user._id)}
                            type="button"
                            className="btn-sm btn-danger"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            )}
        </>
    );
};

User.propTypes = {
    user: PropTypes.object.isRequired,
    // bookmark: PropTypes.object,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};

export default User;
