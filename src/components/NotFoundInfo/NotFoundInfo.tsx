import React from 'react';
import { search_error } from '../../assets/images/images';
import styles from './notFoundInfo.module.scss';

interface NotFoundProps {
	filterList?: string;
}

const NotFoundInfo: React.FC<NotFoundProps> = ({ filterList }) => {
	const getNoResultName = (filterList: string): string => {
		switch (filterList) {
			case 'movie':
				return 'movies';
			case 'tv':
				return 'TV shows';
			default:
				return 'content';
		}
	};

	const renderMessage = () => {
		if (filterList) {
			return (
				<p>
					Sorry, You haven't added {getNoResultName(filterList)} to your
					watchlist.
				</p>
			);
		} else {
			return (
				<p>
					Sorry, the keyword you entered could not be found. Try to check again
					or search with another keyword.
				</p>
			);
		}
	};

	return (
		<div className={styles.notFound}>
			<div className={styles.errorImg}>
				<img
					className={styles.searchError}
					src={search_error}
					alt='search error'
				/>
			</div>
			<div className={styles.textBox}>
				<h2>Not Found</h2>
				{renderMessage()}
			</div>
		</div>
	);
};

export default NotFoundInfo;
