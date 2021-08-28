import React from 'react'

const BookMark = ({ changeBookMark, userId }) => {
	return (
		<a href='/' onClick={(e, user) => changeBookMark(e, user)}>
			<i className='bi bi-bookmark' data-type={userId}></i>
		</a>
	)
}

export default BookMark
