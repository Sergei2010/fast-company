import React from "react"

const MeetingsCard = (userCompletedMeetings) => {
	const completedMeetings = userCompletedMeetings.userCompletedMeetings
	return (<div className="card mb-3">
		<div className="card-body d-flex flex-column justify-content-center text-center">
			<h5 className="card-title">
				<span>completedMeetings</span>
			</h5>

			<h1 className="display-1">{ completedMeetings }</h1>
		</div>
	</div>)
}

export default MeetingsCard