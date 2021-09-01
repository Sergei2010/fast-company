import React, { useState } from 'react'
import Users from './components/users'
import api from './API/index'
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

	const handleToggleBookMark = id => {
		console.log('OK')
		setUsers(
			users.filter(user => {
				if (user._id === id) {
					user.status = !user.status
					return user
				}
				return user
			})
		)
	}

	return (
		<Users
			onRenderColor={handleRenderColor}
			onRenderPhrase={handleRenderPhrase}
			onDelete={handleDelete}
			badgeClasse={Badge_Classe}
			titleClasse={Title_Classe}
			onToggleBookMark={handleToggleBookMark}
			users={users}
		/>
	)
}
export default App
