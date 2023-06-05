import React, { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../services/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import MainBtn from '../MainBtn/MainBtn';
import AvatarUpdate from '../AvatarUpdate/AvatarUpdate';
import styles from './editProfile.module.scss';

const EditProfile: React.FC = () => {
	const [isUpdated, setIsUpdated] = useState<boolean>(false);
	const [avatar, setAvatar] = useState<string>('');
	const [fullName, setFullName] = useState<string>('');
	const [nickname, setNickname] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [gender, setGender] = useState<string>('Gender');

	useEffect(() => {
		const updatedInfoTime = setTimeout(() => {
			setIsUpdated(false);
		}, 3000);

		return () => {
			clearTimeout(updatedInfoTime);
		};
	}, [isUpdated]);

	useEffect(() => {
		return onAuthStateChanged(auth, user => {
			if (user) {
				const userId = user.uid;
				const userRef = doc(collection(db, 'Users'), userId);
				const unsubscribeSnapshot = onSnapshot(
					userRef,
					docSnapshot => {
						if (docSnapshot.exists()) {
							const data = docSnapshot.data();
							setFullName(data.profileData?.fullName || '');
							setNickname(data.profileData?.nickname || '');
							setEmail(data.email);
							setGender(data.profileData?.gender || 'Gender');
							setAvatar(data.avatar);
						}
					},
					err => {
						console.log('err.message', err.message);
					}
				);

				return () => {
					unsubscribeSnapshot();
				};
			}
		});
	}, []);

	const handleProfileUpdate = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();

		const userId = auth.currentUser?.uid;
		if (userId) {
			const userRef = doc(collection(db, 'Users'), userId);
			await updateDoc(userRef, {
				profileData: {
					fullName: fullName,
					nickname: nickname,
					gender: gender,
				},
			});
			setIsUpdated(true);
		}
	};

	return (
		<form className={styles.profileForm}>
			<AvatarUpdate avatar={avatar} />

			<div className={styles.formDiv}>
				<label className={styles.profileLabel} htmlFor='fullName'>
					{' '}
					Full Name{' '}
				</label>
				<input
					type='text'
					id='fullName'
					placeholder='Full Name'
					value={fullName}
					onChange={e => setFullName(e.target.value)}
				/>
			</div>

			<div className={styles.formDiv}>
				<label className={styles.profileLabel} htmlFor='nickName'>
					{' '}
					Nickname{' '}
				</label>
				<input
					type='text'
					id='nickName'
					placeholder='Nickname'
					value={nickname}
					onChange={e => setNickname(e.target.value)}
				/>
			</div>

			<div className={styles.formDiv}>
				<label className={styles.profileLabel} htmlFor='email'>
					{' '}
					Email{' '}
				</label>
				<input
					type='email'
					id='email'
					placeholder='Email'
					defaultValue={email}
					readOnly
				/>
			</div>

			<div className={styles.formDiv}>
				<label className={styles.profileLabel} htmlFor='genderSelect'>
					Gender
				</label>
				<select
					id='genderSelect'
					value={gender}
					onChange={e => setGender(e.target.value)}
				>
					<option value='Gender' disabled hidden>
						Select Gender{' '}
					</option>
					<option value='Male'>Male</option>
					<option value='Female'>Female</option>
					<option value='Other'>Other</option>
				</select>
			</div>

			{isUpdated && (
				<p className={styles.profileUpdateInfo}>Update successful</p>
			)}

			<div className={styles.updateBtn}>
				<MainBtn name='Update' onClick={e => handleProfileUpdate(e)} />
			</div>
		</form>
	);
};

export default EditProfile;
