import React from 'react';
import { useSelector } from 'react-redux';
import { backdrop_placeholder } from '../../assets/images/images';
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn';
import AddRemove from '../AddRemove/AddRemove';
import { Movie } from '../../types/types';
import { RootState } from '../../services/redux/store';
import styles from './programDescription.module.scss';

interface ProgramComponentProps {
	production: Movie;
	rateColor: string;
	convertTime: string;
	handleModal: () => void;
}
const ProgramDescription: React.FC<ProgramComponentProps> = ({
	production,
	rateColor,
	convertTime,
	handleModal,
}) => {
	const getProgramID = useSelector((state: RootState) => state.app.programID);
	return (
		<div className={styles.container}>
			<div className={styles.programHead}>
				<img
					className={styles.headImage}
					src={
						production.backdrop_path !== null
							? `https://image.tmdb.org/t/p/w1280/${production.backdrop_path}`
							: backdrop_placeholder
					}
					alt=''
				/>
			</div>

			<div className={styles.programBody}>
				<h1 className={styles.programTitle}>
					{production.title || production.original_name}
				</h1>
				<div className={styles.programShortInfo}>
					<div className={styles.singlechart}>
						<svg
							viewBox='0 0 36 36'
							className={`${styles.circularchart} ${styles[rateColor]}`}
						>
							<path
								className={styles.circlebg}
								d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
							/>
							<path
								className={styles.circle}
								strokeDasharray={`${Math.round(
									production.vote_average * 10
								)}, 100`}
								d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
							/>
							<text x='18' y='20.35' className={styles.percentage}>
								{Math.round(production.vote_average * 10)}%
							</text>
						</svg>
					</div>
					<div className={styles.programRuntime}>{convertTime}</div>
					<div className={styles.programReleaseDate}>
						{production.release_date || production.first_air_date}
					</div>
				</div>
				<div className={styles.programGenres}>
					Genre:
					<span>
						{' '}
						{production.genres.map((key: any, index: any) =>
							index ? `, ${key.name}` : key.name
						)}{' '}
					</span>
				</div>

				<p className={styles.programDesc}>{production.overview} </p>

				<div className={styles.programButtons}>
					<PrimaryBtn name={'Play Trailer'} onClick={handleModal} />
					<AddRemove
						programID={production.id}
						programBackdrop={production.backdrop_path}
						programPoster={production.poster_path}
						programTitle={production.title || production.name}
						mediaType={getProgramID.type}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProgramDescription;
