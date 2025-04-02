import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';

// Sua configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBSKZO6JqTPQIaVsuMRF_NifGvuiLT2STc",
    authDomain: "controle-usuario-64b08.firebaseapp.com",
    projectId: "controle-usuario-64b08",
    storageBucket: "controle-usuario-64b08.firebasestorage.app",
    messagingSenderId: "1005734164997",
    appId: "1:1005734164997:web:0cfa0b869178aa4b947a6c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Corrigindo as referências aos formulários - use querySelector com a classe correta
const signUpForm = document.querySelector('.sign-up form');
const signInForm = document.querySelector('.sign-in form');

// Função para criar e mostrar toast notification
function showToast(message, type = 'success') {
    // Criar elemento toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Adicionar ao corpo do documento
    document.body.appendChild(toast);
    
    // Aplicar estilo para aparecer
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Remover após 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Adicionar CSS para o toast
const style = document.createElement('style');
style.textContent = `
.toast {
    position: fixed;
    bottom: 13px; /* Aumentando o espaçamento da base da tela */
    right: 20px;
    min-width: 350px; /* Aumente este valor para deixar a notificação mais larga */
    padding: 16px 40px;
    border-radius: 4px;
    color: white;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 9999;
}

.toast.show {
    transform: translateX(0);
}

.toast-success {
    background: linear-gradient(to right, #4CAF50 15px, #1E1E1E 15px);
}

.toast-error {
    background: linear-gradient(to right, #f60606 15px,#1E1E1E 15px);

}

.toast-warning {
   background: linear-gradient(to right,rgb(211, 253, 0) 15px, #1E1E1E 15px);
}
`;
document.head.appendChild(style);

// Função para redirecionar após login bem-sucedido
function redirecionarParaDashboard() {
    window.location.href = 'dashboard.html';
}

// Função para registrar novo usuário (sem login automático)
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = signUpForm.querySelector('input[type="email"]').value;
    const password = signUpForm.querySelector('input[type="password"]').value;
    
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            showToast('Usuário cadastrado com sucesso', 'success');
            signUpForm.reset();
            
            // Agora, em vez de redirecionar, vamos simplesmente alternar para o painel de login
            // Isso assume que você está usando o script.js que alterna entre os painéis
            if (document.getElementById('login')) {
                document.getElementById('login').click();
            }
            
            // Apenas logue que o usuário foi criado
            console.log('Usuário criado:', user.email);
            
            // Faça logout imediatamente para que o usuário precise fazer login manualmente
            auth.signOut();
        })
        .catch((error) => {
            let errorMessage;
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'Este email já está cadastrado.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Email inválido.';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
                    break;
                default:
                    errorMessage = 'Ocorreu um erro ao cadastrar.';
            }
            showToast(errorMessage, 'error');
        });
});
// Função de login que verifica o checkbox
async function fazerLogin(email, senha, manterConectado) {
    try {
      // Define o tipo de persistência com base no valor do checkbox
      const tipoPersistencia = manterConectado ? browserLocalPersistence : browserSessionPersistence;
      
      // Configura a persistência antes de fazer login
      await setPersistence(auth, tipoPersistencia);
      
      // Faz o login com email e senha
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      console.log("Usuário logado com sucesso:", userCredential.user);
      
      // Redirecionar para página principal ou fazer outras ações necessárias
      window.location.href = '/pagina-principal';
      
    } catch (error) {
      console.error("Erro ao fazer login:", error.code, error.message);
      // Tratar erros de autenticação aqui
    }
  }
  
  // Exemplo de uso com um formulário
  document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;
      const manterConectado = document.getElementById('manterConectado').checked;
      
      fazerLogin(email, senha, manterConectado);
    });
  });

// Função para fazer login
signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = signInForm.querySelector('input[type="email"]').value;
    const password = signInForm.querySelector('input[type="password"]').value;
    
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            showToast('Login realizado com sucesso!', 'success');
            signInForm.reset();
            
            // Pequeno delay para o usuário ver a mensagem antes do redirecionamento
            setTimeout(() => {
                redirecionarParaDashboard();
            }, 1500);
        })
        .catch((error) => {
            let errorMessage;
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = 'Usuário não encontrado.';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Senha incorreta.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Email inválido.';
                    break;
                default:
                    errorMessage = 'Usuário ou senha incorretos.';
            }
            showToast(errorMessage, 'error');
        });
});

// Verificar estado de autenticação e exportar funções
export function verificarAutenticacao() {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log('Usuário logado:', user.email);
                resolve(user);
            } else {
                console.log('Usuário não está logado');
                // Redirecionar para a página de login se não estiver no login
                if (!window.location.href.includes('index.html') && 
                    !window.location.href.endsWith('/')) {
                    window.location.href = 'index.html';
                }
                reject('Usuário não autenticado');
            }
        });
    });
}

// Função para fazer logout
export function fazerLogout() {
    auth.signOut()
        .then(() => {
            console.log('Logout realizado com sucesso');
            showToast('Logout realizado com sucesso', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        })
        .catch((error) => {
            console.error('Erro ao fazer logout:', error);
            showToast('Erro ao fazer logout', 'error');
        });
}