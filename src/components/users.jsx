import React, { useState } from 'react'
import api from '../API'

const Users = () => {
	const [users, setUsers] = useState(api.users.fetchAll())

	const badgeClasse = 'm-2 badge bg-'
	const titleClasse = 'badge mt-2 bg-'

	const handleDelete = userId => {
		const updateUsers = users.filter(user => user._id !== userId)
		setUsers(updateUsers)
	}

	const renderPhrase = num => {
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

	const renderColor = num => {
		return num === 0 ? 'danger' : 'primary'
	}

	const hideTable = num => {
		const table = document.querySelector('table')
		return num === 0 ? (table.innerHTML = '') : ''
	}

	return (
		<>
			<h1>
				<span className={titleClasse + renderColor(users.length)}>
					{renderPhrase(users.length)} с тобой сегодня
				</span>
			</h1>
			{users.length > 0 &&
			<table className='table'>
				<thead>
					<tr>
						<th scope='col'>Имя</th>
						<th scope='col'>Качество</th>
						<th scope='col'>Профессия</th>
						<th scope='col'>Встретился, раз</th>
						<th scope='col'>Оценка</th>
						<th scope='col'></th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => {
						return (
							<tr key={user._id}>
								<td key={user.name}>{user.name}</td>
								<td key='qualities'>
									{user.qualities.map(quality => (
										<span
											className={badgeClasse + quality.color}
											key={quality._id}
										>
											{quality.name}
										</span>
									))}
								</td>
								<td key={user.profession._id}>{user.profession.name}</td>
								<td key={user.completedMeetings}>{user.completedMeetings}</td>
								<td key={user.rate}>{user.rate} /5</td>
								<td key={user.key}>
									<button
										onClick={() => handleDelete(user._id)}
										type='button'
										className='btn-sm btn-danger'
									>
										Delete
									</button>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>}
		</>
	)
}

export default Users
