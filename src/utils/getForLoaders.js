import { axiosInstance } from "./axiosConfig"
import { getAuth, onAuthStateChanged, } from "firebase/auth";
import { useOutletContext } from 'react-router-dom'
import { authVerification } from '../utils/authVerification';

export async function getTime(intervaloDeDias){
  
    const userId = await authVerification()
    console.log("Aquii:"+ userId.uid)
    const response = await axiosInstance.post(`/verify/${intervaloDeDias}`, {

        date: new Date(),
        userId: userId.uid

      })
      .then(function (response) {
        console.log(response);

        return response.data
      })
      .catch(function (error) {
        console.log(error);
      });
    
    return response
    

}

export async function listMaterias(intervaloDeDias){
  
  const userId = await authVerification()

  const response = await axiosInstance.post(`/listMateria/`, {

      userId: userId.uid

    })
    .then(function (response) {
      console.log(response);

      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
  
  
  return response
  

}