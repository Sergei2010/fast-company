import React, { useState, useEffect } from "react"
import { handleTime } from "../../../../utils/functions"
import _ from "lodash"
import api from "../../../../api"

const CommentComments = (props) => {
	const idChecked = Object.values(props)[0]
	const [usersData, setUsersData] = useState([])
	const [commentsForUser, setCommentsForUser] = useState([])
	useEffect(() => {
		try {
			api.comments.fetchCommentsForUser(idChecked).then((data) => {
				setCommentsForUser(data)
			})
		} catch (e) {
			console.error(e.message)
		}
	}, [])
	useEffect(() => { setUsersData(Object.values(props)[1]) }, [props])
	const handleName = (arr, id) => {
		const items = Object.values(arr).map((item) => [item._id, item.name])
		let item = items.filter(item => item[0] === id)
		item = item.toString()
		return item.slice(item.indexOf(",") + 1)
	}
	const sortCommentsForUser = _.orderBy(commentsForUser, ["created_at"], ["desc"])
	return (<div className={ "card mb-3" + (sortCommentsForUser.length !== 0 ? "" : " border-light") }>
		<div className="card-body">
			{ sortCommentsForUser.length !== 0 ? <><h2>Comments</h2><hr /></> : "" }
			{ sortCommentsForUser && sortCommentsForUser.map((comment) => {
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
												<span className="small">{ usersData && handleName(usersData, comment.userId) } </span>
												<span className="small"> { usersData && handleTime(Date.now(), comment.created_at) }</span>
											</p>
											<button className="btn btn-sm text-primary d-flex align-items-center" /* onClick={ () => handleRemove(comment._id) } */>
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

export default CommentComments
