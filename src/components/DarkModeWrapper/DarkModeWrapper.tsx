import React, { useEffect, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/redux/store';

interface DarkModeWrapperProps {
	children: ReactNode;
}

const DarkModeWrapper: React.FC<DarkModeWrapperProps> = ({ children }) => {
	const darkMode = useSelector((state: RootState) => state.app.darkMode);
	useEffect(() => {
		if (darkMode === 'dark') {
			document.body.setAttribute('data-theme', `${darkMode}`);
		} else {
			document.body.removeAttribute('data-theme');
		}

		return () => {
			document.body.removeAttribute('data-theme');
		};
	}, [darkMode]);

	return <>{children}</>;
};

export default DarkModeWrapper;
