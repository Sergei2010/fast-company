import React from 'react'
import Qualities from './qualities'
import BookMark from './bookmark'

const User = ({ user, bookmark, onDelete, ...rest }) => {
	return (
		<tr key={user._id}>
			<td key={user.name}>{user.name}</td>
			<Qualities qualities={user.qualities} {...rest} />
			<td key={user.profession._id}>{user.profession.name}</td>
			<td key={user.completedMeetings}>{user.completedMeetings}</td>
			<td key={user.rate}>{user.rate} /5</td>
			<td key={bookmark}>
				<BookMark userId={user._id} {...rest} />
			</td>
			<td key={user.key}>
				<button
					onClick={() => onDelete(user._id)}
					type='button'
					className='btn-sm btn-danger'
				>
					Delete
				</button>
			</td>
		</tr>
	)
}

export default User
