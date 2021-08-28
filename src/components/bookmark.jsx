import React from 'react'

const BookMark = ({changeBookMark}) => {
	return (
		<a href='/' onClick={e => changeBookMark(e)}>
			<i className='bi bi-bookmark'></i>
		</a>
	)
}

export default BookMark
