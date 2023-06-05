import React from 'react';
import GStyles from './assets/styles/global.module.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import LoadingPage from './pages/LoadingPage/LoadingPage';
import GetStarted from './pages/GetStarted/GetStarted';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ResetPwPage from './pages/ResetPwPage/ResetPwPage';

import UserProfile from './pages/Profile/UserProfile';

import ScrollToTop from './utils/Helpers/scrollToTop';
import Home from './pages/Home/Home';
import FullList from './pages/FullList/FullList';

import Search from './pages/Search/Search';
import Program from './pages/Program/Program';
import MyList from './pages/MyList/MyList';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
  

function App() {

	return (
		<div className={GStyles.app}>
			<div className={GStyles.centerInside}>
				<BrowserRouter>
					<ScrollToTop />
					<Routes>
						<Route path='/' element={<GetStarted />} />
						<Route path='/*' element={<GetStarted />} />
						<Route path='/register' element={<RegisterPage />} />
						<Route path='/login' element={<LoginPage />} />
						<Route path='/loading' element={<LoadingPage />} />
						<Route path='/reset' element={<ResetPwPage />} />


						<Route path='/fulllist/*' element={ <ProtectedRoute> <FullList /> </ProtectedRoute> }/>
						<Route path='/search' element={<ProtectedRoute> <Search /> </ProtectedRoute>} />
						<Route path='/program' element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
						<Route path='/program/*' element={<ProtectedRoute> <Program /> </ProtectedRoute>} />
						<Route path='/mylist' element={<ProtectedRoute> <MyList /> </ProtectedRoute>} />
						<Route path='/profile' element={<ProtectedRoute> <UserProfile /> </ProtectedRoute>} />
						<Route path='/home' element={<ProtectedRoute> <Home /> </ProtectedRoute>} />

					</Routes>
				</BrowserRouter>

			</div>

		</div>
	);
}

export default App;
