import React, { useState } from 'react';
import { auth, db, storage } from '../../services/firebase/firebase';
import { doc, deleteDoc, collection } from 'firebase/firestore';
import { deleteObject, ref, listAll } from 'firebase/storage';
import { reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import MainBtn from '../MainBtn/MainBtn';
import styles from './deleteAccount.module.scss';

const DeleteAccount: React.FC = () => {
	const [logError, setlogError] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const deleteAccount = async (password: string) => {
		const user = auth.currentUser;

		if (user) {
			try {
				const email = user.email || '';
				const credentials = EmailAuthProvider.credential(email, password);

				await reauthenticateWithCredential(user, credentials);

				const userDocRef = doc(collection(db, 'Users'), user.uid);
				await deleteDoc(userDocRef);

				const storageRef = ref(storage, `${user.uid}`);

				const storageFolder = await listAll(storageRef);
				if (storageFolder.items.length > 0) {
					for (const item of storageFolder.items) {
						await deleteObject(item);
					}
				}

				await user.delete();
			} catch (err: any) {
				setPassword('');
				setlogError(err.message);
			}
		}
	};

	const handleSubmit = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		await deleteAccount(password);
	};

	return (
		<form className={styles.profileForm}>
			<h3>Delete Account</h3>
			<p className={styles.noWayBack}>There's no way back</p>
			<div className={styles.formDiv}>
				<label className={styles.profileLabel} htmlFor='password'>
					{' '}
					Password{' '}
				</label>
				<input
					type='password'
					id='password'
					placeholder='Password'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
			</div>

			{logError !== '' && (
				<p className={styles.profileUpdateInfo}>{logError}</p>
			)}

			<div className={styles.updateBtn}>
				<MainBtn name='Delete Account' onClick={e => handleSubmit(e)} />
			</div>
		</form>
	);
};

export default DeleteAccount;
