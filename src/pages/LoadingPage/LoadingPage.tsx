import React from 'react';
import Loading from '../../components/Loading/Loading';
import { flicker_logo } from '../../assets/images/images';
import styles from './loadingPage.module.scss';

const LoadingPage: React.FC = () => {
	return (
		<div className={styles.loadingPageContainer}>
			<img src={flicker_logo} alt='flicker logo' />
			<div className={styles.loadingCircle}>
				<Loading />
			</div>
		</div>
	);
};

export default LoadingPage;
