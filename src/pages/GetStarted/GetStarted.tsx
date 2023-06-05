import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainBtn from '../../components/MainBtn/MainBtn';
import { auth } from '../../services/firebase/firebase';
import styles from './getStarted.module.scss';

const GetStarted: React.FC = () => {
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				setIsLogged(true);
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<div className={styles.getStatedContainer}>
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<p className={styles.bigText}>Welcome to Flicker</p>
					<p className={styles.commonText}>
						The best movie/TV series tracking app to make your days great again{' '}
					</p>
					<div className={styles.btnBox}>
						{isLogged ? (
							<Link to={'/home'}>
								<MainBtn name={'Get started'} />
							</Link>
						) : (
							<Link to={'/login'}>
								<MainBtn name={'Get started'} />
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default GetStarted;
