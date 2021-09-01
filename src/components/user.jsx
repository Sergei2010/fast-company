import React from 'react'
import Qualities from './qualities'
import BookMark from './bookmark'

const User = ({ user, bookmark, onDelete, onToggleBookMark, ...rest }) => {
	return (
		<tr key={user._id}>
			<td>{user.name}</td>
			<td>
				<Qualities qualities={user.qualities} {...rest} />
			</td>
			<td>{user.profession.name}</td>
			<td>{user.completedMeetings}</td>
			<td>{user.rate} /5</td>
			<td>
				<BookMark
					status={user.status}
					userId={user._id}
					{...rest}
					onToggleBookMark={onToggleBookMark}
				/>
			</td>
			<td>
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
