import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { convertTime } from '../Helpers/convertTime';
import { getCircleRateColor } from '../Helpers/getCircleRateColor';
import { getTrailer } from '../Helpers/getTrailer';
import { setProgramID } from '../../services/redux/reducers/reducer';

const API_KEY = process.env.REACT_APP_API_KEY;

export function useFetchProgram() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [convertedTime, setConvertedTime] = useState<string>('');
	const [rateColor, setRateColor] = useState<string>('');
	const [production, setProduction] = useState(Object);
	const [fullyLoad, setFullyLoad] = useState<boolean>(false);
	const [trailer, setTrailer] = useState<string>('');

	useEffect(() => {
		setFullyLoad(false);

		const fetchMovie = async (program: string, id: string) => {
			try {
				const response = await fetch(
					`https://api.themoviedb.org/3/${program}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits,recommendations`
				);
				const data = await response.json();
				setProduction(data);

				setRateColor(getCircleRateColor(data.vote_average));
				program === 'movie'
					? setConvertedTime(convertTime(data.runtime))
					: setConvertedTime(convertTime(data.episode_run_time[0]));
				setTrailer(getTrailer(data.videos));
				setFullyLoad(true);
			} catch (error) {
				console.error('Error fetching movie:', error);
			}
		};

		const pathSegments = window.location.pathname.split('/');
		const newProgram = pathSegments[2];
		const newID = pathSegments[3];

		if (newProgram && newID) {
			dispatch(setProgramID({ id: parseInt(newID), type: newProgram }));
			fetchMovie(newProgram, newID).catch(error => {
				console.error('Error fetching data:', error);
			});
			navigate(`/program/${newProgram}/${newID}`);
		}

		return () => {
			setFullyLoad(false);
		};
	}, [navigate, dispatch, setFullyLoad]);

	return { convertedTime, rateColor, production, fullyLoad, trailer };
}
