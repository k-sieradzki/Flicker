import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
	collection,
	doc,
	getDoc,
	onSnapshot,
	updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../../services/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { favMovie } from '../../types/types';
import styles from './addRemove.module.scss';

const AddRemove: React.FC<favMovie> = ({
	programID,
	programBackdrop,
	programPoster,
	programTitle,
	mediaType,
}) => {
	const [isFavourite, setIsFavourite] = useState<boolean>(false);
	const [isProcessing, setIsProcessing] = useState<boolean>(false);

	useEffect(() => {
		return onAuthStateChanged(auth, user => {
			if (user) {
				const userId = user.uid;
				if (userId) {
					const userRef = doc(collection(db, 'Users'), userId);
					const unsubscribeSnapshot = onSnapshot(
						userRef,
						docSnapshot => {
							if (docSnapshot.exists()) {
								const data = docSnapshot.data();
								const favouritesMovies = data.favouriteMovies || [];
								setIsFavourite(
									favouritesMovies.some(
										(movie: favMovie) => movie.programID === programID
									)
								);
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
			}
		});
	}, [programID]);

	const handleToggleFavourite = async () => {
		const userId = auth.currentUser?.uid;
		if (userId && !isProcessing) {
			setIsProcessing(true);

			const userRef = doc(collection(db, 'Users'), userId);

			const newFavourite = {
				programID,
				programBackdrop,
				programPoster,
				programTitle,
				mediaType,
			};
			const userDoc = await getDoc(userRef);
			const favouriteMovies = userDoc.data()?.favouriteMovies || [];

			const index = favouriteMovies.findIndex(
				(movie: favMovie) => movie.programID === programID
			);

			if (index > -1) {
				favouriteMovies.splice(index, 1);
				await updateDoc(userRef, {
					favouriteMovies: favouriteMovies,
				});
			} else {
				const updatedFavouriteMovies = [newFavourite, ...favouriteMovies];
				await updateDoc(userRef, {
					favouriteMovies: updatedFavouriteMovies,
				});
			}

			setIsProcessing(false);
		}
	};

	return (
		<div className={styles.addRemoveBox} onClick={handleToggleFavourite}>
			<p className={styles.addRemove}>
				<FontAwesomeIcon
					icon={isFavourite ? faCheck : faPlus}
					style={{ color: 'var(--color-textOnColor)' }}
				/>
			</p>
		</div>
	);
};

export default AddRemove;
