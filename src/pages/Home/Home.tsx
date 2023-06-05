import React from 'react';
import Header from '../../components/Header/Header';
import CarouselMyList from '../../components/CarouselMyList/CarouselMyList';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import useImportantURLs from '../../utils/Hooks/useImportantURLs';
import Main from '../../components/Main/Main';
import useFavouriteMoviesFromFirebase from '../../utils/Hooks/useFavouriteMoviesFromFirebase ';
import useProfileData from '../../utils/Hooks/useProfileData';
import styles from './home.module.scss';

const Home: React.FC = () => {
	const getFavouritesMovies = useFavouriteMoviesFromFirebase();
	const importantURLs = useImportantURLs();
	const profileData = useProfileData();

	return (
		<div className={styles.homeMainContainer}>
			<Navbar />
			<Header fetchURL={importantURLs.requestTrendingDay} />
			{getFavouritesMovies.length !== 0 ? (
				<CarouselMyList title={'My List'} />
			) : null}
			{profileData !== undefined ? <Main /> : null}
			<Footer />
		</div>
	);
};

export default Home;
