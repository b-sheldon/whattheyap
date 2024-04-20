import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDJKc7PMJrLATbyCfuxTaD-EKqxhja3peo',
  authDomain: 'what-the-yap.firebaseapp.com',
  projectId: 'what-the-yap',
  storageBucket: 'what-the-yap.appspot.com',
  messagingSenderId: '147034831825',
  appId: '1:147034831825:web:f36184a4ebb92a60e8bef0',
  measurementId: 'G-4RZPRXMF8X',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, analytics };
