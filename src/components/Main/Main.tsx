import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Shuffle from '../Shuffle/Shuffle';
import ProgramsCarousel from '../../components/ProgramsCarousel/ProgramsCarousel';
import useRequestGenres from '../../utils/Hooks/useRequestGenres';
import useImportantURLs from '../../utils/Hooks/useImportantURLs';
import { RootState } from '../../services/redux/store';
import { RequestGenresInt } from '../../types/types';

const Main: React.FC = () => {
	const [isReady, setIsReady] = useState<boolean>(false);
	const prodType = useSelector((state: RootState) => state.app.programType);
	const requestGenres = useRequestGenres();

	const { requestPopular, requestTrendingDay, requestTrendingWeek } =
		useImportantURLs();
	useEffect(() => {
		setIsReady(true);

		return () => {
			setIsReady(false);
		};
	}, []);

	return (
		<>
			<ProgramsCarousel
				title={`What's Popular`}
				fetchURL={requestPopular}
				genre={`requestPopular`}
			/>
			<ProgramsCarousel
				title={'Trending Day'}
				fetchURL={requestTrendingDay}
				genre={`requestTrendingDay`}
			/>
			<ProgramsCarousel
				title={'Trending This Week'}
				fetchURL={requestTrendingWeek}
				bigSize={true}
				genre={`requestTrendingWeek`}
			/>
			<Shuffle program={prodType} />

			{isReady && requestGenres.length !== 0
				? requestGenres.map((key: RequestGenresInt, index: number) => (
						<ProgramsCarousel
							title={key.name}
							fetchURL={key.link}
							key={index}
							genre={key.genreId}
						/>
				  ))
				: null}
		</>
	);
};

export default Main;

// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import Shuffle from '../Shuffle/Shuffle';
// import ProgramsCarousel from '../../components/ProgramsCarousel/ProgramsCarousel';
// import useRequestGenres from '../../utils/Hooks/useRequestGenres';
// import useImportantURLs from '../../utils/Hooks/useImportantURLs';
// import { RootState } from '../../services/redux/store';
// import { RequestGenresInt } from '../../types/types';

// const Main: React.FC = () => {
// 	const [isReady, setIsReady] = useState<boolean>(false);
// 	const prodType = useSelector((state: RootState) => state.app.programType);

// 	const {tvGenres, movieGenres} = useRequestGenres();
// 	const [requestGenres, setRequestGenres] = useState(Object);

// 	useEffect(() => {
// 		setRequestGenres(prodType === 'movie' ? movieGenres : tvGenres)
// 	}, [tvGenres, movieGenres])

// 	const { requestPopular, requestTrendingDay, requestTrendingWeek } =
// 		useImportantURLs();
// 	useEffect(() => {
// 		setIsReady(true);

// 		return () => {
// 			setIsReady(false);
// 		};
// 	}, []);

// 	return (
// 		<>
// 			<ProgramsCarousel
// 				title={`What's Popular`}
// 				fetchURL={requestPopular}
// 				genre={`requestPopular`}
// 			/>
// 			<ProgramsCarousel
// 				title={'Trending Day'}
// 				fetchURL={requestTrendingDay}
// 				genre={`requestTrendingDay`}
// 			/>
// 			<ProgramsCarousel
// 				title={'Trending This Week'}
// 				fetchURL={requestTrendingWeek}
// 				bigSize={true}
// 				genre={`requestTrendingWeek`}
// 			/>
// 			<Shuffle program={prodType} />

// 			{isReady && requestGenres.length !== 0
// 				? requestGenres.map((key: RequestGenresInt, index: number) => (
// 						<ProgramsCarousel
// 							title={key.name}
// 							fetchURL={key.link}
// 							key={index}
// 							genre={key.genreId}
// 						/>
// 				  ))
// 				: null}
// 		</>
// 	);
// };

// export default Main;

// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import Shuffle from '../Shuffle/Shuffle';
// import ProgramsCarousel from '../../components/ProgramsCarousel/ProgramsCarousel';
// import useRequestGenres from '../../utils/Hooks/useRequestGenres';
// import useImportantURLs from '../../utils/Hooks/useImportantURLs';
// import { RootState } from '../../services/redux/store';
// import { RequestGenresInt } from '../../types/types';

// const Main: React.FC = () => {
// 	const [isReady, setIsReady] = useState<boolean>(false);
// 	const prodType = useSelector((state: RootState) => state.app.programType);
// 	const requestGenres = useRequestGenres();

// 	const { requestPopular, requestTrendingDay, requestTrendingWeek } =
// 		useImportantURLs();
// 	useEffect(() => {
// 		setIsReady(true);

// 		return () => {
// 			setIsReady(false);
// 		};
// 	}, []);

// 	return (
// 		<>
// 			<ProgramsCarousel
// 				title={`What's Popular`}
// 				fetchURL={requestPopular}
// 				genre={`requestPopular`}
// 			/>
// 			<ProgramsCarousel
// 				title={'Trending Day'}
// 				fetchURL={requestTrendingDay}
// 				genre={`requestTrendingDay`}
// 			/>
// 			<ProgramsCarousel
// 				title={'Trending This Week'}
// 				fetchURL={requestTrendingWeek}
// 				bigSize={true}
// 				genre={`requestTrendingWeek`}
// 			/>
// 			<Shuffle program={prodType} />

// 			{isReady && requestGenres.length !== 0
// 				? requestGenres.map((key: RequestGenresInt, index: number) => (
// 						<ProgramsCarousel
// 							title={key.name}
// 							fetchURL={key.link}
// 							key={index}
// 							genre={key.genreId}
// 						/>
// 				  ))
// 				: null}
// 		</>
// 	);
// };

// export default Main;
