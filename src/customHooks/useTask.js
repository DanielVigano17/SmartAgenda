import { authVerification } from "../utils/authVerification";
import { axiosInstance } from "../utils/axiosConfig";



const useTask = ()=>{
    
    const createTask = async (taskDescription,materiaId)=>{
            const userId = await authVerification()

            const response = await axiosInstance.post(`/createTask`, {

                description:taskDescription,
                materiaId:Number(materiaId),
     
              })
              .then(function (response) {
                console.log(response);
          
                return response.data
                
              })
              .catch(function (error) {
                console.log(error.response.data.error);

                throw new Error(error.response.data.error)
              });
            
            
            return response
            
        
    }

    const deleteTask = async (taskId)=>{
      const userId = await authVerification()

      const response = await axiosInstance.post(`/deleteTask`, {

         taskId:Number(taskId),

        })
        .then(function (response) {
          console.log(response);
    
          return response.data
        })
        .catch(function (error) {
          // console.log(error.response.data.error);

          return new Promise((resolve,reject)=>{
            setTimeout(()=>{
              reject(error.response.data.error)
            },4000)
          })
        });
      
      
      return response
      
  
}

    const listTasks = async (materiaId)=>{
      const userId = await authVerification()
      const response = await axiosInstance.post(`/listTasks`, {

          userId:userId.uid,
          materiaId:Number(materiaId),

        })
        .then(function (response) {
          console.log(response);
    
          return response.data
        })
        .catch(function (error) {
          console.log(error);

          throw new Error(error)
        });
      
      
      return response
      
  
}

    return{
      createTask,
      listTasks,
      deleteTask
    }
}


export default useTask