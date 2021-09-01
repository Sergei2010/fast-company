import React from 'react'

const BookMark = ({ onToggleBookMark, userId, status }) => {
	return (
		<button onClick={() => onToggleBookMark(userId)}>
			<i className={'bi bi-bookmark' + (status ? '-heart-fill' : '')}></i>
		</button>
	)
}

export default BookMark
