const seriesContainer = document.getElementById("series-container");
const modal = document.getElementById("modal-detalhe");
const modalTitulo = document.getElementById("modal-titulo");
const modalPoster = document.getElementById("modal-poster");
const modalSinopse = document.getElementById("modal-sinopse");
const modalGenero = document.getElementById("modal-genero");
const btnFecharModal = document.querySelector(".btn-fechar-modal");
const btnAssistirModal = document.querySelector(".btn-assistir-modal");
const trailerFrame = document.getElementById("trailer-frame");
const spanFechar = document.querySelector(".fechar");

const series = [
  {
    titulo: "Dexter",
    imagem: "dexter.jpg",
    ano: 2006,
    genero: "Policial",
    sinopse: "Dexter é um perito forense que à noite se torna um assassino de criminosos impunes.",
    trailer: "videos/Dexter.mp4"
  },
  {
    titulo: "Peaky Blinders",
    imagem: "peaky-blinders.jpg",
    ano: 2013,
    genero: "Drama/Crime",
    sinopse: "Thomas Shelby lidera uma gangue perigosa em Birmingham após a Primeira Guerra Mundial.",
    trailer: "videos/Peaky Blinders.mp4"
  },
  {
    titulo: "Breaking Bad",
    imagem: "breaking-bad.jpg",
    ano: 2008,
    genero: "Policial/Drama",
    sinopse: "Walter White começa a fabricar metanfetamina após ser diagnosticado com câncer.",
    trailer: "videos/Breaking Bad.mp4"
  },
  { titulo: "Stranger Things",
    sinopse: "Stranger Things é uma série de suspense e ficção científica sobre crianças que enfrentam fenômenos sobrenaturais em uma pequena cidade nos anos 1980", 
    imagem: "stranger things.jpg", 
    genero: "Suspense", 
    trailer: "videos/Stranger Things.mp4" },

  { titulo: "Better Call Saul", 
    sinopse: "Better Call Saul é uma série dramática que acompanha a transformação de Jimmy McGill, um advogado comum, no astuto e inescrupuloso Saul Goodman, personagem de Breaking Bad.", 
    imagem: "better call saul.jpg",
    genero: "Drama", 
    trailer: "videos/Better Call Saul.mp4" },

  {titulo: "Titans",
   sinopse: "A série mostra Dick Grayson reunindo Ravena, Estelar e Mutano para impedir uma ameaça ligada aos poderes sombrios de Rachel, enquanto o grupo aprende a trabalhar junto e enfrenta perigos cada vez maiores.",
   genero: "Ação, super-herói, drama, aventura",
  imagem: "titans.jpeg"},

  {titulo: "The Flash",
   sinopse:"Acompanhe as aventuras do homem mais veloz do planeta, o cientista da Central City Police Barry Allen, que após um trágico acidente adquire o poder da velocidade.",
   genero: "Ficção Científica",
   imagem: 'flash.jpeg'},

   {titulo: "Arrow",
    sinopse: "Após um violento naufrágio, o playboy milionário Oliver Queen é dado como morto. Cinco anos depois, é resgatado de uma ilha do Pacífico e enviado de volta para Starling City, onde passa a agir como vigilante secreto.",
    genero: "Drama",
    imagem: "arrow.jpeg"},

  {titulo: "Loki",
    sinopse: "Usando o tesseract que roubou durante a missão dos Vingadores para recuperar as Joias do Infinito, Loki começa a pular no tempo e interfere em momentos importantes da história, chamando a atenção da Autoridade de Variância Temporal.",
    genero: "Ação",
    imagem: "loki.jpeg"},

  {titulo: "The Last Of Us",
   sinopse: "Joel, um sobrevivente duro e cínico, e a jovem e impetuosa Ellie se conectam pela dificuldade do mundo em que vivem. Juntos, eles enfrentam circunstâncias brutais e monstros impiedosos durante uma difícil jornada pelos EUA após um surto apocalíptico.",
   genero: "Drama",
   imagem: "tfou.jpeg"},

  {titulo: "The Walking Dead",
   sinopse: "Baseado na história em quadrinhos escrita por Robert Kirkman, este drama potente e visceral retrata a vida nos Estados Unidos pós-apocalíptico. Um grupo de sobreviventes, liderado pelo policial Rick Grimes, segue viajando em busca de uma nova moradia segura e distante dos mortos-vivos. A pressão para permanecerem vivos e lutarem pela sobrevivência faz com que muitos do grupo sejam submetidos às mais profundas formas de crueldade humana. Rick acaba descobrindo que o tão assustador desespero pela subsistência pode ser ainda mais fatal do que os próprios mortos-vivos que os rodeiam.",
   genero: "Terror",
  imagem: "twd.jpeg"}
];



// Popula o catálogo de séries
function atualizarCatalogo(lista, container) {
  container.innerHTML = "";
  lista.forEach(item => {
    const serieWrapper = document.createElement("div");
    serieWrapper.classList.add("serie-wrapper");
    serieWrapper.innerHTML = `
      <img src="img/${item.imagem}" alt="${item.titulo}">
      <div class="opcoes-serie">
        <button class="btn-info" data-titulo="${item.titulo}">👁 Ver mais</button>
        <button class="btn-add" data-titulo="${item.titulo}">➕ Minha lista</button>
      </div>
    `;
    container.appendChild(serieWrapper);
  });
  configurarBotoes();
}

// Configura os botões
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
      adicionarMinhaLista(titulo);
    });
  });
}

// Abrir modal com detalhes e trailer
function abrirModal(titulo) {
  const serie = series.find(s => s.titulo === titulo);
  if (!serie) return;

  modalTitulo.textContent = serie.titulo;
  modalPoster.src = `img/${serie.imagem}`;
  modalPoster.alt = serie.titulo;
  modalSinopse.textContent = serie.sinopse;
  modalGenero.textContent = `${serie.genero} - ${serie.ano}`;

  if (serie.trailer) {
    trailerFrame.src = serie.trailer;
    trailerFrame.load();
    trailerFrame.play();
  } else {
    trailerFrame.src = "";
  }

  modal.style.display = "block";
}

// Fechar modal
function fecharModal() {
  trailerFrame.pause();
  trailerFrame.src = "";
  modal.style.display = "none";
}

spanFechar.addEventListener("click", fecharModal);
btnFecharModal.addEventListener("click", fecharModal);
window.addEventListener("click", e => { if(e.target === modal) fecharModal(); });

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
  const serie = series.find(s => s.titulo === titulo);
  if (!serie) return;

  let lista = JSON.parse(localStorage.getItem("minhaLista") || "[]");

  // evitar duplicados
  if (lista.some(item => item.titulo === titulo)) {
    showToast(`"${titulo}" já está na sua lista.`, { type: "info" });
    return;
  }

  lista.push({
    titulo: serie.titulo,
    imagem: serie.imagem,
    genero: serie.genero,
    sinopse: serie.sinopse,
    trailer: serie.trailer
  });

  localStorage.setItem("minhaLista", JSON.stringify(lista));

  showToast(`"${titulo}" foi adicionado à sua lista!`, { type: "success" });
}


// ------------ Delegation: captura TODOS os cliques em botões "Minha lista" ------------
document.addEventListener("click", (e) => {
  // procura o botão mais próximo com qualquer uma das classes que você usa
  const btn = e.target.closest('.btn-add, .btn-add-filme, .btn-add-serie, .btn-add-result, .btn-add-result, .btn-add-minha-lista');
  if (!btn) return;

  // evita que o clique descubra o cartão e abra modal, se estiver dentro de um card clicável
  e.stopPropagation();

  // pega título (compatível com data-titulo ou data-title)
  const titulo = btn.dataset.titulo || btn.dataset.title || btn.getAttribute('data-titulo') || btn.getAttribute('data-title');
  if (!titulo) return;

  // chama a função que você já tem para salvar (ela já dispara showToast no seu código)
  // se a sua adicionarAMinhaLista não chamar showToast, garantimos aqui:
  try {
    // tenta usar a função existente
    if (typeof adicionarAMinhaLista === "function") {
      adicionarAMinhaLista(titulo);
      // garantir que o toast aparece caso a função interna não chame
      // (checa se item realmente foi adicionado ao localStorage)
      const lista = JSON.parse(localStorage.getItem("minhaLista") || "[]");
      const existe = lista.some(i => (i.titulo || i.title || "").toString().trim().toLowerCase() === titulo.toString().trim().toLowerCase());
      if (existe) {
        showToast(`"${titulo}" foi adicionado à sua lista!`, { type: "success" });
      }
    } else {
      // fallback simples: adicionar manualmente
      const lista = JSON.parse(localStorage.getItem("minhaLista") || "[]");
      if (!lista.some(i => (i.titulo||"").toLowerCase() === titulo.toLowerCase())) {
        lista.push({ titulo, imagem: "" });
        localStorage.setItem("minhaLista", JSON.stringify(lista));
        showToast(`"${titulo}" foi adicionado à sua lista!`, { type: "success" });
      } else {
        showToast(`"${titulo}" já está na sua lista.`, { type: "info" });
      }
    }
  } catch (err) {
    console.error("Erro ao adicionar à lista:", err);
    showToast("Erro ao adicionar à lista (veja console).", { type: "error" });
  }
});
// ------------ fim delegation ------------
// Adicionar série à lista
function adicionarMinhaLista(titulo) {
  showToast();
}

// Inicializa catálogo
atualizarCatalogo(series, seriesContainer);

// === Configurações de tema e submenu ===
const btnConfig = document.querySelector('.btn-config'); // botão de abrir submenu
const submenu = document.querySelector('.submenu-config'); // o submenu
const btnTema = document.querySelector('.btn-tema'); // botão alternar tema
const body = document.body;

function aplicarTemaClaro() {
  document.querySelector('header').classList.add('tema-claro');
  document.querySelector('.barra-superior')?.classList.add('tema-claro');
  document.querySelector('.logo')?.classList.add('tema-claro');
  document.querySelector('.destaque')?.classList.add('tema-claro');

  document.querySelectorAll('.btn, .btn-info, .btn-add').forEach(b => b.classList.add('tema-claro'));
  document.querySelectorAll('.serie-card, .catalogo-series').forEach(c => c.classList.add('tema-claro'));
}

function removerTemaClaro() {
  document.querySelector('header').classList.remove('tema-claro');
  document.querySelector('.barra-superior')?.classList.remove('tema-claro');
  document.querySelector('.logo')?.classList.remove('tema-claro');
  document.querySelector('.destaque')?.classList.remove('tema-claro');

  document.querySelectorAll('.btn, .btn-info, .btn-add').forEach(b => b.classList.remove('tema-claro'));
  document.querySelectorAll('.serie-card, .catalogo-series').forEach(c => c.classList.remove('tema-claro'));
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
    aplicarTemaClaro();
  } else {
    btnTema.textContent = 'Tema Claro';
    removerTemaClaro();
  }
});

// fechar submenu ao clicar fora
document.addEventListener('click', (e) => {
  if (!submenu.contains(e.target) && !btnConfig.contains(e.target)) {
    submenu.classList.remove('show');
  }
});


function mostrarMensagemAdicionar(texto) {
  if (!texto || texto.trim() === "") return;

  // Remove avisos antigos
  document.querySelectorAll(".mensagem-adicionada").forEach(el => el.remove());

  const aviso = document.createElement("div");
  aviso.className = "mensagem-adicionada";
  aviso.textContent = texto;

  document.body.appendChild(aviso);

  setTimeout(() => aviso.classList.add("show"), 10);

  setTimeout(() => {
    aviso.classList.remove("show");
    setTimeout(() => aviso.remove(), 300);
  }, 2500);
}

