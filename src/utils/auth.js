import { createUserWithEmailAndPassword, signInWithEmailAndPassword, browserLocalPersistence, setPersistence } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { axiosInstance } from "./axiosConfig"


export async function postLogin(email, password){

 await setPersistence(auth, browserLocalPersistence)

 await signInWithEmailAndPassword(auth, email, password)
 .then((userCredential) => {
   // Signed in 
   const user = userCredential.user;
   console.log(user);
 })
 .catch((error) => {
   const errorCode = error.code;
   const errorMessage = error.message;
   console.log(errorCode, errorMessage);
 });
   

}

export async function postCadastro(email, password){

  await createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {

    try {
      const response = await axiosInstance.post('/createUser', {

        id: userCredential.user.uid,

      })
    }catch (error) {
      console.error(error)
      throw new Error(error)
    }
   
  })
  .catch((error) => {
    throw new Error(error)
  });



}