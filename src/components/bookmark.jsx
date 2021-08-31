import React from 'react'
import { Bookmark_Classe } from '../utils'

const BookMark = ({ changeBookMark, userId, bookmarkClasse }) => {
	return (
		<>
			<a href='/' onClick={(e, userId) => changeBookMark(e, userId)}>
				<i className={Bookmark_Classe} data-type={userId}></i>
			</a>
		</>
	)
}

export default BookMark
