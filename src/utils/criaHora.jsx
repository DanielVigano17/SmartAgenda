function criaHora(segundos){
    const data = new Date(segundos*1000); 
  
    return data.toLocaleTimeString('pt-BR',{
        hour12: false,
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'GMT'
    })
  }

export default criaHora