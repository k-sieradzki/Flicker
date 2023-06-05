import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import store from './services/redux/store';


import DarkModeWrapper from './components/DarkModeWrapper/DarkModeWrapper';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<Provider store={store}>
		<DarkModeWrapper>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</DarkModeWrapper>
	</Provider>
);
