import { setProgramID } from '../../services/redux/reducers/reducer';

const API_KEY = process.env.REACT_APP_API_KEY;

const useFetchRandomMovie = (
	getProgramType: string,
	navigate: Function,
	dispatch: Function
) => {
	return async () => {
		try {
			const randomPage = Math.floor(Math.random() * 1000) + 1;
			const randomProgram = Math.floor(Math.random() * 20);

			const response = await fetch(
				`https://api.themoviedb.org/3/trending/${getProgramType}/week?api_key=${API_KEY}&language=en-US&page=${randomPage}`
			);

			if (!response.ok) {
				throw new Error('Failed to fetch random movie.');
			}

			const data = await response.json();
			const randomId = data.results[randomProgram].id;

			dispatch(setProgramID({ id: randomId, type: getProgramType }));
			navigate(`/program/${getProgramType}/${randomId}`);
		} catch (error) {
			console.error(error);
		}
	};
};

export default useFetchRandomMovie;
