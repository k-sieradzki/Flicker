import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProgramID } from '../../services/redux/reducers/reducer';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { poster_placeholder } from '../../assets/images/images';
import AddRemove from '../AddRemove/AddRemove';
import { Link } from 'react-router-dom';
import useFavouriteMoviesFromFirebase from '../../utils/Hooks/useFavouriteMoviesFromFirebase ';
import { favMovie, CarouselWidthProps } from '../../types/types';
import styles from './carouselMyList.module.scss';

const CarouselMyList: React.FC<CarouselWidthProps> = ({ title }) => {
	const dispatch = useDispatch();
	const getFavouritesMovies = useFavouriteMoviesFromFirebase();
	const maxMovies = 20;
	const [showViewMoreSlide, setShowViewMoreSlide] = useState<boolean>(false);
	const displayedMovies = getFavouritesMovies.slice(0, maxMovies);

	useEffect(() => {
		if (getFavouritesMovies.length > maxMovies) {
			setShowViewMoreSlide(true);
		}
		return () => {
			setShowViewMoreSlide(false);
		};
	}, [getFavouritesMovies]);

	return (
		<div className={styles.scrollMainContainer}>
			<div className={styles.carouselTitle}>
				<Link to={'/mylist'}>
					<h3>
						{title}
						<FontAwesomeIcon
							icon={faChevronRight}
							className={styles.icon}
						/>{' '}
					</h3>
				</Link>
			</div>
			<Swiper
				slidesPerView='auto'
				spaceBetween={-5}
				freeMode={true}
				pagination={false}
				modules={[FreeMode, Pagination]}
				className={styles.mySwiper}
			>
				{displayedMovies.map((item: favMovie) => (
					<SwiperSlide className={styles.swiperSlide} key={item.programID}>
						<div className={styles.card}>
							<Link to={`/program/${item.mediaType}/${item.programID}`}>
								<img
									src={
										item.programBackdrop !== null
											? `https://image.tmdb.org/t/p/w500/${item.programBackdrop}`
											: poster_placeholder
									}
									alt='movie poster'
									onClick={() => {
										dispatch(
											setProgramID({
												id: item.programID,
												type: item.mediaType,
											})
										);
									}}
								/>
							</Link>
							<div className={styles.listBtn}>
								<AddRemove
									programID={item.programID}
									programBackdrop={item.programBackdrop}
									programPoster={item.programPoster}
									programTitle={item.programTitle}
									mediaType={item.mediaType}
								/>
							</div>
						</div>
						<p className={styles.cardTitle}>{item.programTitle}</p>
					</SwiperSlide>
				))}
				{showViewMoreSlide && (
					<SwiperSlide className={styles.swiperSlide}>
						<div className={styles.viewMoreCard}>
							<Link to={'/mylist'}>
								<p className={styles.viewMoreText}>View more</p>
							</Link>
						</div>
					</SwiperSlide>
				)}
			</Swiper>
		</div>
	);
};

export default CarouselMyList;
