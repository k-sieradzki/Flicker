import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProgramID } from '../../services/redux/reducers/reducer';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from 'swiper';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn';
import AddRemove from '../AddRemove/AddRemove';
import { RootState } from '../../services/redux/store';
import { ProgramInt } from '../../types/types';
import { HeaderProps } from '../../types/types';
import { useFetchMovies } from '../../utils/Hooks/useFetchMovies';
import styles from './header.module.scss';

import { cutOverview } from '../../utils/Helpers/cutOverview';

const Header: React.FC<HeaderProps> = ({ fetchURL }) => {
	const dispatch = useDispatch();
	const getProgramType = useSelector(
		(state: RootState) => state.app.programType
	);
	const { programs, loading } = useFetchMovies(fetchURL);

	return (
		<div className={styles.headerMainContainer}>
			<>
				<Swiper
					spaceBetween={0}
					centeredSlides={true}
					autoplay={{
						delay: 5000,
						disableOnInteraction: false,
					}}
					pagination={{
						clickable: true,
					}}
					modules={[Autoplay, Pagination]}
					className={styles.mySwiper}
				>
					{programs.slice(0, 10).map((item: ProgramInt, index: number) => (
						<SwiperSlide className={styles.swiperSlide} key={index}>
							{loading ? (
								<div className={styles.imgLoadingBox}>
									<Loading />
								</div>
							) : (
								<>
									<div className={styles.imgBox}>
										<img
											src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
											alt='backdrop'
										/>
									</div>

									<div className={styles.infoBox}>
										<div className={styles.textBox}>
											<h2 className={styles.movieTitle}>
												{item.title || item.name}
											</h2>
											<p>{cutOverview(item.overview)}</p>
										</div>

										<div className={styles.btnsBox}>
											<Link to={`/program/${getProgramType}/${item.id}`}>
												{' '}
												<PrimaryBtn
													name={'More Info'}
													onClick={() => {
														dispatch(
															setProgramID({
																id: item.id,
																type: getProgramType,
															})
														);
													}}
												/>{' '}
											</Link>

											<AddRemove
												programID={item.id}
												programBackdrop={item.backdrop_path}
												programPoster={item.poster_path}
												programTitle={item.title || item.name}
												mediaType={getProgramType}
											/>
										</div>
									</div>
								</>
							)}
						</SwiperSlide>
					))}
				</Swiper>
			</>
		</div>
	);
};

export default Header;
