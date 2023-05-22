import { FC } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import styles from './AuthPage.module.scss'

const AuthPage: FC = () => {
	return (
		<div className={styles.authPage}>
			<LoginForm />
		</div>
	)
}

export default AuthPage
