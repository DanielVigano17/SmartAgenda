import { axiosInstance } from "./axiosConfig"


export async function getTime(){

    const response = await axiosInstance.post('/verify', {

        date: new Date(),

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