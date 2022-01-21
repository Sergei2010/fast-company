import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import api from "../../../api"
import Img from "../../../assets/img"
import QualitiesCard from "./qualitiesCard"
import MeetingsCard from "./meetingsCard"

const UserCard = (userId) => {
	const idChecked = userId.userId
	const [user, setUser] = useState({})
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		let cleanupFunction = false
		try {
			api.users
				.getById(idChecked)
				.then((data) => {
					if (!cleanupFunction) {
						setUser({
							name: data.name,
							profession: data.profession.name,
							rate: data.rate,
							qualities: data.qualities,
							completedMeetings: data.completedMeetings,
						})
					}
				})
		} catch (e) {
			console.error(e.message)
		}
		return () => (cleanupFunction = true)
	}, [])
	setTimeout(() => {
		setLoading(false)
	}, 2000)
	return (<>
		{ user ? (<>
			<div className="card mb-3">
				<div className="card-body">
					<Link
						to={ `/users/${idChecked}/edit` }
						className="
						position-absolute
						top-0
						end-0
						btn btn-light btn-sm
					"
					>
						<i className="bi bi-gear"></i>
					</Link>
					<div className="d-flex flex-column align-items-center text-center position-relative">
						{ !loading && <Img /> }
						<div className="mt-3">
							<h4>{ user.name }</h4>
							<p className="text-secondary mb-1">{ user.profession }</p>
							<div className="text-muted">
								<i className="bi bi-caret-down-fill text-primary" role="button"></i>
								<i className="bi bi-caret-up text-secondary" role="button"></i>
								<span className="ms-2">{ user.rate }</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<QualitiesCard userQualities={ user.qualities } />
			<MeetingsCard userCompletedMeetings={ user.completedMeetings } />
		</>) : ((
			<div className="d-flex flex-column flex-shrink-0 p-3">
				{ !loading ? (
					<h2>{ `User with id: ${idChecked} not found` }</h2>
				) : (
					<p>Loading ...</p>
				) }
			</div>
		)) }
	</>)
}

UserCard.propTypes = {
	idChecked: PropTypes.string,
}

export default UserCard
