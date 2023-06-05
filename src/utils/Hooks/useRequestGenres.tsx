import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Genre, Request } from '../../types/types';
import { RootState } from '../../services/redux/store';

const API_KEY = process.env.REACT_APP_API_KEY;

const useRequestGenres = (): Request[] => {
	const [genres, setGenres] = useState<Genre[]>([]);

	const prodType = useSelector((state: RootState) => state.app.programType);
	const apiLink = 'https://api.themoviedb.org/3';

	useEffect(() => {
		const abortController = new AbortController();

		const fetchGenres = async () => {
			const response = await fetch(
				`${apiLink}/genre/${prodType}/list?api_key=${API_KEY}&language=en-US`
			);
			const data = await response.json();
			setGenres(data.genres);
		};

		fetchGenres().catch(error => {
			console.error('Error fetching data:', error);
		});

		return () => {
			abortController.abort();
		};
	}, [prodType]);

	return genres.map(genre => ({
		name: genre.name,
		genreId: genre.id,
		link: `${apiLink}/discover/${prodType}?api_key=${API_KEY}&with_genres=${genre.id}`,
	}));
};

export default useRequestGenres;
