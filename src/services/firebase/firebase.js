import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyAy9JAhbptlsFy6CBI5Q6Q1Y7ZF0TmyI4A',
	authDomain: 'flicker-299ff.firebaseapp.com',
	projectId: 'flicker-299ff',
	storageBucket: 'flicker-299ff.appspot.com',
	messagingSenderId: '1061773668176',
	appId: '1:1061773668176:web:6e40b9505113e38bd84655',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// init services
export const db = getFirestore(app);
export const storage = getStorage(app);
