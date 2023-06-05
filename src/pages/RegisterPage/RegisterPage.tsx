import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { flicker_logo } from '../../assets/images/images';
import { Link } from 'react-router-dom';
import SignForm from '../../components/SignForm/SignForm';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { db, auth } from '../../services/firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { LoginData } from '../../types/types';
import styles from './registerPage.module.scss';

const RegisterPage = () => {
	const registerFormRef = useRef<HTMLFormElement>(null);
	const navigate = useNavigate();
	const [handleError, setHandleError] = useState<string>('');

	const handleRegister = (data: LoginData) => {
		const { email, password } = data;

		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				const user = auth.currentUser;
				if (user) {
					const docRef = doc(db, 'Users', user.uid);
					setDoc(docRef, {
						email: user.email,
						isVerified: user.emailVerified,
						favouriteMovies: [],
					})
						.then(() => {
							signInWithEmailAndPassword(auth, email, password)
								.then(() => {
									navigate('/home');
									setHandleError('');
								})
								.catch(error => {
									setHandleError(error.message);
								});
						})
						.catch(error => {
							setHandleError(error.message);
						});
					registerFormRef.current?.reset();
				}
			})
			.catch(err => {
				setHandleError(err.message);
			});
	};

	return (
		<div className={styles.registerPageContainer}>
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<img src={flicker_logo} alt='flicker logo' />
					<h2>Create Your Account</h2>

					<SignForm
						signFunction={handleRegister}
						handleError={handleError}
						sayWhat={'Create Account'}
					/>

					<p className={styles.smallText}>
						Already have an account
						<Link to={'/login'}>
							<span> Sign in</span>
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
