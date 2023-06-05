import { useState, useEffect } from 'react';
import { ProgramInt } from '../../types/types';

export function useFetchMovies(fetchURL: string) {
	const [programs, setPrograms] = useState<ProgramInt[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const abortController = new AbortController();

		setLoading(true);

		const fetchMovies = async () => {
			try {
				const response = await fetch(fetchURL);

				if (!response.ok) {
					throw new Error('Failed to fetch');
				}

				const data = await response.json();
				setPrograms(data.results);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching movies:', error);
				setLoading(false);
			}
		};

		fetchMovies().catch(error => {
			console.error('Error fetching data:', error);
			setLoading(false);
		});

		return () => {
			abortController.abort();
		};
	}, [fetchURL]);

	return { programs, loading };
}
