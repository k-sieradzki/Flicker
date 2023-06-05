import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchbyTitleInputProps } from '../../types/types';
import styles from './searchbyTitleInput.module.scss';

const SearchbyTitleInput: React.FC<SearchbyTitleInputProps> = ({
	searchTitle,
	setSearchTitle,
}) => {
	const [inputValue, setInputValue] = useState(searchTitle);
	const [debouncedValue, setDebouncedValue] = useState(searchTitle);

	useEffect(() => {
		const debounceSearch = setTimeout(() => {
			setSearchTitle(debouncedValue);
		}, 400);

		return () => {
			clearTimeout(debounceSearch);
		};
	}, [debouncedValue, setSearchTitle]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	useEffect(() => {
		const debounceInput = setTimeout(() => {
			setDebouncedValue(inputValue);
		}, 400);

		return () => {
			clearTimeout(debounceInput);
		};
	}, [inputValue]);

	return (
		<div className={styles.exploreTop}>
			<div className={styles.searchBoxDiv}>
				<form className={styles.searchboxMainContainer}>
					<input
						type='text'
						placeholder='What are you looking for?'
						className={styles.searchBoxInput}
						value={inputValue}
						onChange={handleSearchChange}
					/>
					<span className={styles.searchIcon}>
						<FontAwesomeIcon icon={faSearch} />
					</span>
				</form>
			</div>
		</div>
	);
};

export default SearchbyTitleInput;
