import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper';
import { default_person } from '../../assets/images/images';
import { Credits, Cast } from '../../types/types';
import styles from './castComponent.module.scss';

const CastComponent: React.FC<Credits> = ({ team }) => {
	const actor = team.cast.slice(0, 10);

	return (
		<div className={styles.castMainContainer}>
			<h3>Top Cast</h3>
			<Swiper
				slidesPerView='auto'
				spaceBetween={-5}
				freeMode={true}
				pagination={false}
				modules={[FreeMode, Pagination]}
				className={styles.mySwiper}
			>
				{actor.map((item: Cast, key: number) => (
					<SwiperSlide className={styles.swiperSlide} key={key}>
						<div className={styles.card}>
							<img
								src={
									item.profile_path !== null
										? `https://image.tmdb.org/t/p/original/${item.profile_path}`
										: default_person
								}
								alt='actor'
							/>
						</div>
						<div className={styles.personInfo}>
							<h4>{item.name}</h4>
							<p>{item.character}</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default CastComponent;
