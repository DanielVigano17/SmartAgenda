import { axiosInstance } from "../utils/axiosConfig"
import { authVerification } from '../utils/authVerification';

const useMateria = ()=>{

        const createMateria = async (nameMateria)=>{
  
        const userId = await authVerification()
      
        const response = await axiosInstance.post(`/createMateria`, {
      
            userId: userId.uid,
            nameMateria:nameMateria,
      
          })
          .then(function (response) {
            
      
            return new Promise((resolve)=>{
              setTimeout(()=>{
                resolve(response.data)
              },3000)
            })
          })
          .catch(function (error) {
            
            throw new Error(error)
          });
        
        
        return response
        
      
      }

      const deleteMateria = async (idMateria)=>{
  
        const userId = await authVerification()
      
        const response = await axiosInstance.post(`/deleteMateria`, {
      
            userId: userId.uid,
            idMateria:idMateria,
      
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

      async function listMaterias(){
  
        const userId = await authVerification();
        const response = await axiosInstance.post(`/listMateria/`, {
      
            userId: userId.uid
      
          })
          .then(function (response) {
            
            console.log(response)
            return response.data
          })
          .catch(function (error) {
            console.log(error);
          });
        
        return response
        
      
      }

      async function getLastWeekTime(materiaId){
  
        const userId = await authVerification()
      
        const response = await axiosInstance.post(`/getLastWeekTimes/`, {
      
            userId: userId.uid,
            materiaId:Number(materiaId),
      
          })
          .then(function (response) {
            
            
            return response.data
          })
          .catch(function (error) {
            console.log(error);
          });
        
        
        return response
        
      
      }

    return{
        createMateria,
        deleteMateria,
        listMaterias,
        getLastWeekTime,
    }

}


export default useMateria