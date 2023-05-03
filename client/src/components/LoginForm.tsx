import React, { FC, useContext, useState } from 'react'
import { Context } from '..'

const LoginForm: FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
    const [username, setUsername] = useState<string>('')

	const { store } = useContext(Context)

	return (
		<div>
            <input
				onChange={e => setUsername(e.target.value)}
				value={username}
				type='text'
				placeholder='Username'
			/>
			<input
				onChange={e => setEmail(e.target.value)}
				value={email}
				type='text'
				placeholder='Email'
			/>
			<input
				onChange={e => setPassword(e.target.value)}
				value={password}
				type='password'
				placeholder='Пароль'
			/>
			<button onClick={() => store.login(email, password)}>Логин</button>
			<button onClick={() => store.registration(username, email, password)}>
				Регистрация
			</button>
		</div>
	)
}

export default LoginForm
