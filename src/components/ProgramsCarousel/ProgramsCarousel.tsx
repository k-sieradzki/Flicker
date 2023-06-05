import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Loading from '../Loading/Loading';
import AddRemove from '../AddRemove/AddRemove';
import { poster_placeholder } from '../../assets/images/images';
import {
	setFullList,
	setProgramID,
} from '../../services/redux/reducers/reducer';
import { RootState } from '../../services/redux/store';
import { ProgramInt, ProgramsCarouselProps } from '../../types/types';
import { useFetchMovies } from '../../utils/Hooks/useFetchMovies';
import styles from './programsCarousel.module.scss';

const ProgramsCarousel: React.FC<ProgramsCarouselProps> = ({
	title,
	fetchURL,
	bigSize,
	genre,
}) => {
	const dispatch = useDispatch();
	const getProgramType = useSelector(
		(state: RootState) => state.app.programType
	);
	const { programs, loading } = useFetchMovies(fetchURL);

	return (
		<div className={styles.scrollMainContainer}>
			<div className={styles.carouselTitle}>
				<Link
					to={`/fulllist/${getProgramType}/?genreId=${genre}&page=1`}
					onClick={() => {
						dispatch(
							setFullList({
								name: title,
								url: fetchURL,
								program: getProgramType,
							})
						);
					}}
				>
					{' '}
					<h3>
						{title}
						<FontAwesomeIcon icon={faChevronRight} className={styles.icon} />
					</h3>
				</Link>
			</div>
			<Swiper
				slidesPerView='auto'
				spaceBetween={-5}
				freeMode={true}
				pagination={false}
				modules={[FreeMode, Pagination]}
				className={`${bigSize ? styles.mySwiperBig : styles.mySwiper} `}
			>
				{programs
					.filter(item => item.poster_path !== null)
					.map((item: ProgramInt) => (
						<SwiperSlide
							className={`${
								bigSize ? styles.swiperSlideBig : styles.swiperSlide
							} `}
							key={item.id}
						>
							{loading ? (
								<div className={styles.loadingBox}>
									<Loading />
								</div>
							) : (
								<div className={`${bigSize ? styles.cardBig : styles.card} `}>
									<Link to={`/program/${getProgramType}/${item.id}`}>
										<img
											src={
												item.poster_path !== null
													? `https://image.tmdb.org/t/p/${
															bigSize ? 'w500' : 'w500'
													  }/${item.poster_path}`
													: poster_placeholder
											}
											alt=''
											onClick={() => {
												dispatch(
													setProgramID({
														id: item.id,
														type: getProgramType,
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
											mediaType={getProgramType}
										/>
									</div>
								</div>
							)}
						</SwiperSlide>
					))}
			</Swiper>
		</div>
	);
};

export default ProgramsCarousel;
