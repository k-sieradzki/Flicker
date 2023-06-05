import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setProgramID } from '../../services/redux/reducers/reducer';
import Loading from '../Loading/Loading';
import AddRemove from '../AddRemove/AddRemove';
import { poster_placeholder } from '../../assets/images/images';
import { ProgramInt, ThumbnailsCompProps } from '../../types/types';
import styles from './thumbnailsComp.module.scss';

const ThumbnailsComp: React.FC<ThumbnailsCompProps> = ({
	programs,
	isLoading,
	program,
}) => {
	const dispatch = useDispatch();

	return (
		<div className={styles.thumbnailsBox}>
			{programs.map((item: ProgramInt) => (
				<div className={styles.thumbItem} key={item.id}>
					{isLoading ? (
						<div className={styles.loadingBox}>
							<Loading />
						</div>
					) : (
						<>
							<div className={styles.thumbnail}>
								<Link to={`/program/${program}/${item.id}`}>
									<img
										src={
											item.poster_path !== null
												? `https://image.tmdb.org/t/p/w342/${item.poster_path}`
												: poster_placeholder
										}
										alt='program poster'
										onClick={() => {
											dispatch(
												setProgramID({
													id: item.id,
													type: program,
												})
											);
										}}
									/>
								</Link>
								<p className={styles.movieScore}>
									{item.vote_average.toFixed(1)}
								</p>
								<div className={styles.listBtn}>
									<AddRemove
										programID={item.id}
										programBackdrop={item.backdrop_path}
										programPoster={item.poster_path}
										programTitle={item.title || item.name}
										mediaType={program}
									/>
								</div>
							</div>
							<div className={styles.titleBox}>
								<p className={styles.thumbTitle}>{item.title || item.name}</p>
							</div>
						</>
					)}
				</div>
			))}
		</div>
	);
};

export default ThumbnailsComp;
