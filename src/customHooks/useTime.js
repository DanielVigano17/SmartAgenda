import { axiosInstance } from "../utils/axiosConfig"
import { authVerification } from '../utils/authVerification';

const useTime = ()=>{

        const updateTime = async ({nameMateria,segundos})=>{
  
        const userId = await authVerification()
      
        const response = await axiosInstance.post(`/update`, {
      
            date: new Date(),
            userId: userId.uid,
            segundos: segundos,
            materia:nameMateria,
            
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

    return{
        updateTime,
    }

}


export default useTime