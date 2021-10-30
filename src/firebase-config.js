// import { initializeApp } from "firebase/app";
// import { getFirestore } from "@firebase/firestore";

const { initializeApp } = require("firebase/app");
const { getFirestore } = require("@firebase/firestore");

const firebaseConfig = {
	apiKey: "AIzaSyAtzCqtF9Nn3zJYXUp5JIa3PqbjBYJp00M",
	authDomain: "bfga-scholar-db-c639a.firebaseapp.com",
	projectId: "bfga-scholar-db-c639a",
	storageBucket: "bfga-scholar-db-c639a.appspot.com",
	messagingSenderId: "168909324280",
	appId: "1:168909324280:web:e273b8d9191302a58f600d",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
module.exports = db
