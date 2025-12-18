// ===== DADOS =====
const perfis = [
  { nome: "Marcos", foto: "img/user.png", id: "marcos" },
  { nome: "Ana Júlia", foto: "img/user.png", id: "ana" },
  { nome: "Renato", foto: "img/user.png", id: "renato" },
  { nome: "Vitória", foto: "img/user.png", id: "vitoria" },
  { nome: "Lucas", foto: "img/user.png", id: "lucas" },
];

const posts = [
  { titulo: "Superman: O Retorno", resumo: "Analisamos o novo filme explosivo do Superman!", imagem: "img/supermein.jpg", autor: "marcos" },
  { titulo: "Batman - O Cavaleiro das Trevas", resumo: "Gotham nunca esteve tão sombria.", imagem: "img/batman.jpg", autor: "ana" },
  { titulo: "Top 10 Ação 2025", resumo: "Os filmes mais insanos do ano!", imagem: "img/acao.jpg", autor: "renato" },
  { titulo: "Heróis 2025", resumo: "Quem brilhou mais esse ano?", imagem: "img/herois.jpg", autor: "marcos" },
  { titulo: "Vilões Inesquecíveis", resumo: "Os maiores adversários do cinema.", imagem: "img/viloes.jpg", autor: "vitoria" },
  { titulo: "Marvel em 2025", resumo: "O futuro do MCU.", imagem: "img/mcu.jpg", autor: "lucas" },
];

// ===== ELEMENTOS =====
const postList = document.getElementById("postList");
const profileList = document.getElementById("profileList");
const settingsIcon = document.querySelector(".settings-icon");
const settingsMenu = document.querySelector(".settings-menu");
const toggleTheme = document.getElementById("toggleTheme");

// ===== RENDER PERFIS =====
function renderProfiles() {
  profileList.innerHTML = "";
  perfis.forEach(p => {
    profileList.innerHTML += `
      <div class="profile-item" data-id="${p.id}">
        <img src="${p.foto}">
        <span>${p.nome}</span>
      </div>
    `;
  });
}
renderProfiles();

// ===== RENDER POSTS =====
const urlParams = new URLSearchParams(window.location.search);
const userID = urlParams.get("user") || null;

function renderPosts(filterId = null) {
  postList.innerHTML = "";
  const filteredPosts = filterId ? posts.filter(p => p.autor === filterId) : posts;
  filteredPosts.forEach(p => {
    postList.innerHTML += `
      <article class="post-card">
        <img src="${p.imagem}" class="post-img">
        <div class="post-info">
          <h2>${p.titulo}</h2>
          <p>${p.resumo}</p>
        </div>
      </article>
    `;
  });
}
renderPosts(userID);

// ===== CLIQUE NA SIDEBAR =====
profileList.addEventListener("click", e => {
  const card = e.target.closest(".profile-item");
  if (!card) return;
  const id = card.dataset.id;
  renderPosts(id);
});

// === Configurações de tema e submenu ===
const btnConfig = document.querySelector('.btn-config'); // botão de abrir submenu
const submenu = document.querySelector('.submenu-config'); // o submenu
const btnTema = document.querySelector('.btn-tema'); // botão alternar tema
const body = document.body;

function aplicarTemaClaro() {
  // Adiciona a classe 'tema-claro' às seções específicas
  document.querySelector('header').classList.add('tema-claro');
  document.querySelector('.barra-superior').classList.add('tema-claro');
  document.querySelector('.logo').classList.add('tema-claro');
  document.querySelector('.destaque').classList.add('tema-claro');

  // Botões
  document.querySelectorAll('.btn, .btn-info, .btn-add').forEach(b => b.classList.add('tema-claro'));

  // Cards de filmes e séries
  document.querySelectorAll('.filme-card, .catalogo-filmes').forEach(c => c.classList.add('tema-claro'));
}

function removerTemaClaro() {
  document.querySelector('header').classList.remove('tema-claro');
  document.querySelector('.barra-superior').classList.remove('tema-claro');
  document.querySelector('.logo').classList.remove('tema-claro');
  document.querySelector('.destaque').classList.remove('tema-claro');

  document.querySelectorAll('.btn, .btn-info, .btn-add').forEach(b => b.classList.remove('tema-claro'));
  document.querySelectorAll('.filme-card, .catalogo-filmes').forEach(c => c.classList.remove('tema-claro'));
}


// abrir/fechar submenu
btnConfig.addEventListener('click', () => {
  submenu.classList.toggle('show');
});

// alternar tema claro/escuro
btnTema.addEventListener('click', () => {
  body.classList.toggle('tema-claro');

  if(body.classList.contains('tema-claro')){
    btnTema.textContent = 'Tema Escuro';
    aplicarTemaClaro();  // aplica cores claras
  } else {
    btnTema.textContent = 'Tema Claro';
    removerTemaClaro();  // volta para o padrão
  }
});

// fechar submenu ao clicar fora
document.addEventListener('click', (e) => {
  if (!submenu.contains(e.target) && !btnConfig.contains(e.target)) {
    submenu.classList.remove('show');
  }
});

// ===== MODO CLARO/ESCURO =====
function setTheme(theme) {
  document.body.classList.toggle("light", theme === "light");
  localStorage.setItem("theme", theme);
}
toggleTheme.addEventListener("click", () => {
  const current = document.body.classList.contains("light") ? "dark" : "light";
  setTheme(current);
});

// ===== RECUPERA TEMA SALVO =====
const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);