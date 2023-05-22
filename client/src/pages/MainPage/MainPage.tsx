import React, { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../..'
import { IUser } from '../../models/IUser'
import UserService from '../../services/UserService'

const MainPage: FC = () => {
    const { store } = useContext(Context)
	const [users, setUsers] = useState<IUser[]>([])

	useEffect(() => {
		if (localStorage.getItem('token')) {
			store.checkAuth()
		}
	}, [])

	async function getUsers() {
		try {
			const response = await UserService.fetchUsers()
			setUsers(response.data)
		} catch (e) {
			console.log(e)
		}
	}
	return (
		<div>
			<h1>
				{store.isAuth
					? `Пользователь авторизован ${store.user.email}`
					: 'АВТОРИЗУЙТЕСЬ'}
			</h1>
			<button onClick={() => store.logout()}>Выйти</button>
			<div>
				<button onClick={getUsers}>Получить пользователей</button>
			</div>
			{users.map(user => (
				<div key={user.email}>{user.email}</div>
			))}
		</div>
	)
}

export default MainPage
