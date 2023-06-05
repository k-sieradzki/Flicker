import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ProgramInt } from '../../types/types';
import useImportantURLs from './useImportantURLs';
import useRequestGenres from './useRequestGenres';

import { useDispatch } from 'react-redux';
import { setProgramType } from '../../services/redux/reducers/reducer';

const API_KEY = process.env.REACT_APP_API_KEY;

const useFullListFetch = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const requestGenres = useRequestGenres();
	const importantURLs = useImportantURLs();
	const [programs, setPrograms] = useState<ProgramInt[]>([]);
	const [page, setPage] = useState<number>(1);
	const [totalResults, setTotalResults] = useState<number>();
	const [loading, setLoading] = useState<boolean>(true);
	const [genre, setGenre] = useState<string>();
	const [genreName, setGenreName] = useState<string>();
	const [pType, setPType] = useState<string>();

	const genreLookup: {
		[key: string]: {
			url: string;
			call: string;
			pathname: string;
			genreName: string;
		};
	} = {
		requestPopular: {
			url: importantURLs.requestPopular,
			call: 'requestPopular',
			pathname: '',
			genreName: `What's Popular`,
		},
		requestTrendingDay: {
			url: importantURLs.requestTrendingDay,
			call: 'requestTrendingDay',
			pathname: '',
			genreName: 'Trending Day',
		},
		requestTrendingWeek: {
			url: importantURLs.requestTrendingWeek,
			call: 'requestTrendingWeek',
			pathname: '',
			genreName: 'Trending Week',
		},
	};

	useEffect(() => {
		if (genre !== undefined && requestGenres.length !== 0) {
			const selectedGenre = requestGenres.find(
				item => item.genreId === parseInt(genre!)
			);
			if (selectedGenre) {
				setGenreName(selectedGenre.name);
			}
		}
	}, [genre, requestGenres]);

	const fetchMovie = async (number: string, genres: string) => {
		setLoading(true);
		let url: URL;
		const pathSegments = window.location.pathname.split('/');
		setPType(pathSegments[2]);
		dispatch(setProgramType(pathSegments[2]));
		if (genreLookup[genres]) {
			url = new URL(genreLookup[genres].url);

			switch (genreLookup[genres].call) {
				case 'requestPopular':
					url.pathname = `/3/${pathSegments[2]}/popular`;
					break;
				case 'requestTrendingDay':
					url.pathname = `/3/trending/${pathSegments[2]}/day`;
					break;
				case 'requestTrendingWeek':
					url.pathname = `/3/trending/${pathSegments[2]}/week`;
					break;
				default:
					break;
			}
			setGenreName(genreLookup[genres].genreName);
		} else {
			url = new URL(
				`https://api.themoviedb.org/3/${pathSegments[2]}/popular?api_key=${API_KEY}&language=en-US&page=1&with_genres=${genres}`
			);
		}

		url.searchParams.set('page', number.toString());
		console.log(url.toString());
		const response = await fetch(url.toString());
		const data = await response.json();

		setPrograms(data.results);
		setTotalResults(Math.min(data.total_results, 10000));

		if (genreLookup[genres]) {
			navigate(
				`/fulllist/${pathSegments[2]}/?genreId=${genres}&page=${number}`
			);
		} else {
			navigate(
				`/fulllist/${pathSegments[2]}/?genreId=${genres}&page=${number}`
			);
		}
	};

	useEffect(() => {
		setLoading(true);
		const searchParams = new URLSearchParams(window.location.search);
		const newPage = searchParams.get('page');
		const newGenre = searchParams.get('genreId') as
			| 'requestPopular'
			| 'requestTrendingDay'
			| 'requestTrendingWeek'
			| undefined;

		if (newPage) {
			setPage(parseInt(newPage));

			if (newGenre) {
				setGenre(newGenre);
			}
			fetchMovie(newPage, newGenre || 'requestPopular').catch(error => {
				console.error('Error fetching data:', error);
				setLoading(false);
			});
			setLoading(false);
		}
		// eslint-disable-next-line
	}, [window.location.search, navigate]);

	const handlePageChange = (value: number) => {
		setPage(value);
		fetchMovie(value.toString(), genre || 'requestPopular').catch(error => {
			console.error('Error fetching data:', error);
		});
		window.scrollTo(0, 0);
	};

	return {
		programs,
		loading,
		page,
		totalResults,
		genreName,
		pType,
		handlePageChange,
	};
};

export default useFullListFetch;
