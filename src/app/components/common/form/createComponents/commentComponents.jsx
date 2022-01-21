import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { handleTime } from "../../../../utils/functions"
import _ from "lodash"
import api from "../../../../api"

const CommentComments = ({ idChecked, users, comments }) => {
	const userId = idChecked
	const [usersAll, setUsersAll] = useState([])
	const [, setCommentsAll] = useState([])
	const [commentsForUser, setCommentsForUser] = useState(comments)
	useEffect(() => {
		/* try {
			api.comments.fetchCommentsForUser(idChecked).then((data) => {
				setCommentsForUser(data)
			})
		} catch (e) {
			console.error(e.message)
		} */
		setCommentsForUser(comments)
	}, [comments])
	useEffect(() => { setUsersAll(users) }, [users])
	useEffect(() => { setCommentsAll(comments) }, [comments])
	const handleName = (arr, id) => {
		let item = arr.filter(item => item[0] === id)
		item = item.toString()
		return item.slice(item.indexOf(",") + 1)
	}
	const handleRemove = (id) => {
		api.comments.remove(id)
			.then(() => {
				const newComments = localStorage.getItem("comments")
				setCommentsAll(newComments)
			})
			.then(() => {
				api.comments.fetchCommentsForUser(userId).then((data) => {
					setCommentsForUser(data)
				})
			})
	}
	const sortCommentsForUser = _.orderBy(commentsForUser, ["created_at"], ["desc"])
	return (<div className={ "card mb-3" + (sortCommentsForUser.length !== 0 ? "" : " border-light") }>
		<div className="card-body">
			{ sortCommentsForUser.length !== 0 ? <><h2>Comments</h2><hr /></> : "" }
			{ usersAll && sortCommentsForUser && sortCommentsForUser.map((comment) => {
				return (<div className="bg-light card-body mb-3" key={ comment._id }>
					<div className="row">
						<div className="col">
							<div
								className="d-flex flex-start"
							>
								<img
									src={ `https://avatars.dicebear.com/api/avataaars/${(
										Math.random() +
										1
									)
										.toString(
											36
										)
										.substring(
											7
										)}.svg` }
									className="rounded-circle shadow-1-strong me-3"
									alt="avatar"
									width="65"
									height="65"
								/>
								<div className="flex-grow-1 flex-shrink-1">
									<div className="mb-4">
										<div className="d-flex justify-content-between align-items-center">
											<p className="mb-1">
												<span className="small">{ handleName(usersAll, comment.userId) } </span>
												<span className="small"> { handleTime(Date.now(), comment.created_at) }</span>
											</p>
											<button className="btn btn-sm text-primary d-flex align-items-center" onClick={ () => handleRemove(comment._id) }>
												<i className="bi bi-x-lg"></i>
											</button>
										</div>
										<p className="small mb-0">
											{ comment.content }
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>)
			}) }
		</div>
	</div>
	)
}
CommentComments.propTypes = {
	idChecked: PropTypes.string,
	users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	comments: PropTypes.array,
	commentsForUser: PropTypes.array,
}

export default CommentComments
