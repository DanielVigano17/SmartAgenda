function criaHora(segundos, flagCronometro = true, flagOmitirMinutos = false){
    const data = new Date(segundos*1000); 

    if(segundos > 86400){
      return Math.round(segundos/3600);
    }

    
  
   if(flagCronometro){

    return data.toLocaleTimeString('pt-BR',{
      hour12: false,
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'GMT'
  })

   }else{
    if(segundos < 3600){
      return data.toLocaleTimeString('pt-BR',{
        hour12: false,
        minute: '2-digit',
        timeZone: 'GMT'
    })
    }
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
          hour: 'numeric',
          timeZone: 'GMT'
      })
      }
   }
  }

export default criaHora