import { useSelector } from 'react-redux';
import { RootState } from '../../services/redux/store';

const API_KEY = process.env.REACT_APP_API_KEY;

const useImportantURLs = () => {
	const prodType = useSelector((state: RootState) => state.app.programType);

	const apiLink = 'https://api.themoviedb.org/3';
	const language = 'en-US';

	return {
		requestPopular: `${apiLink}/${prodType}/popular?api_key=${API_KEY}&language=${language}&page=1`,
		requestTrendingDay: `${apiLink}/trending/${prodType}/day?api_key=${API_KEY}&language=${language}&page=1`,
		requestTrendingWeek: `${apiLink}/trending/${prodType}/week?api_key=${API_KEY}&language=${language}&page=1`,

		requestSearchMovie: `${apiLink}/trending/movie/week?api_key=${API_KEY}&language=${language}&page=1`,
		requestSearchTv: `${apiLink}/trending/tv/week?api_key=${API_KEY}&language=${language}&page=1`,
	};
};

export default useImportantURLs;
