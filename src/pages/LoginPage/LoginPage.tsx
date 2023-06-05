import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SignForm from '../../components/SignForm/SignForm';
import { flicker_logo } from '../../assets/images/images';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase/firebase';
import { LoginData } from '../../types/types';
import styles from './loginPage.module.scss';

const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const [handleError, setHandleError] = useState<string>('');

	const [wrongPassword, setWrongPassword] = useState<boolean>(false);

	const handleLogin = (data: LoginData) => {
		const { email, password } = data;

		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				setHandleError('');
				navigate('/home');
			})
			.catch(err => {
				setWrongPassword(true);
				setHandleError(err.message);
			});
	};

	return (
		<div className={styles.loginPageContainer}>
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<img src={flicker_logo} alt='flicker logo' />
					<h2>Login to Your Account</h2>

					<SignForm
						signFunction={handleLogin}
						handleError={handleError}
						wrongPassword={wrongPassword}
						sayWhat={'Log in'}
					/>

					<Link className={styles.forgotPassword} to={'/reset'}>
						Forgot the password?
					</Link>

					<p className={styles.smallText}>
						Don't have an account{' '}
						<Link to={'/register'}>
							<span>Sign up</span>
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
