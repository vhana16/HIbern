// ===== REGISTRAR USUÁRIO =====
const registerForm = document.querySelector('form'); 
if (registerForm && window.location.pathname.includes('register.html')) {
  registerForm.addEventListener('submit', e => {
    e.preventDefault();

    const nome = registerForm.querySelector('input[placeholder="NOME"]').value.trim();
    const email = registerForm.querySelector('input[type="email"]').value.trim();
    const senha = registerForm.querySelector('input[type="password"]').value.trim();
    const dataNascimento = registerForm.querySelector('input[type="date"]').value;

    if (!nome || !email || !senha) {
      alert('Preencha todos os campos!');
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuarios.some(u => u.email === email)) {
      alert('Email já cadastrado!');
      return;
    }

    usuarios.push({ nome, email, senha, dataNascimento });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Conta criada com sucesso!');
    window.location.href = 'login.html';
  });
}

// ===== LOGIN =====
const loginForm = document.querySelector('form');
if (loginForm && window.location.pathname.includes('login.html')) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = loginForm.querySelector('input[type="email"]').value.trim();
    const senha = loginForm.querySelector('input[type="password"]').value.trim();

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuario) {
      alert('Email ou senha incorretos!');
      return;
    }

    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    alert(`Bem-vindo, ${usuario.nome}!`);
    window.location.href = 'index.html';
  });
}

// ===== CONTROLE DE ACESSO E LOGOUT =====
document.addEventListener('DOMContentLoaded', () => {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

  const btnLogin = document.querySelector('.btn-login');
  const btnLogoutSubmenu = document.getElementById('btn-logout');
  const loginRegisterDiv = document.querySelector('.login-register');

  if (usuarioLogado) {
    // Mostra logout no submenu ou transforma botão
    if (btnLogoutSubmenu) btnLogoutSubmenu.style.display = 'block';
    if (btnLogin) btnLogin.style.display = 'none'; // esconde botão de login

    // Opcional: mostra nome do usuário
    if (loginRegisterDiv) {
      const nomeUsuario = document.createElement('span');
      nomeUsuario.textContent = `Olá, ${usuarioLogado.nome}`;
      nomeUsuario.classList.add('usuario-logado');
      loginRegisterDiv.prepend(nomeUsuario);
    }
  } else {
    if (btnLogoutSubmenu) btnLogoutSubmenu.style.display = 'none';
    if (btnLogin) btnLogin.style.display = 'inline-block';
  }

  // Logout pelo submenu
  if (btnLogoutSubmenu) {
    btnLogoutSubmenu.addEventListener('click', () => {
      localStorage.removeItem('usuarioLogado');
      alert('Logout realizado!');
      window.location.reload();
    });
  }
});
