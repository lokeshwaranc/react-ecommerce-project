import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: "AIzaSyDQj6-GZ-5TDjFAijaDogP3OXOLcDKYw9Q",
    authDomain: "e-commerce-babf0.firebaseapp.com",
    databaseURL: "https://e-commerce-babf0.firebaseio.com",
    projectId: "e-commerce-babf0",
    storageBucket: "e-commerce-babf0.appspot.com",
    messagingSenderId: "1094358717795",
    appId: "1:1094358717795:web:517c03654b8834fb356f56",
    measurementId: "G-DVK0961722"
}

firebase.initializeApp(config);

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return;


    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    if(!snapshot.exists){
        const {displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch(error){
            console.log('Error in creating user', error.message);
        }
    }
    console.log(snapshot);
    return userRef;
};


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});


export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;