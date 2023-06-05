import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import MyListFilters from '../../components/MyListFilters/MyListFilters';
import NotFoundInfo from '../../components/NotFoundInfo/NotFoundInfo';
import MyListThumbnails from '../../components/MyListThumbnails/MyListThumbnails';
import useFavouriteMoviesFromFirebase from '../../utils/Hooks/useFavouriteMoviesFromFirebase ';
import { favMovie } from '../../types/types';
import styles from './mylist.module.scss';

const MyList: React.FC = () => {
	const getFavouritesMovies = useFavouriteMoviesFromFirebase();
	const [filterList, setFilterList] = useState<string>('');

	return (
		<div className={styles.myListMainContainer}>
			<Navbar />
			<MyListFilters
				selectedFilter={filterList}
				onFilterChange={setFilterList}
			/>

			<div className={styles.thumbnailsBox}>
				{getFavouritesMovies
					.filter(
						(item: favMovie) => !filterList || item.mediaType === filterList
					)
					.map((item: favMovie, index: number) => (
						<MyListThumbnails item={item} key={index} />
					))}
			</div>

			{getFavouritesMovies.filter(
				(item: favMovie) => !filterList || item.mediaType === filterList
			).length === 0 && <NotFoundInfo filterList={filterList} />}

			<Footer />
		</div>
	);
};

export default MyList;
