import React, { FC, useContext, useEffect, useState } from 'react'
import LoginForm from './components/LoginForm/LoginForm'
import { Context } from '.'
import { observer } from 'mobx-react-lite'
import UserService from './services/UserService'
import { IUser } from './models/IUser'
import AuthPage from './pages/AuthPage/AuthPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import MainPage from './pages/MainPage/MainPage'

const App: FC = () => {
	const { store } = useContext(Context)
	const [users, setUsers] = useState<IUser[]>([])

	useEffect(() => {
		if (localStorage.getItem('token')) {
			store.checkAuth()
		}
	}, [])

	
	if (store.isLoading) {
		return <div>Загрузка...</div>
	}

	if (!store.isAuth) {
		return <AuthPage />
	}

	return (
		<div>
			

			<BrowserRouter >
				<Routes>
					<Route path='/auth' element={<AuthPage />} />
					<Route path='/' element={<MainPage />} />


				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default observer(App)
