import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: process.env.GOOGLE_API_KEY,
	authDomain: process.env.GOOGLE_AUTH_DOMAIN,
	projectId: process.env.GOOGLE_PROJECT_ID,
	storageBucket: process.env.GOOGLE_STORAGE_BUCKET,
	messagingSenderId: process.env.GOOGLE_MESSAGING_SENDER_ID,
	appId: process.env.GOOGLE_APP_ID,
	measurementId: process.env.GOOGLE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics;

export { app, auth, analytics };
