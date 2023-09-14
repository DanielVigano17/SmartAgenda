import { axiosInstance } from "./axiosConfig"


export async function postLogin(){

    const response = await axiosInstance.post('/login', {

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