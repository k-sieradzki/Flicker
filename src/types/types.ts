import React from 'react';

export interface Genre {
	id: number;
	name: string;
}

export interface Request {
	name: string;
	link: string;
	genreId?: number;
}

export interface AccordionProps {
	title: string;
	content?: string;
}
export interface AvatarUpdateProps {
	avatar: string;
}

export interface CarouselWidthProps {
	title: string;
}

export interface FilterListProps {
	moviesNumber: number | undefined;
	tvNumber: number | undefined;
	programType: string;
	setProgramType: Function;
	setPage: Function;
}

export interface HeaderProps {
	fetchURL: string;
	bigSize?: boolean;
}

export interface RequestGenresInt {
	name: string;
	link: string;
	genreId?: any;
}

export interface BtnProps {
	name: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ProgramModalProps {
	showModal: boolean;
	handleModal: () => void;
	trailer: string;
}

export interface ProgramRelatedProps {
	production: any;
	getProgramID: {
		type: string;
	};
}

export interface ProfileDataProps {
	avatar: string;
	email: string;
	gender: string;
	nickname: string;
	phone: number;
}

export interface ProgramsCarouselProps {
	title: string;
	fetchURL: string;
	bigSize?: boolean;
	genre?: string;
}

export interface RecomendationsProps {
	title: string;
	data: Movie[];
	parentType: string;
}

export interface ProgramInt {
	backdrop_path: string;
	poster_path: string;
	vote_average: number;
	id: number;
	title: string;
	name: string;
	overview: string;
}

export interface Programs {
	poster_path: string;
	vote_average: number;
	backdrop_path: string;
	title?: string;
	name?: string;
	id: number;
}

export interface ThumbnailsCompProps {
	programs: ProgramInt[];
	isLoading: boolean;
	program?: string;
}

export interface SearchbyTitleInputProps {
	searchTitle: string;
	setSearchTitle: (title: string) => void;
}

export interface favMovie {
	programID: number;
	programBackdrop?: string;
	programTitle?: string;
	programPoster?: string;
	mediaType?: string;
}

export interface Collection {
	id: number;
	name: string;
	poster_path: string;
	backdrop_path: string;
}

export interface Genre {
	id: number;
	name: string;
}

export interface ProductionCompany {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

export interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}

export interface SpokenLanguage {
	english_name: string;
	iso_639_1: string;
	name: string;
}

export interface Video {
	iso_639_1: string;
	iso_3166_1: string;
	name: string;
	key: string;
	site: string;
	size: number;
	type: string;
	official: boolean;
	published_at: string;
	id: string;
}

export interface Cast {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string | null;
	cast_id: number;
	character: string;
	credit_id: string;
	order: number;
}

export interface Crew {
	adult: boolean;
	credit_id: string;
	department: string;
	gender: number;
	id: number;
	job: string;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string | null;
}

export interface Credits {
	team: {
		cast: Cast[];
		crew: Crew[];
	};
}

export interface Recommendation {
	adult: boolean;
	backdrop_path: string;
	id: number;
	title: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface ProgramComponentProps {
	handleModal: () => void;
	convertedTime: string;
	rateColor: string;
	production: Movie;
}

export interface Videos {
	results: Video[];
}

export interface Recommendations {
	page: number;
	results: Recommendation[];
}

export interface Movie {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: Collection;
	budget: number;
	genres: Genre[];
	homepage: string;
	id: number;
	imdb_id: string;
	name: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	videos: Videos;
	credits: any;
	first_air_date: string;
	original_name: string;
	recommendations: Recommendations;
}

export interface LoginData {
	email: string;
	password: string;
}

export interface SignFormProps {
	signFunction: any;
	handleError: string;
	wrongPassword?: boolean;
	sayWhat: string;
}
