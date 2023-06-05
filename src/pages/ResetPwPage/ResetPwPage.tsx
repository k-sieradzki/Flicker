import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import MainBtn from '../../components/MainBtn/MainBtn';
import { Link } from 'react-router-dom';
import { password } from '../../assets/images/images';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import styles from './resetPwPage.module.scss';

type ResetPwFormData = {
	email: string;
};

const ResetPwPage: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ResetPwFormData>();
	const [handleError, setHandleError] = useState<string>('');

	const handleResetPW = (data: ResetPwFormData) => {
		const auth = getAuth();
		const inputEmail = data.email.trim();
		if (!inputEmail) {
			setHandleError('Please enter an email.');
			return;
		}

		sendPasswordResetEmail(auth, data.email)
			.then(() => {
				setHandleError('Password reset email sent!');
			})
			.catch(error => {
				setHandleError(error.message);
			});
	};

	return (
		<div className={styles.resetPwPageContainer}>
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<img src={password} alt='reset password' />
					<h2>Reset your password</h2>

					<form
						className={styles.resetForm}
						onSubmit={handleSubmit(handleResetPW)}
					>
						<div className={styles.inputBox}>
							<span className={styles.resetBoxIcon}>
								<FontAwesomeIcon icon={faEnvelope} />
							</span>
							<input
								type='email'
								placeholder='Email'
								{...register('email', { required: true })}
								className={errors.email ? styles.errorInput : ''}
							/>
						</div>
						<div className={styles.errorBox}>
							{handleError && <p className={styles.errorBox}>{handleError}</p>}
						</div>

						<div className={styles.btnBox}>
							<MainBtn name={'Reset Password'} />
						</div>
					</form>

					<p className={styles.smallText}>
						Oh! You remember?
						<Link to={'/login'}>
							<span> Log in</span>
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ResetPwPage;
