import React from 'react'

const SearchStatus = ({
	titleClasse,
	users,
	onRenderColor,
	onRenderPhrase,
}) => {
	return (
		<h1>
			<span className={titleClasse + onRenderColor(users.length)}>
				{onRenderPhrase(users.length)} с тобой сегодня
			</span>
		</h1>
	)
}

export default SearchStatus
