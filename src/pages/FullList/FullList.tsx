import React from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ThumbnailsComp from '../../components/ThumbnailsComp/ThumbnailsComp';
import useFullListFetch from '../../utils/Hooks/useFullListFetch';
import styles from './fullList.module.scss';

const FullList: React.FC = () => {
	const {
		programs,
		loading,
		page,
		totalResults,
		genreName,
		pType,
		handlePageChange,
	} = useFullListFetch();

	return (
		<>
			<Navbar />
			<div className={styles.fullListMainContainer}>
				<div className={styles.thumbnailsContainer}>
					<h2 className={styles.fullListTitle}>{genreName}</h2>
					<ThumbnailsComp
						programs={programs}
						isLoading={loading}
						program={pType}
					/>
					<div className={styles.paginationBox}>
						<Pagination
							className={styles.pagination}
							current={page}
							pageSize={20}
							total={totalResults}
							onChange={handlePageChange}
						/>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default FullList;
