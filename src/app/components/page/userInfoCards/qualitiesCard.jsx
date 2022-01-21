import React from "react"
import Qualities from "../../ui/qualities/qualitiesList"

const QualitiesCard = (userQualities) => {
	const qualities = userQualities.userQualities
	return (<div className="card mb-3">
		<div className="card-body d-flex flex-column justify-content-center text-center">
			<h5 className="card-title">
				<span>Qualities</span>
			</h5>
			<p className="card-text">
				<Qualities qualities={ qualities } />
			</p>
		</div>
	</div>)
}

export default QualitiesCard
