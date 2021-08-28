import React, { useState } from 'react'
import Users from './components/users'
import api from './API'
import {
	Badge_Classe,
	Title_Classe,
	handleRenderPhrase,
	handleRenderColor,
} from './utils'

const App = () => {
	const [users, setUsers] = useState(api.users.fetchAll())

	const handleDelete = userId => {
		const updateUsers = users.filter(user => user._id !== userId)
		setUsers(updateUsers)
	}

	const handleChangeBookMark = e => {
		e.preventDefault()
		const id = e.target.dataset.type
		addBookMark(users, id)
		return e.target.className === 'bi bi-bookmark'
			? (e.target.className = 'bi bi-bookmark-fill')
			: (e.target.className = 'bi bi-bookmark')
	}

	const addBookMark = (users, id) => {
		const userChecked = users.find(user => user._id === id)
		return userChecked.bookMark === undefined || userChecked.bookMark === ''
			? (userChecked.bookMark = 'bookMark')
			: (userChecked.bookMark = '')
	}

	return (
		<Users
			onRenderColor={handleRenderColor}
			onRenderPhrase={handleRenderPhrase}
			onDelete={handleDelete}
			badgeClasse={Badge_Classe}
			titleClasse={Title_Classe}
			changeBookMark={handleChangeBookMark}
			users={users}
		/>
	)
}
export default App
