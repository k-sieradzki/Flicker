import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebase/firebase';

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (!user) {
				navigate('/login');
			}
		});

		return () => {
			unsubscribe();
		};
	}, [navigate]);

	return <>{children}</>;
};

export default ProtectedRoute;
