import React, { FC, useContext, useState } from 'react'
import { Context } from '../..'
import { observer } from 'mobx-react-lite'
import styles from './LoginForm.module.scss'
import { Link } from 'react-router-dom'

const LoginForm: FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [username, setUsername] = useState<string>('')

	const { store } = useContext(Context)

	return (
		<div className={styles.form}>
			<label className={styles.formLabel}>Username</label>
			<input
				className={styles.formInput}
				onChange={e => setUsername(e.target.value)}
				value={username}
				type='text'
				placeholder='Username'
			/>
			<label className={styles.formLabel}>Email</label>
			<input
				className={styles.formInput}
				onChange={e => setEmail(e.target.value)}
				value={email}
				type='text'
				placeholder='Email'
			/>
			<label className={styles.formLabel}>Password</label>

			<input
				className={styles.formInput}
				onChange={e => setPassword(e.target.value)}
				value={password}
				type='password'
				placeholder='Пароль'
			/>
			<button
				className={styles.formButtonAuth}
				onClick={() => store.login(email, password)}
			>
				Логин
			</button>
			{/* <h6 className={styles.registerButton}>No account? Then  <Link to="/register"> register</Link></h6> */}

			<button
				className={styles.formButtonAuth}
				onClick={() => store.registration(username, email, password)}
			>
				Регистрация
			</button>
		</div>
	)
}

export default observer(LoginForm)
