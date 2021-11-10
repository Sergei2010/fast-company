import React, { useState, useEffect } from "react"
import SelectField from "../selectField"
import TextareaField from "../textareaField"
import CommentComments from "./commentComponents"
import api from "../../../../api"

const ComponentsListComponent = (userId) => {
	const idChecked = userId.userId
	const [users, setUsers] = useState({})
	useEffect(() => {
		try {
			api.users
				.fetchAll()
				.then((data) => {
					setUsers(Object.values(data).map((item) => [item._id, item.name]))
				})
		} catch (e) {
			console.error(e.message)
		}
	}, [])
	return (<>
		<div className="card mb-2">
			<form className="card mb-2">
				<div className="card-body">
					<div>
						<h2>New comment</h2>
						<div className="mb-4">
							<SelectField
								label="Выберите пользователя"
								name="users"
								options={ users }
								defaultOption="Choose ..."
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="exampleFormControlTextarea1"
								className="form-label"
							>
								Сообщение
							</label>
							<TextareaField
								className="form-control"
								id="exampleFormControlTextarea1"
								name="textarea"
								rows="3"
							/>
						</div>
					</div>
				</div>
				<div className="d-grid gap-2 d-md-flex justify-content-md-end mb-2">
					<button
						className="btn btn-primary me-md-3"
					>
						Опубликовать
					</button>
				</div>
			</form>
			<div className="card-body ">
				add comment
			</div>
		</div>
		{ users && <CommentComments userId={ idChecked } usersData={ users } /> }
	</>)
}

export default ComponentsListComponent
