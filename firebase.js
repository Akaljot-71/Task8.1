//firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBqO9tcraD0FRWyRvtU7RzKV_WqnjBtmkc",
    authDomain: "sit313-57dc8.firebaseapp.com",
    projectId: "sit313-57dc8",
    storageBucket: "sit313-57dc8.appspot.com",
    messagingSenderId: "359511723530",
    appId: "1:359511723530:web:cae676174b9add73bdd9f3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const savePost= async (postType, postData, image) => {
  try {
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      postData.imageUrl = imageUrl;
    }

    const docRef = await addDoc(collection(db, postType === 'question' ? 'questions' : 'articles'), {
      ...postData,
      date: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }


}

export const fetchQuestions= async (callback) => {
  const q = query(collection(db, 'questions'));
  const querySnapshot = await getDocs(q);
  const questionsArray = [];
  querySnapshot.forEach((doc) => {
    questionsArray.push({ ...doc.data(), id: doc.id });
  });
  callback(questionsArray);
}


