import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../services/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const useProfileData = () => {
	const [profileData, setProfileData] = useState<Object>();
	useEffect(() => {
		return onAuthStateChanged(auth, user => {
			if (user) {
				const userId = user.uid;
				if (userId) {
					const userRef = doc(db, 'Users', userId);
					const unsubscribe = onSnapshot(
						userRef,
						docSnapshot => {
							if (docSnapshot.exists()) {
								const data = docSnapshot.data();
								setProfileData(data);
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
	}, []);

	return profileData;
};

export default useProfileData;
