// ===== DADOS =====
const perfis = [
  { nome: "Marcos", foto: "img/user1.jpg", id: "marcos" },
  { nome: "Ana Júlia", foto: "img/user2.jpg", id: "ana" },
  { nome: "Renato", foto: "img/user3.jpg", id: "renato" },
  { nome: "Vitória", foto: "img/user4.jpg", id: "vitoria" },
  { nome: "Lucas", foto: "img/user5.jpg", id: "lucas" },
];

const posts = [
  { titulo: "Superman: O Retorno", resumo: "Analisamos o novo filme explosivo do Superman!", imagem: "img/supermein.jpg", autor: "marcos" },
  { titulo: "Batman - O Cavaleiro das Trevas", resumo: "Gotham nunca esteve tão sombria.", imagem: "img/batman.jpg", autor: "ana" },
  { titulo: "Top 10 Ação 2025", resumo: "Os filmes mais insanos do ano!", imagem: "img/acao.jpg", autor: "renato" },
  { titulo: "Heróis 2025", resumo: "Quem brilhou mais esse ano?", imagem: "img/herois.jpg", autor: "marcos" },
  { titulo: "Vilões Inesquecíveis", resumo: "Os maiores adversários do cinema.", imagem: "img/viloes.jpg", autor: "vitoria" },
  { titulo: "Marvel em 2025", resumo: "O futuro do MCU.", imagem: "img/marvel.jpg", autor: "lucas" },
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

// ===== MENU CONFIGURAÇÃO =====
settingsIcon.addEventListener("click", () => {
  settingsMenu.style.display = settingsMenu.style.display === "flex" ? "none" : "flex";
});

// ===== MODO CLARO/ESCUDO =====
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