import React, { FC, useContext, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import { Context } from '.'
import { observer } from 'mobx-react-lite'

const App: FC = () => {
	const { store } = useContext(Context)

	useEffect(() => {
		if (localStorage.getItem('token')) {
			store.checkAuth()
		}
	}, [])

	return (
		<div className='App'>
			<h1>
				{store.isAuth
					? `Авторизован ${store.user.email}`
					: 'Не авторизован'}
			</h1>
			<LoginForm />
		</div>
	)
}

export default observer(App)
