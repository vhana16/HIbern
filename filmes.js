const filmesContainer = document.getElementById("filmes-container");
const modal = document.getElementById("modal-detalhe");
const modalTitulo = document.getElementById("modal-titulo");
const modalPoster = document.getElementById("modal-poster");
const modalSinopse = document.getElementById("modal-sinopse");
const modalGenero = document.getElementById("modal-genero");
const btnFecharModal = document.querySelector(".btn-fechar-modal");
const btnAssistirModal = document.querySelector(".btn-assistir-modal");
const trailerFrame = document.getElementById("trailer-frame");

// Array de filmes com detalhes e trailers
const filmes = [
  { titulo: "Superman", descricao: "Clark Kent enfrenta o maior desafio de sua vida ao tentar salvar o mundo de uma ameaça cósmica.", imagem: "supermein.jpg", genero: "Super-Heróis", trailer: "videos/Superman.mp4" },
  { titulo: "Batman", descricao: "Bruce Wayne retorna como o Cavaleiro das Trevas para proteger Gotham de uma nova onda de crime.", imagem: "batman.jpg", genero: "Super-Heróis", trailer: "videos/Batman.mp4" },
  { titulo: "Mulher-Maravilha", descricao: "Criada entre as Amazonas, Diana usa seus poderes para proteger a humanidade e enfrentar forças que ameaçam o mundo.", imagem: "muiemaravia.jpg", genero: "Super-Heróis", trailer: "videos/Mulher Maravilha.mp4" },
  { titulo: "Homem de Ferro", descricao: "Tony Stark deve usar sua inteligência e tecnologia para combater ameaças globais.", imagem: "homidifero.jpg", genero: "Super-Heróis", trailer: "videos/Homem de Ferro.mp4" },
  { titulo: "Capitão América", descricao: "Steve Rogers, um homem transformado em super-soldado, luta contra o mal durante a Segunda Guerra Mundial.", imagem: "capitainamega.jpg", genero: "Super-Heróis", trailer: "videos/Capitao America.mp4"  },
  { titulo: "O Coringa", descricao: "Arthur Fleck, um comediante fracassado, se transforma no vilão Coringa, um dos mais icônicos da DC.", imagem: "kuringa.jpg", genero: "Super-Heróis", trailer: "videos/Coringa.mp4"  },
  { titulo: "Todo Mundo em Pânico", descricao: "Uma paródia das histórias de terror e suspense, cheia de piadas e referências aos filmes populares de terror.", imagem: "todomunduinpanicu.jpg", genero: "Comédia", trailer: "videos/Todo Mundo em Panico.mp4" },
  { titulo: "Harry Potter e a Pedra Filosofal", descricao: "Harry Potter é um garoto órfão que vive infeliz com seus tios, os Dursleys. Ele recebe uma carta contendo um convite para ingressar em Hogwarts, uma famosa escola especializada em formar jovens bruxos. Inicialmente, Harry é impedido de ler a carta por seu tio, mas logo recebe a visita de Hagrid, o guarda-caça de Hogwarts, que chega para levá-lo até a escola. Harry adentra um mundo mágico que jamais imaginara, vivendo diversas aventuras com seus novos amigos, Rony Weasley e Hermione Granger.", imagem: "hp.jpg", genero: "Fantasia", trailer: "" },
  { titulo: "E.T.", descricao: "Um alienígena inofensivo é esquecido na Terra e acaba sendo descoberto por um garoto chamado Elliott, que decide levá-lo para dentro de sua casa. Apesar das diferenças, os dois constroem uma grande amizade. Elliott apresenta a criatura para seu irmão mais velho, Michael, e sua irmã caçula, Gertie. As crianças decidem manter em segredo a existência do alienígena. No entanto, E.T. adoece e o governo precisa intervir para tentar salvar a vida do pequeno extraterrestre.", imagem: "et.jpg", genero: "Ficção científica", trailer: "" },
  { titulo: "It (A Coisa)", descricao: "Crianças enfrentam uma entidade maligna que se manifesta como seus maiores medos.", imagem: "it.jpg", genero: "Terror", trailer: "" },
  { titulo: "Vingadores (2012)", descricao: "Heróis se unem para impedir Loki de dominar a Terra.", imagem: "avengers.jpg", genero: "Ação", trailer: "" }
];

// Popula o catálogo de filmes
function atualizarCatalogo(lista, container) {
  container.innerHTML = "";
  lista.forEach(item => {
    const filmeWrapper = document.createElement("div");
    filmeWrapper.classList.add("filme-wrapper");
    filmeWrapper.innerHTML = `
      <img src="img/${item.imagem}" alt="${item.titulo}">
      <div class="opcoes-filme">
        <button class="btn-info" data-titulo="${item.titulo}">👁 Ver mais</button>
        <button class="btn-add" data-titulo="${item.titulo}">➕ Minha lista</button>
      </div>
    `;
    container.appendChild(filmeWrapper);
  });
  configurarBotoes();
}

// Configura os botões "Ver mais" e "Minha lista"
function configurarBotoes() {
  document.querySelectorAll(".btn-info").forEach(btn => {
    btn.addEventListener("click", () => {
      const titulo = btn.getAttribute("data-titulo");
      abrirModal(titulo);
    });
  });

document.querySelectorAll(".btn-add").forEach(btn => {
  btn.addEventListener("click", () => {
    const titulo = btn.getAttribute("data-titulo");
    adicionarAMinhaLista(titulo);  // ✅ FUNÇÃO CERTA — toast verde garantido
  });
});
}

// Abrir modal com detalhes e trailer
function abrirModal(titulo) {
  const filme = filmes.find(f => f.titulo === titulo);
  if (!filme) return;

  modalTitulo.textContent = filme.titulo;
  modalPoster.src = `img/${filme.imagem}`;
  modalPoster.alt = filme.titulo;
  modalSinopse.textContent = filme.sinopse;
  modalGenero.textContent = `${filme.genero} - ${filme.ano}`;

  if (filme.trailer) {
    trailerFrame.src = filme.trailer;
    trailerFrame.load();
    trailerFrame.play();
  } else {
    trailerFrame.src = "";
  }

  modal.style.display = "block";
}

// Fechar modal
btnFecharModal.addEventListener("click", () => {
  trailerFrame.pause();
  trailerFrame.src = "";
  modal.style.display = "none";
});

// Fechar modal clicando fora
window.addEventListener("click", e => {
  if (e.target === modal) {
    trailerFrame.pause();
    trailerFrame.src = "";
    modal.style.display = "none";
  }
});

// ------------ NOTIFICAÇÃO (TOAST) ------------
function showToast(text, { type = "success", duration = 2000 } = {}) {
  if (!text) return;
  // remove toasts antigos
  document.querySelectorAll(".global-toast").forEach(t => t.remove());
  const toast = document.createElement("div");
  toast.className = "global-toast";
  toast.textContent = text;
  Object.assign(toast.style, {
    position: "fixed",
    left: "42%",
    bottom: "20px",
    transform: "translateX(-50%)",
    padding: "10px 14px",
    borderRadius: "10px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
    zIndex: 99999,
    opacity: 0,
    transition: "all .22s ease",
    fontFamily: "Poppins, sans-serif",
    fontSize: "14px"
  });
  if (type === "success") { toast.style.background = "#16a34a"; toast.style.color = "#fff"; }
  else if (type === "error") { toast.style.background = "#dc2626"; toast.style.color = "#fff"; }
  else { toast.style.background = "#111"; toast.style.color = "#fff"; }

  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.opacity = "1"; toast.style.transform = "translateY(0)"; });
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
    setTimeout(() => toast.remove(), 220);
  }, duration);
}
// ------------ fim do toast ------------
function adicionarAMinhaLista(titulo) {
  const filme = filmes.find(f => f.titulo === titulo);
  if (!filme) return;

  let lista = JSON.parse(localStorage.getItem("minhaLista") || "[]");

  if (lista.some(item => item.titulo === titulo)) {
    showToast(`"${titulo}" já está na sua lista.`, { type: "info" });
    return;
  }

  lista.push({
    titulo: filme.titulo,
    imagem: filme.imagem,
    genero: filme.genero,
    sinopse: filme.descricao, // 🔥 CORREÇÃO IMPORTANTE
    trailer: filme.trailer
  });

  localStorage.setItem("minhaLista", JSON.stringify(lista));

  showToast(`"${titulo}" foi adicionado à sua lista!`, { type: "success" });
}


// Função exemplo de adicionar à lista
function adicionarMinhaLista(titulo) {
  showToast();
}

// Inicializa o catálogo
atualizarCatalogo(filmes, filmesContainer);

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



