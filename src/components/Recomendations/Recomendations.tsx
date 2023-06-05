import React from 'react';
import { useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper';
import { Link } from 'react-router-dom';
import AddRemove from '../AddRemove/AddRemove';
import { setProgramID } from '../../services/redux/reducers/reducer';
import { Movie, RecomendationsProps, Programs } from '../../types/types';
import styles from './recomendations.module.scss';

const Recomendations: React.FC<RecomendationsProps> = ({
	title,
	data,
	parentType,
}) => {
	const dispatch = useDispatch();

	return (
		<div className={styles.scrollMainContainer}>
			<div className={styles.carouselTitle}>
				<h3>{title}</h3>
			</div>
			<Swiper
				slidesPerView='auto'
				spaceBetween={-5}
				freeMode={true}
				pagination={false}
				modules={[FreeMode, Pagination]}
				className={styles.mySwiper}
			>
				{data
					.filter((item: Movie) => item.poster_path !== null)
					.map((item: Programs, index: number) => (
						<SwiperSlide className={styles.swiperSlide} key={index}>
							<div className={styles.card}>
								<Link to={`/program/${parentType}/${item.id}`}>
									<img
										src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
										alt='program poster'
										onClick={() => {
											window.scrollTo(0, 0);
											dispatch(
												setProgramID({
													id: item.id,
													type: parentType,
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
										mediaType={parentType}
									/>
								</div>
							</div>
						</SwiperSlide>
					))}
			</Swiper>
		</div>
	);
};

export default Recomendations;
