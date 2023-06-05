import React from 'react';
import styles from './myListFilters.module.scss';

interface FilterListProps {
	selectedFilter: string;
	onFilterChange: (filter: string) => void;
}

const MyListFilters: React.FC<FilterListProps> = ({
	selectedFilter,
	onFilterChange,
}) => {
	return (
		<div className={styles.popularFilters}>
			<div
				className={`${styles.filter} ${
					selectedFilter === '' ? styles.active : ''
				}`}
				onClick={() => onFilterChange('')}
			>
				All
			</div>
			<div
				className={`${styles.filter} ${
					selectedFilter === 'movie' ? styles.active : ''
				}`}
				onClick={() => onFilterChange('movie')}
			>
				Movies
			</div>
			<div
				className={`${styles.filter} ${
					selectedFilter === 'tv' ? styles.active : ''
				}`}
				onClick={() => onFilterChange('tv')}
			>
				TV Shows
			</div>
		</div>
	);
};

export default MyListFilters;
