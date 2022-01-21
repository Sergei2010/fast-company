import React from "react"
import UserCard from "../userInfoCards/userCard"
import ComponentsListComponent from "../../common/form/createComponents/commentsListComponent"

const UserPage = (userId) => {
    const idChecked = userId.userId
    return (<div className="d-flex" >
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3"><UserCard userId={ idChecked } /></div>
                <div className="col-md-8"><ComponentsListComponent userId={ idChecked } /></div>
            </div>
        </div>
    </div>)
}

export default UserPage
