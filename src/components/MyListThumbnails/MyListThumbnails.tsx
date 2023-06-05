import React from 'react';
import { useDispatch } from 'react-redux';
import { setProgramID } from '../../services/redux/reducers/reducer';
import { Link } from 'react-router-dom';
import { poster_placeholder } from '../../assets/images/images';
import AddRemove from '../../components/AddRemove/AddRemove';
import { favMovie } from '../../types/types';
import styles from './myListThumbnails.module.scss';

interface ThumbnailItemProps {
	item: favMovie;
}

const MyListThumbnails: React.FC<ThumbnailItemProps> = ({ item }) => {
	const dispatch = useDispatch();

	return (
		<div className={styles.thumbItem}>
			<div className={styles.thumbnail}>
				<Link to={`/program/${item.mediaType}/${item.programID}`}>
					<img
						src={
							item.programPoster !== null
								? `https://image.tmdb.org/t/p/w342/${item.programPoster}`
								: poster_placeholder
						}
						alt='program'
						onClick={() => {
							dispatch(
								setProgramID({ id: item.programID, type: item.mediaType })
							);
						}}
					/>
				</Link>
			</div>
			<div className={styles.listBtn}>
				<AddRemove
					programID={item.programID}
					programBackdrop={item.programBackdrop}
					programPoster={item.programPoster}
					programTitle={item.programTitle}
					mediaType={item.mediaType}
				/>
			</div>
			<div className={styles.titleBox}>
				<p className={styles.thumbTitle}>{item.programTitle}</p>
			</div>
		</div>
	);
};

export default MyListThumbnails;
