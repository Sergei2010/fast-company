import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import SelectField from "../selectField"
import TextareaField from "../textareaField"
import { validator } from "../../../../utils/validator"
import CommentComments from "./commentComponents"
import api from "../../../../api"

const ComponentsListComponent = (userId) => {
	const idChecked = userId.userId
	const [data, setData] = useState({
		user: "",
		textarea: "",

	})
	const [newComment, setNewComment] = useState({
		_id: "",
		userId: "",
		pageId: "",
		content: "",
		created_at: "",
	})
	const [users, setUsers] = useState([])
	const [usersObj, setUsersObj] = useState({})
	const [commentsForUser, setCommentsForUser] = useState([])
	const [errors, setErrors] = useState({})
	useEffect(() => {
		try {
			api.users
				.fetchAll()
				.then((data) => {
					setUsers(Object.values(data).map((item) => [item._id, item.name]))
				})
			api.users
				.fetchAll()
				.then((data) => {
					setUsersObj(data)
				})
			api.comments.fetchCommentsForUser(idChecked).then((data) => {
				setCommentsForUser(data)
			})
		} catch (e) {
			console.error(e.message)
		}
	}, [])
	// useEffect(() => (console.log("users: ", users)))
	// useEffect(() => (console.log("commentsForUser: ", commentsForUser)))
	// useEffect(() => (console.log("usersObj: ", usersObj)))
	// useEffect(() => (console.log("data: ", data)), [data])
	// useEffect(() => (console.log("newComment: ", newComment)), [newComment])
	const handleChange = (target) => {
		setData((prevState) => ({
			...prevState,
			[target.name]: target.value,
		}))
		if (target.name === "user") {
			const id = users.filter((user) => user[1] === target.value)[0][0]
			setNewComment({ ...newComment, userId: id, pageId: idChecked })
		}
		if (target.name === "textarea") {
			setNewComment({ ...newComment, content: target.value })
		}
	}
	const validateConfig = {
		user: {
			isRequired: {
				message: "Выберите пользователя, чтобы написать коментарий",
			},
		},
		textarea: {
			isRequired: {
				message: "Для коментария заполните поле",
			},
			minRows: {
				message: "Коментарий должен состоять минимум из 3 строк",
				value: 3,
			},
		},
	}
	useEffect(() => {
		validate()
	}, [data])
	const validate = () => {
		const errors = validator(data, validateConfig)
		setErrors(errors)
		return Object.keys(errors).length === 0
	}
	const isValid = Object.keys(errors).length === 0
	const handleSubmit = (e) => {
		e.preventDefault()
		const isValidate = validate()
		if (!isValidate) return
		setData({
			user: "",
			textarea: "",
		})
		api.comments.add(newComment).then(() => {
			api.comments.fetchCommentsForUser(idChecked).then((data) => {
				setCommentsForUser(data)
			})
		})
	}
	return (<>
		<form className="card mb-2" onSubmit={ handleSubmit }>
			<div className="card-body">
				<div>
					<h2>New comment</h2>
					<div className="mb-4">
						<SelectField
							label="Выберите пользователя"
							onChange={ handleChange }
							name="user"
							options={ usersObj }
							defaultOption="Choose ..."
							error={ errors.user }
						/>
					</div>
					<div className="mb-4">
						<TextareaField
							label="Сообщение"
							className="form-control"
							id="exampleFormControlTextarea1"
							name="textarea"
							value={ data.textarea }
							onChange={ handleChange }
							rows="3"
							error={ errors.textarea }
						/>
					</div>
				</div>
			</div>
			<div className="d-grid gap-2 d-md-flex justify-content-md-end mb-2">
				<button
					className="btn btn-primary me-md-3"
					disabled={ !isValid }
				>
					Опубликовать
				</button>
			</div>
		</form>
		{ users && <CommentComments idChecked={ idChecked } users={ users } comments={ commentsForUser } /> }
	</>)
}
ComponentsListComponent.propTypes = {
	users: PropTypes.array,
}

export default ComponentsListComponent
