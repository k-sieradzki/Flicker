import React, { useState, useEffect } from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Topbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ThumbnailsComp from '../../components/ThumbnailsComp/ThumbnailsComp';
import FilterList from '../../components/FilterList/FilterList';
import NotFoundInfo from '../../components/NotFoundInfo/NotFoundInfo';
import SearchbyTitleInput from '../../components/SearchbyTitleInput/SearchbyTitleInput';
import styles from './search.module.scss';
import useSearchFetch from '../../utils/Hooks/useSearchFetch';

const Explore: React.FC = () => {
	const [page, setPage] = useState<number>(1);
	const [searchTitle, setSearchTitle] = useState<string>('');
	const [programType, setProgramType] = useState<string>('movie');
	const { loading, noMatches, programs, moviesNumber, tvNumber } =
		useSearchFetch(searchTitle, programType, setProgramType, page, setPage);

	useEffect(() => {
		return () => {
			if (programs.length === 0) {
				setPage(1);
			}
		};
	}, [programs, page]);

	const handlePageChange = (value: number) => {
		setPage(value);
		window.scrollTo(0, 0);
	};

	const handleSearchTitleChange = (value: string) => {
		if (searchTitle !== '' && value === '') {
			setPage(1);
		}
		setSearchTitle(value);
	};

	return (
		<>
			<div className={styles.exploreMainContainer}>
				<div className={styles.container}>
					<Topbar />
					<SearchbyTitleInput
						searchTitle={searchTitle}
						setSearchTitle={handleSearchTitleChange}
					/>

					{noMatches ? (
						<NotFoundInfo />
					) : (
						<>
							<FilterList
								moviesNumber={moviesNumber}
								tvNumber={tvNumber}
								programType={programType}
								setProgramType={setProgramType}
								setPage={setPage}
							/>
							<ThumbnailsComp
								programs={programs}
								isLoading={loading}
								program={programType}
							/>

							{moviesNumber > 0 || tvNumber > 0 ? (
								<div className={styles.paginationBox}>
									<Pagination
										className={styles.pagination}
										current={page}
										pageSize={20}
										total={programType === 'movie' ? moviesNumber : tvNumber}
										onChange={handlePageChange}
									/>
								</div>
							) : null}
						</>
					)}

					<Footer />
				</div>
			</div>
		</>
	);
};

export default Explore;
