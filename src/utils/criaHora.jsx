function criaHora(segundos, flagCronometro = true, flagOmitirMinutos = false){
    const data = new Date(segundos*1000); 
  
   if(flagCronometro){

    return data.toLocaleTimeString('pt-BR',{
      hour12: false,
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'GMT'
  })

   }else{
      if(flagOmitirMinutos){
        return data.toLocaleTimeString('pt-BR',{
          hour12: false,
          hour: 'numeric',
          timeZone: 'GMT'
      })
      }else{
        return data.toLocaleTimeString('pt-BR',{
          hour12: false,
          minute: '2-digit',
          timeZone: 'GMT'
      })
      }
   }
  }

export default criaHora