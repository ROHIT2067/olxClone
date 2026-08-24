 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { collection, getDocs, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDBUU8jXe75SSvOf4lOVRJMdCvfMouonA",
  authDomain: "olx-clone-eca11.firebaseapp.com",
  projectId: "olx-clone-eca11",
  storageBucket: "olx-clone-eca11.firebasestorage.app",
  messagingSenderId: "919020641939",
  appId: "1:919020641939:web:52411b377935bd0e2e7766"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app)
const provider=new GoogleAuthProvider()
const storage=getStorage()
const fireStore=getFirestore()

const fetchFromFirestore=async()=>{
    try {
        const productsCollection=collection(fireStore,'products')
        const productSnapShot=await getDocs(productsCollection)
        const productList=productSnapShot.docs.map(doc=>({
            id:doc.id,
            ...doc.data()
        }))
        console.log("Fetched products from fireStore",productList)
        return productList
    } catch (error) {
        console.log("error : ",error)
        return []
    }
}

export {auth,provider,storage,fireStore,fetchFromFirestore}
