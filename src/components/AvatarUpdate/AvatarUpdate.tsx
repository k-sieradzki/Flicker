import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { avatarDef } from '../../assets/images/images';
import { db, auth, storage } from '../../services/firebase/firebase';
import { collection, doc, updateDoc } from 'firebase/firestore';
import {
	ref,
	uploadBytes,
	getDownloadURL,
	deleteObject,
} from 'firebase/storage';
import { AvatarUpdateProps } from '../../types/types';
import styles from './avatarUpdate.module.scss';

const AvatarUpdate: React.FC<AvatarUpdateProps> = ({ avatar }) => {
	const uploadAndHandleAvatarUpdate = async (file: File) => {
		const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
		const ACCEPTED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png'];

		if (!file) return;

		const fileExtension = file.name.split('.').pop()?.toLowerCase() as string;
		if (!ACCEPTED_IMAGE_EXTENSIONS.includes(fileExtension)) {
			alert('Invalid file format. Only images are allowed.');
			return;
		}

		if (file.size > MAX_IMAGE_SIZE_BYTES) {
			alert('The image size exceeds the allowed limit (5MB).');
			return;
		}
		const userId = auth.currentUser?.uid;
		const filesFolderRef = ref(storage, `${userId}/avatar`);
		try {
			const snapshot = await uploadBytes(filesFolderRef, file);
			const downloadURL = await getDownloadURL(snapshot.ref);

			if (userId) {
				const userRef = doc(collection(db, 'Users'), userId);
				await updateDoc(userRef, {
					avatar: downloadURL,
				});
			}
		} catch (err) {
			console.error(err);
		}
	};

	const deleteAvatar = async () => {
		const userId = auth.currentUser?.uid;

		if (userId) {
			const avatarRef = ref(storage, `${userId}/avatar`);

			try {
				await deleteObject(avatarRef);
				const userRef = doc(collection(db, 'Users'), userId);
				await updateDoc(userRef, {
					avatar: avatarDef,
				});
			} catch (err) {
				console.error(err);
			}
		}
	};

	return (
		<div className={styles.photoBox}>
			<div className={styles.profilePhoto}>
				<img src={avatar !== undefined || '' ? avatar : avatarDef} alt='' />
				<label htmlFor='file-upload' className={styles.customFileUpload}>
					{' '}
				</label>
				<input
					id='file-upload'
					type='file'
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						const selectedFile = e.target.files?.[0];
						selectedFile && uploadAndHandleAvatarUpdate(selectedFile);
					}}
				/>
			</div>
			<div className={styles.trashBox} onClick={deleteAvatar}>
				<FontAwesomeIcon
					icon={faTrashCan}
					style={{ color: 'var(--color-textOnColor)' }}
				/>
			</div>
		</div>
	);
};

export default AvatarUpdate;
