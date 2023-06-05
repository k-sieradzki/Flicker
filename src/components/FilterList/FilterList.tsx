import React from 'react';
import { FilterListProps } from '../../types/types';
import styles from './filterList.module.scss';

const FilterList: React.FC<FilterListProps> = ({
	moviesNumber,
	tvNumber,
	programType,
	setProgramType,
	setPage,
}) => {
	const handleFilterChange = (programType: string) => {
		setProgramType(programType);
		setPage(1);
	};

	return (
		<div className={styles.filterList}>
			{moviesNumber !== 0 && (
				<label
					className={`${programType === 'movie' ? styles.activeFilter : ''}`}
				>
					<input
						type='radio'
						name='programType'
						value='movie'
						checked={programType === 'movie'}
						onChange={() => handleFilterChange('movie')}
					/>
					Movies <span>{moviesNumber}</span>
				</label>
			)}

			{tvNumber !== 0 && (
				<label className={`${programType === 'tv' ? styles.activeFilter : ''}`}>
					<input
						type='radio'
						name='programType'
						value='tv'
						checked={programType === 'tv'}
						onChange={() => handleFilterChange('tv')}
					/>
					TV Shows <span>{tvNumber}</span>
				</label>
			)}
		</div>
	);
};
export default FilterList;
