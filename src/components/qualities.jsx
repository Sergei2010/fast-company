import React from 'react'

const Qualities = ({ qualities, badgeClasse }) => {
	return (
		<>
			{qualities.map(quality => (
				<span className={badgeClasse + quality.color} key={quality._id}>
					{quality.name}
				</span>
			))}
		</>
	)
}

export default Qualities
