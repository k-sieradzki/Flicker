import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../services/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { favMovie } from '../../types/types';

const useFavouriteMoviesFromFirebase = () => {
	const [favouriteMovies, setFavouriteMovies] = useState<favMovie[]>([]);

	useEffect(() => {
		const unsubscribeAuth = onAuthStateChanged(auth, user => {
			if (user) {
				const userId = user.uid;
				if (userId) {
					const userRef = doc(db, 'Users', userId);
					const unsubscribe = onSnapshot(
						userRef,
						docSnapshot => {
							if (docSnapshot.exists()) {
								const data = docSnapshot.data();
								setFavouriteMovies(data.favouriteMovies);
							}
						},
						err => {
							console.log('err.message', err.message);
						}
					);

					return () => {
						unsubscribe();
					};
				}
			}
		});

		return () => {
			unsubscribeAuth();
		};
	}, []);

	return favouriteMovies;
};

export default useFavouriteMoviesFromFirebase;
