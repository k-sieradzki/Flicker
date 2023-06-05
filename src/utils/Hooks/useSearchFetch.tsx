import { useState, useEffect } from 'react';
import { Movie } from '../../types/types';

const API_KEY = process.env.REACT_APP_API_KEY;
const apiLink = 'https://api.themoviedb.org/3';

const useSearchFetch = (
	searchTitle: string,
	programType: string,
	setProgramType: (type: string) => void,
	page: number,
	setPage: (page: number) => void
) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [noMatches, setNoMatches] = useState<boolean>(false);
	const [programs, setPrograms] = useState<Movie[]>([]);
	const [moviesNumber, setMoviesNumber] = useState<number>(0);
	const [tvNumber, setTvNumber] = useState<number>(0);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			let url = '';

			if (searchTitle === '') {
				setNoMatches(false);
				url = `${apiLink}/trending/${programType}/week?api_key=${API_KEY}&language=en-US&page=${page}`;
			} else {
				const movieEndpoint = `${apiLink}/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTitle}&page=${page}&include_adult=false&`;
				const tvEndpoint = `${apiLink}/search/tv?api_key=${API_KEY}&language=en-US&query=${searchTitle}&page=${page}&include_adult=false&`;

				const [movieResponse, tvResponse] = await Promise.all([
					fetch(movieEndpoint),
					fetch(tvEndpoint),
				]);
				const [movieResult, tvResult] = await Promise.all([
					movieResponse.json(),
					tvResponse.json(),
				]);

				setMoviesNumber(movieResult.total_results);
				setTvNumber(tvResult.total_results);
				setNoMatches(
					movieResult.total_results === 0 && tvResult.total_results === 0
				);

				if (movieResult.total_results === 0) {
					setPrograms(tvResult.results);
					setProgramType('tv');
				} else if (tvResult.total_results === 0) {
					setPrograms(movieResult.results);
					setProgramType('movie');
				} else {
					setPrograms(
						programType === 'movie' ? movieResult.results : tvResult.results
					);
				}
			}

			if (url !== '') {
				const response = await fetch(url);
				const data = await response.json();
				setPrograms(data.results);
				setMoviesNumber(data.total_results);
				setTvNumber(data.total_results);
			}

			setLoading(false);
		};

		fetchData().catch(error => {
			console.error('Error fetching data:', error);
			setLoading(false);
		});
	}, [searchTitle, programType, setProgramType, page, setPage]);

	useEffect(() => {
		return () => {
			if (searchTitle !== '') {
				setPage(1);
			}
		};
	}, [searchTitle, setPage, programType]);

	return { loading, noMatches, programs, moviesNumber, tvNumber };
};

export default useSearchFetch;
