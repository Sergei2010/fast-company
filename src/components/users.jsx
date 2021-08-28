import React from 'react'
import User from './user'
import SearchStatus from './searchStatus'

const Users = ({ users, ...rest }) => {
	return (
		<>
			<SearchStatus users={users} {...rest} />
			{users.length > 0 && (
				<table className='table'>
					<thead>
						<tr>
							<th scope='col'>Имя</th>
							<th scope='col'>Качество</th>
							<th scope='col'>Профессия</th>
							<th scope='col'>Встретился, раз</th>
							<th scope='col'>Оценка</th>
							<th scope='col'>Избранное</th>
							<th scope='col'></th>
						</tr>
					</thead>
					<tbody>
						{users.map(user => {
							return <User key={user._id} user={user} {...rest} />
						})}
					</tbody>
				</table>
			)}
		</>
	)
}

export default Users
