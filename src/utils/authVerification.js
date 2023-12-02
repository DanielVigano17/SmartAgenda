import { getAuth, onAuthStateChanged, } from "firebase/auth";

export async function authVerification() {
    
async function verificarAutenticacao() {
    
    const auth = getAuth();
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe(); // Certifique-se de cancelar a inscrição para evitar vazamentos de memória
        if (user) {
          resolve(user); // O usuário está autenticado
        } else {
          reject("Usuário não autenticado"); // O usuário não está autenticado
        }
      });
    });
  }

  const stateAuth = await verificarAutenticacao()
  .then((user) => {
    // O usuário está autenticado, faça algo com o usuário
    return user
  })
  .catch((error) => {
    // Lide com o erro (usuário não autenticado)
    return null
  });

 return stateAuth

}

