import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';
import { setDarkMode } from '../../services/redux/reducers/reducer';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../services/redux/store';
import styles from './darkModeSettings.module.scss';

const DarkModeSettings: React.FC = () => {
	const dispatch = useDispatch();

	const darkMode = useSelector((state: RootState) => state.app.darkMode);
	const [isSelected, setIsSelected] = useState<boolean>(false);

	useEffect(() => {
		setIsSelected(darkMode === 'dark');

		return () => {
			setIsSelected(false);
		};
	}, [darkMode]);

	const darkFnTest = () => {
		dispatch(setDarkMode(darkMode === 'dark' ? '' : 'dark'));
		setIsSelected(!isSelected);
	};

	return (
		<div className={styles.centerSet}>
			<h3>Dark Mode</h3>
			<Switch
				className={styles.switch}
				onColor='#ff0000'
				onChange={darkFnTest}
				checked={isSelected}
			/>
		</div>
	);
};

export default DarkModeSettings;
