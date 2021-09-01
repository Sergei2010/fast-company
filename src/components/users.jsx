import React from 'react'
import User from './user'
import SearchStatus from './searchStatus'
import Pagination from './pagination'

const Users = ({ users, onRenderClasse, ...rest }) => {
	const count = users.length
	const pageSize = 4
	const handlePageChange = pageIndex => {
		console.log('page: ', pageIndex)
	}
	return (
		<>
			<SearchStatus users={users} {...rest} />
			{count > 0 && (
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
			<Pagination
				itemsCount={count}
				pageSize={pageSize}
				onPageChange={handlePageChange}
			/>
		</>
	)
}

export default Users
