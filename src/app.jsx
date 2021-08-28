import React, { useState } from 'react'
import Users from './components/users'
import api from './API'

const App = () => {
	const [users, setUsers] = useState(api.users.fetchAll())

	const handleBadgeClasse = 'm-2 badge bg-'
	const handleTitleClasse = 'badge mt-2 bg-'

	const handleDelete = userId => {
		const updateUsers = users.filter(user => user._id !== userId)
		setUsers(updateUsers)
	}

	const handleRenderPhrase = num => {
		return num === 0
			? 'Никто не тусанёт'
			: [5, 6, 7, 8, 9, 10, 11, 12].find(el => el === num)
			? num + ' человек тусанут'
			: [2, 3, 4].find(el => el === num)
			? num + ' человека тусанёт'
			: num === 1
			? num + ' человек тусанёт'
			: 'Весь этот коллектив'
	}

	const handleRenderColor = num => {
		return num === 0 ? 'danger' : 'primary'
	}

	const handleChangeBookMark = e => {
		e.preventDefault()
		return e.target.className === 'bi bi-bookmark'
			? (e.target.className = 'bi bi-bookmark-fill')
			: (e.target.className = 'bi bi-bookmark')
	}

	return (
		<Users
			onRenderColor={handleRenderColor}
			onRenderPhrase={handleRenderPhrase}
			onDelete={handleDelete}
			badgeClasse={handleBadgeClasse}
			titleClasse={handleTitleClasse}
			users={users}
			changeBookMark={handleChangeBookMark}
		/>
	)
}

export default App
