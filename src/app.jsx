import React, { useState } from 'react'
import Users from './components/users'
import api from './API/index'
import {
	Badge_Classe,
	Title_Classe,
	Bookmark_Classe,
	handleRenderPhrase,
	handleRenderColor,
} from './utils'

const App = () => {
	const [users, setUsers] = useState(api.users.fetchAll())
	const [bookmarkClasse, setBookmarkClasse] = useState(Bookmark_Classe)

	const handleDelete = userId => {
		const updateUsers = users.filter(user => user._id !== userId)
		setUsers(updateUsers)
	}

	const setChangeBookMark = e => {
		e.preventDefault()
		setBookmarkClasse(Bookmark_Classe + '-fill')
		e.target.className = bookmarkClasse
		console.log('bookmarkClasse: ', bookmarkClasse)
	}

	return (
		<Users
			onRenderColor={handleRenderColor}
			onRenderPhrase={handleRenderPhrase}
			onDelete={handleDelete}
			badgeClasse={Badge_Classe}
			titleClasse={Title_Classe}
			changeBookMark={setChangeBookMark}
			users={users}
		/>
	)
}
export default App
