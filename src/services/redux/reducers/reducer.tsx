import { createSlice } from '@reduxjs/toolkit';

interface AppState {
	programID: any;
	programType: string;
	favouritesMovies: any[];
	darkMode: string;
	fullList: {
		name: string;
		url: string;
	};
}

const storedDarkMode = localStorage.getItem('darkMode');

const initialState: AppState = {
	programID: {},
	programType: 'movie',
	favouritesMovies: [],
	darkMode: storedDarkMode !== null ? storedDarkMode : 'dark',
	fullList: {
		name: '',
		url: '',
	},
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setProgramID: (state, action) => {
			state.programID = action.payload;
		},
		setProgramType: (state, action) => {
			state.programType = action.payload;
		},
		setFullList: (state, action) => {
			state.fullList = action.payload;
		},
		setDarkMode: (state, action) => {
			state.darkMode = action.payload;
			localStorage.setItem('darkMode', action.payload);
		},
	},
});

export const { setProgramID, setProgramType, setFullList, setDarkMode } =
	appSlice.actions;

export default appSlice.reducer;
