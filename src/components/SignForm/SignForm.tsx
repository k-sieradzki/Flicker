import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import MainBtn from '../MainBtn/MainBtn';
import { useForm } from 'react-hook-form';
import { SignFormProps } from '../../types/types';
import styles from './signForm.module.scss';

const SignForm: React.FC<SignFormProps> = ({
	signFunction,
	handleError,
	wrongPassword,
	sayWhat,
}) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		if (wrongPassword) {
			setValue('password', '');
			console.log('object');
		}
		return () => {
			setValue('password', '');
		};
	}, [wrongPassword, setValue]);

	return (
		<form className={styles.signForm} onSubmit={handleSubmit(signFunction)}>
			<div className={styles.inputBox}>
				<span className={styles.loginBoxIcon}>
					<FontAwesomeIcon icon={faEnvelope} />
				</span>
				<input
					type='email'
					placeholder='Email'
					{...register('email', { required: true })}
					className={errors.email ? styles.errorInput : ''}
				/>
			</div>

			<div className={styles.inputBox}>
				<span className={styles.loginBoxIcon}>
					<FontAwesomeIcon icon={faKey} />
				</span>
				<input
					type='password'
					placeholder='Password'
					{...register('password', { required: true })}
					className={errors.password ? styles.errorInput : ''}
				/>
			</div>

			<div className={styles.errorBox}>
				<p>{handleError}</p>
			</div>

			<div className={styles.btnBox}>
				<MainBtn name={sayWhat} />
			</div>
		</form>
	);
};

export default SignForm;
