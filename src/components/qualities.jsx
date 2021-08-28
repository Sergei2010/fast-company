import React from 'react'

const Qualities = ({ qualities, badgeClasse }) => {
	return (
		<td key={qualities.name}>
			{qualities.map(quality => (
				<span className={badgeClasse + quality.color} key={quality._id}>
					{quality.name}
				</span>
			))}
		</td>
	)
}

export default Qualities
