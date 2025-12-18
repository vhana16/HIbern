const filmes = [
  { titulo: "Superman", descricao: "Clark Kent enfrenta o maior desafio de sua vida ao tentar salvar o mundo de uma ameaça cósmica.", imagem: "supermein.jpg", genero: "Super-Heróis", trailer: "videos/Superman.mp4" },
  { titulo: "Batman", descricao: "Bruce Wayne retorna como o Cavaleiro das Trevas para proteger Gotham de uma nova onda de crime.", imagem: "batman.jpg", genero: "Super-Heróis", trailer: "videos/Batman.mp4" },
  { titulo: "Mulher-Maravilha", descricao: "Criada entre as Amazonas, Diana usa seus poderes para proteger a humanidade e enfrentar forças que ameaçam o mundo.", imagem: "muiemaravia.jpg", genero: "Super-Heróis", trailer: "videos/Mulher Maravilha.mp4" },
  { titulo: "Dexter", descricao: "Dexter é um especialista forense que passa o dia solucionando crimes e a noite cometendo assassinatos. Inteligente e bonito, o assassino em série vive em conflito com seu instinto de matador e o desejo pela felicidade.", imagem: "dexter.jpg", genero: "Policial", trailer: "videos/Dexter.mp4" },
  { titulo: "Homem de Ferro", descricao: "Tony Stark deve usar sua inteligência e tecnologia para combater ameaças globais.", imagem: "homidifero.jpg", genero: "Super-Heróis", trailer: "videos/Homem de Ferro.mp4" },
  { titulo: "Capitão América", descricao: "Steve Rogers, um homem transformado em super-soldado, luta contra o mal durante a Segunda Guerra Mundial.", imagem: "capitainamega.jpg", genero: "Super-Heróis", trailer: "videos/Capitao America.mp4"  },
  { titulo: "O Coringa", descricao: "Arthur Fleck, um comediante fracassado, se transforma no vilão Coringa, um dos mais icônicos da DC.", imagem: "kuringa.jpg", genero: "Super-Heróis", trailer: "videos/Coringa.mp4"  },
  { titulo: "Shadowhunters: A Série", descricao: "Clary Fray descobre um mundo secreto de caçadores de sombras e seres sobrenaturais enquanto tenta salvar sua mãe.", imagem: "xedourranters.jpg", genero: "Fantasia", trailer: "videos/Shadow Hunters.mp4"},
  { titulo: "Todo Mundo em Pânico", descricao: "Uma paródia das histórias de terror e suspense, cheia de piadas e referências aos filmes populares de terror.", imagem: "todomunduinpanicu.jpg", genero: "Comédia", trailer: "videos/Todo Mundo em Panico.mp4" },
  { titulo: "Peaky Blinders", descricao: "Thomas Shelby lidera uma perigosa gangue em Birmingham enquanto enfrenta inimigos e busca poder no pós-guerra.", imagem: "peaky-blinders.jpg", genero: "Policial", trailer: "videos/Peaky Blinders.mp4" },
  { titulo: "Breaking Bad", descricao: "Walter White, um professor de química, começa a fabricar metanfetamina após ser diagnosticado com câncer.", imagem: "breaking-bad.jpg", genero: "Policial", trailer: "videos/Breaking Bad.mp4" }
];

const bolinhas = document.querySelectorAll(".bolinhas span");
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const poster = document.getElementById("poster");

let indexAtual = 0;
let intervalo;

// Troca de filme destaque
function trocarFilme(index) {
  bolinhas.forEach(b => b.classList.remove("ativa"));
  bolinhas[index].classList.add("ativa");

  titulo.textContent = filmes[index].titulo;
  descricao.textContent = filmes[index].descricao;
  poster.style.opacity = 0;

  setTimeout(() => {
    poster.src = `img/${filmes[index].imagem}`;
    poster.style.opacity = 1;
  }, 400);

  indexAtual = index;
}

// Clique nas bolinhas
bolinhas.forEach(bolinha => {
  bolinha.addEventListener("click", () => {
    clearInterval(intervalo);
    trocarFilme(parseInt(bolinha.dataset.index));
    iniciarAutoTroca();
  });
});

// Troca automática a cada 5s
function iniciarAutoTroca() {
  intervalo = setInterval(() => {
    indexAtual = (indexAtual + 1) % filmes.length;
    trocarFilme(indexAtual);
  }, 5000);
}
iniciarAutoTroca();

// ========Parte do carousel==========//

const carouselTrack = document.querySelector('.carousel-track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const itemwidth = document.querySelector('.carousel-item').offsetWidth + 10; // a largura do item mais a margem


// Duplica os itens para simular o loop 
const items = document.querySelectorAll('.carousel-item');
items.forEach(item => {
  const clone = item.cloneNode(true);
  carouselTrack.appendChild(clone);
});

let position = 0;
const totalItems = items.length;

nextBtn.addEventListener('click', () => {
  position += itemwidth;
  if (position >= totalItems * itemwidth) {
    position = 0; //Volta instantaneamente para o início visualmente
    //
  }
  carouselTrack.style.transform = `translateX(-${position}px)`;
});

prevBtn.addEventListener('click', ()=> {
  position -= itemwidth;
  if (position<0) {
    position = (totalItems - 1) * itemwidth;
  }
  carouselTrack.style.transform = `translateX(-${position}px)`;
});

/* ============================================

// script.js - módulo de busca substituto (substitua inteiro pelo conteúdo abaixo)
// NÃO usa 'alt' — usa data-* e arrays JS (filmes, seriesDestaque, desenhosDestaque, animesDestaque)

// IIFE para isolar
(() => {
  /* ==========================
     SELECTORS (ajuste se necessário)
     ========================== */

     
  const searchInput = document.getElementById('searchInput');
  const destaque = document.querySelector('.destaque');
  const catalogoAltas = document.querySelector('.catalogo-filmes');
  const catalogSeries = document.getElementById('catalogo-series-destaque');
  const catalogDesenhos = document.getElementById('catalogo-desenhos-destaque');
  const catalogAnimes = document.getElementById('catalogo-animes-destaque');
  const minhaListaSection = document.getElementById('secao-minha-lista');

  const searchResults = document.getElementById('searchResults');
  const resultsGrid = document.getElementById('resultsGrid');
  const singleResultHero = document.getElementById('singleResultHero');
  const notFoundMsg = document.getElementById('notFoundMsg');

  /* ==========================
     Helpers para construir masterMovies
     ========================== */

  // coleta itens já presentes no DOM (.filme)
  function collectFromDOM() {
    const nodes = Array.from(document.querySelectorAll('.filme'));
    return nodes.map((node, i) => {
      const img = node.querySelector('img');
      const title = node.dataset.title || node.dataset.titulo || '';
      const poster = node.dataset.poster || (img ? img.src : '');
      return {
        id: node.dataset.id || `dom-${i}-${(title||'').replace(/\s+/g,'_')}`,
        title: title,
        sinopse: node.dataset.sinopse || node.dataset.descricao || '',
        genre: node.dataset.genre || node.dataset.genero || '',
        year: node.dataset.year || node.dataset.ano || '',
        posterSrc: poster
      };
    });
  }

  // mapeia arrays JS (ex.: seriesDestaque) para o formato interno
  function mapArrayToMovies(arr, prefix = 'js') {
    if (!Array.isArray(arr)) return [];
    return arr.map((item, idx) => {
      const title = item.titulo || item.title || '';
      const rawImg = item.imagem || item.poster || '';
      const posterSrc = rawImg ? (rawImg.startsWith('http') || rawImg.startsWith('img/') ? rawImg : `img/${rawImg}`) : '';
      return {
        id: item.id || `${prefix}-${idx}-${title.replace(/\s+/g,'_').toLowerCase()}`,
        title: title,
        sinopse: item.descricao || item.sinopse || '',
        genre: item.genero || item.genre || '',
        year: item.ano || item.year || '',
        posterSrc: posterSrc
      };
    });
  }

  // elimina duplicatas por id/title
  function uniqueByTitle(arr) {
    const seen = new Set();
    return arr.filter(x => {
      const key = (x.title || '').toLowerCase();
      if (!key) return false;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  // constrói masterMovies combinando DOM + arrays JS
  let masterMovies = [];
  function buildMasterMovies() {
    let result = [];
    // DOM
    result.push(...collectFromDOM());
    // arrays JS globais (se existirem)
    if (typeof window.filmes !== 'undefined') result.push(...mapArrayToMovies(window.filmes, 'filmes'));
    if (typeof window.seriesDestaque !== 'undefined') result.push(...mapArrayToMovies(window.seriesDestaque, 'series'));
    if (typeof window.desenhosDestaque !== 'undefined') result.push(...mapArrayToMovies(window.desenhosDestaque, 'desenhos'));
    if (typeof window.animesDestaque !== 'undefined') result.push(...mapArrayToMovies(window.animesDestaque, 'animes'));
    // limpezas
    result = uniqueByTitle(result);
    masterMovies = result;
  }

  // Guarantee: tenta construir se masterMovies vazio
  function ensureMasterMovies() {
    if (!Array.isArray(masterMovies) || masterMovies.length === 0) {
      try { buildMasterMovies(); } catch (err) { console.warn('buildMasterMovies failed', err); masterMovies = collectFromDOM(); }
    }
  }

  /* ==========================
     Matching / Render
     ========================== */

  function matches(movie, term) {
    if (!movie) return false;
    const t = (movie.title || '').toString().toLowerCase();
    return (t).includes(term);
  }

  function clearSearchUI() {
    if (searchResults) searchResults.style.display = 'none';
    if (resultsGrid) resultsGrid.style.display = 'none';
    if (singleResultHero) singleResultHero.style.display = 'none';
    if (notFoundMsg) notFoundMsg.style.display = 'none';
  }

  function restoreMainSections() {
    if (destaque) destaque.style.display = 'block';
    if (catalogoAltas) catalogoAltas.style.display = 'block';
    if (catalogSeries) catalogSeries.style.display = 'block';
    if (catalogDesenhos) catalogDesenhos.style.display = 'block';
    if (catalogAnimes) catalogAnimes.style.display = 'block';
    if (minhaListaSection) minhaListaSection.style.display = 'block';
    clearSearchUI();
  }

  function renderGrid(items) {
    if (!resultsGrid) return;
    resultsGrid.innerHTML = '';
    items.forEach(m => {
      const div = document.createElement('div');
      div.className = 'result-card';
      div.innerHTML = `
        <img src="${m.posterSrc || ''}" alt="${escapeHtml(m.title || '')}">
        <h3>${escapeHtml(m.title || '')}</h3>
        <p class="meta">${escapeHtml(m.genre || '')}</p>
        <div class="result-actions">
          <button class="btn-info-result" data-title="${escapeAttr(m.title || '')}">Ver mais</button>
          <button class="btn-add-result" data-title="${escapeAttr(m.title || '')}">➕ Minha lista</button>
        </div>
      `;
      resultsGrid.appendChild(div);
    });
    if (searchResults) searchResults.style.display = 'block';
    resultsGrid.style.display = 'grid';
  }

  function renderHero(m) {
    if (!singleResultHero) return;
    const poster = m.posterSrc || '';
    const title = m.title || '';
    const meta = `${m.year || ''}${m.genre ? ' • ' + m.genre : ''}`;
    singleResultHero.innerHTML = `
      <div class="single-hero-card">
        <img src="${poster}" alt="${escapeHtml(title)}">
        <div class="single-hero-info">
          <h2>${escapeHtml(title)}</h2>
          <p class="meta">${escapeHtml(meta)}</p>
          <p class="sinopse">${escapeHtml(m.sinopse || '')}</p>
          <div class="hero-actions">
            <button class="btn-add-result" data-title="${escapeAttr(title)}">➕ Minha lista</button>
            <button class="btn-info-result" data-title="${escapeAttr(title)}">Ver mais</button>
          </div>
        </div>
      </div>
    `;
    if (searchResults) searchResults.style.display = 'block';
    singleResultHero.style.display = 'block';
  }

  // small helpers to avoid XSS issues in innerHTML
  function escapeHtml(str) {
    return (str || '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  function escapeAttr(str) {
    return (str || '').replace(/"/g,'&quot;');
  }

  /* ==========================
     Search handler
     ========================== */
     

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      ensureMasterMovies();
      const term = (e.target.value || '').trim().toLowerCase();

      if (!term) {
        restoreMainSections();
        return;
      }

      // hide main
      if (destaque) destaque.style.display = 'none';
      if (catalogoAltas) catalogoAltas.style.display = 'none';
      if (catalogSeries) catalogSeries.style.display = 'none';
      if (catalogDesenhos) catalogDesenhos.style.display = 'none';
      if (catalogAnimes) catalogAnimes.style.display = 'none';
      if (minhaListaSection) minhaListaSection.style.display = 'none';

      // filter
      const pool = Array.isArray(masterMovies) ? masterMovies : [];
      const found = pool.filter(m => matches(m, term));

      if (!found || found.length === 0) {
        if (resultsGrid) resultsGrid.style.display = 'none';
        if (singleResultHero) singleResultHero.style.display = 'none';
        if (notFoundMsg) notFoundMsg.style.display = 'block';
        if (searchResults) searchResults.style.display = 'block';
        return;
      }

      if (notFoundMsg) notFoundMsg.style.display = 'none';

      if (found.length === 1) {
        if (resultsGrid) resultsGrid.style.display = 'none';
        renderHero(found[0]);
      } else {
        if (singleResultHero) singleResultHero.style.display = 'none';
        renderGrid(found);
      }
    });
  }

  /* ==========================
     Delegation: botão Ver mais / Adicionar
     ========================== */

  // Resultado grid delegation
  if (resultsGrid) {
    resultsGrid.addEventListener('click', (e) => {
      const btn = e.target;
      if (btn.classList.contains('btn-info-result')) {
        const title = (btn.dataset.title || '').toLowerCase();
        ensureMasterMovies();
        const movie = (masterMovies || []).find(m => (m.title || '').toLowerCase() === title);
        if (movie && typeof abrirDetalhe === 'function') {
          abrirDetalhe(movie);
        } else if (movie) {
          // fallback: open hero
          renderHero(movie);
        }
      } else if (btn.classList.contains('btn-add-result')) {
        const title = btn.dataset.title || '';
        if (typeof adicionarAMinhaLista === 'function') adicionarAMinhaLista(title);
      }
    });
  }

  // Single hero delegation
  if (singleResultHero) {
    singleResultHero.addEventListener('click', (e) => {
      const btn = e.target;
      if (btn.classList.contains('btn-add-result')) {
        const title = btn.dataset.title || '';
        if (typeof adicionarAMinhaLista === 'function') adicionarAMinhaLista(title);
      } else if (btn.classList.contains('btn-info-result')) {
        const title = (btn.dataset.title || '').toLowerCase();
        ensureMasterMovies();
        const movie = (masterMovies || []).find(m => (m.title || '').toLowerCase() === title);
        if (movie && typeof abrirDetalhe === 'function') abrirDetalhe(movie);
      }
    });
  }

//============================================================================================//

  // ex: configurar os botões inseridos dinamicamente
  document.querySelectorAll('.btn-add-result').forEach(b => {
    b.addEventListener('click', () => {
      const movie = filmes.find(f => f.titulo.toLowerCase() === b.dataset.title.toLowerCase()) ||
                    masterMovies.find(mm => mm.title.toLowerCase() === b.dataset.title.toLowerCase());
      if (movie && !minhaLista.some(m => m.titulo === (movie.titulo || movie.title))) {
        // padroniza o objeto que guardamos na minhaLista (usar a estrutura do array filmes)
        const obj = filmes.find(f => f.titulo.toLowerCase() === b.dataset.title.toLowerCase()) || { titulo: movie.title, imagem: movie.posterSrc };
        minhaLista.push(obj);
        mostrarMinhaLista();
      }
    });
  });

  document.querySelectorAll('.btn-info-result').forEach(b => {
    b.addEventListener('click', () => {
      // abre modal (procure pelo filme no array filmes/series)
      const movie = filmes.find(f => f.titulo.toLowerCase() === b.dataset.title.toLowerCase()) ||
                    seriesDestaque.find(s => s.titulo.toLowerCase() === b.dataset.title.toLowerCase()) ||
                    masterMovies.find(mm => mm.title.toLowerCase() === b.dataset.title.toLowerCase());
      if (movie) abrirDetalhe(movie);
    });
  });


// === CATÁLOGOS ===
// aponta para o container dos itens do carousel principal
const filmesContainerAltas = document.getElementById("itemsContainer");
const filmesContainerSeries = document.getElementById("container-series-destaque");
const filmesContainerDesenhos = document.getElementById("container-desenhos-destaque");
const filmesContainerAnimes = document.getElementById("container-animes-destaque");

let minhaLista = [];

function atualizarCatalogo(lista, container) {
  container.innerHTML = "";
  lista.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("filme");
    div.innerHTML = `
      <div class="filme-wrapper">
        <img src="img/${item.imagem}" alt="${item.titulo}">
        <div class="opcoes-filme">
          <button class="btn-info" data-titulo="${item.titulo}">👁 Ver mais</button>
          <button class="btn-add" data-titulo="${item.titulo}">➕ Minha lista</button>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
  configurarBotoes();   // mantém o modal funcionando
  configurarBotoesAdd(); // liga todos os botões “➕ Minha lista”
}


// ----------------- TOAST / NOTIFICAÇÃO UNIFICADA -----------------
function showToast(text, { type = "info", duration = 2000 } = {}) {
  if (!text) return;

  // remove toasts antigos
  document.querySelectorAll(".global-toast").forEach(t => {
    t.classList.remove("show");
    setTimeout(() => t.remove(), 200);
  });

  const toast = document.createElement("div");
  toast.className = "global-toast global-toast-" + type;
  toast.textContent = text;

  Object.assign(toast.style, {
    position: "fixed",
    right: "20px",
    bottom: "20px",
    padding: "10px 14px",
    borderRadius: "10px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
    zIndex: 99999,
    opacity: 0,
    transform: "translateY(8px)",
    transition: "all .22s ease"
  });

  // cores mínimas por tipo (se quiser, mova para CSS)
  if (type === "success") {
    toast.style.background = "#16a34a";
    toast.style.color = "#fff";
  } else if (type === "error") {
    toast.style.background = "#dc2626";
    toast.style.color = "#fff";
  } else {
    toast.style.background = "#111";
    toast.style.color = "#fff";
  }

  document.body.appendChild(toast);
  // forçar reflow para iniciar a animação
  requestAnimationFrame(() => {
    toast.style.opacity = 1;
    toast.style.transform = "translateY(0)";
  });

  setTimeout(() => {
    toast.style.opacity = 0;
    toast.style.transform = "translateY(8px)";
    setTimeout(() => toast.remove(), 220);
  }, duration);
}
// ----------------- fim do toast -----------------


function adicionarAMinhaLista(tituloFilme) {
  const filme = filmes.find(f => f.titulo === tituloFilme) ||
                 seriesDestaque.find(s => s.titulo === tituloFilme) ||
                 desenhosDestaque.find(d => d.titulo === tituloFilme) ||
                 masterMovies.find(m => m.title === tituloFilme);

  if (!filme) return;

  const nomeFilme = filme.titulo || filme.title;

  // Pega a lista atual do localStorage
  let listaAtual = JSON.parse(localStorage.getItem("minhaLista")) || [];

  // Evita duplicatas
  if (!listaAtual.some(f => f.titulo === nomeFilme)) {
    const obj = {
      titulo: nomeFilme,
      imagem: filme.imagem || filme.posterSrc
    };
    listaAtual.push(obj);

    // Salva no localStorage
    localStorage.setItem("minhaLista", JSON.stringify(listaAtual));

    // Atualiza a lista local da página (opcional)
    minhaLista = listaAtual;

    mostrarMinhaLista(); // se você quiser atualizar a seção “Minha Lista” na mesma página
showToast(`"${nomeFilme}" foi adicionado à sua lista!`, { type: "success" });


  }
}

function configurarBotoesAdd() {
  document.querySelectorAll('.btn-add, .btn-add-result').forEach(btn => {
    if (btn._clickHandler) btn.removeEventListener('click', btn._clickHandler);

    btn._clickHandler = () => {
      const titulo = btn.dataset.titulo;
      adicionarAMinhaLista(titulo); // agora salva no localStorage
    };

    btn.addEventListener('click', btn._clickHandler);
  });
}

function configurarBotoes(){
  document.querySelectorAll(".btn-info").forEach(btn => {
    btn.addEventListener("click", () => {
      const filme = filmes.find(f => f.titulo === btn.dataset.titulo) ||
                    seriesDestaque.find(s => s.titulo === btn.dataset.titulo) ||
                    desenhosDestaque.find(d => d.titulo === btn.dataset.titulo) ||
                    animesDestaque.find(a => a.titulo === btn.dataset.titulo); // <-- adicionado
      if (filme) {
        abrirDetalhe(filme);
      }
    });
  });

  document.querySelectorAll(".btn-add").forEach(btn => {  
    btn.addEventListener("click", () => {
      const filme = filmes.find(f => f.titulo === btn.dataset.titulo) ||
                    seriesDestaque.find(s => s.titulo === btn.dataset.titulo) ||
                    desenhosDestaque.find(d => d.titulo === btn.dataset.titulo) ||
                    animesDestaque.find(a => a.titulo === btn.dataset.titulo); // <-- adicionado
      if (filme && !minhaLista.some(f => f.titulo === filme.titulo)) {
        minhaLista.push(filme);
        mostrarMinhaLista();
      }
    });
  });
}

atualizarCatalogo(filmes, filmesContainerAltas);

const seriesDestaque = [
  { titulo: "Peaky Blinders", descricao: "Thomas Shelby lidera uma perigosa gangue em Birmingham enquanto enfrenta inimigos e busca poder no pós-pós-guerra.", imagem: "peaky-blinders.jpg", genero: "Policial", trailer: "videos/Peaky Blinders.mp4" },
  { titulo: "Breaking Bad", descricao: "Walter White, um professor de química, começa a fabricar metanfetamina após ser diagnosticado com câncer.", imagem: "breaking-bad.jpg", genero: "Policial", trailer: "videos/Breaking Bad.mp4" },
  { titulo: "Shadowhunters: A Série", descricao: "Clary Fray descobre um mundo secreto de caçadores de sombras e seres sobrenaturais enquanto tenta salvar sua mãe.", imagem: "xedourranters.jpg", genero: "Fantasia", trailer: "videos/Shadow Hunters.mp4" },
  { titulo: "Dexter", descricao: "Dexter é um especialista forense que passa o dia solucionando crimes e a noite cometendo assassinatos. Inteligente e bonito, o assassino em série vive em conflito com seu instinto de matador e o desejo pela felicidade.", imagem: "dexter.jpg", genero: "Policial", trailer: "videos/Dexter.mp4" },
  { titulo: "The Witcher", descricao: "O mutante Geralt de Rívia é um caçador de monstros que luta para encontrar seu lugar em um mundo onde as pessoas, muitas vezes, são mais perversas do que as criaturas selvagens.", imagem: "deuitier.jpg", genero: "Aventura", trailer: "videos/The Witcher.mp4" },
  { titulo: "Stranger Things", descricao: "Stranger Things é uma série de suspense e ficção científica sobre crianças que enfrentam fenômenos sobrenaturais em uma pequena cidade nos anos 1980", imagem: "stranger things.jpg", genero: "Suspense", trailer: "videos/Stranger Things.mp4" },
  { titulo: "Better Call Saul", descricao: "Better Call Saul é uma série dramática que acompanha a transformação de Jimmy McGill, um advogado comum, no astuto e inescrupuloso Saul Goodman, personagem de Breaking Bad.", imagem: "better call saul.jpg", genero: "Drama", trailer: "videos/Better Call Saul.mp4" },
  { titulo: "Supernatural", descricao: "Supernatural acompanha os irmãos Sam e Dean Winchester enquanto viajam pelos EUA caçando monstros, demônios e fantasmas, enfrentando forças sobrenaturais e protegendo o mundo do mal.", imagem: "supernatural.jpg", genero: "Fantasia", trailer: "videos/Supernatural.mp4" },
];
atualizarCatalogo(seriesDestaque, filmesContainerSeries);

const desenhosDestaque = [
  { titulo: "Rick and Morty", descricao: "Um cientista louco e seu neto embarcam em aventuras interdimensionais.", imagem: "rick-morty.jpg", genero: "Animação", trailer: "videos/Rick and Morty.mp4" },
  { titulo: "Hora de Aventura", descricao: "Finn vive grandes aventuras na terra de Ooo na companhia de seu melhor amigo, Jake. De viagens a reinos alucinantes a lutas contra vampiros, os dois estão prontos para enfrentar qualquer perigo.", imagem: "adventure-time.jpg", genero: "Animação", trailer: "videos/Hora de Aventura.mp4" },
  { titulo: "Ben 10 Clássico", descricao: "Ben 10 acompanha Ben Tennyson, um garoto de 10 anos que encontra o Omnitrix, um relógio alienígena que lhe permite se transformar em diversos alienígenas. Junto com sua prima Gwen e o avô Max, ele enfrenta vilões e protege o mundo em aventuras cheias de desafios", imagem: "ben10.jpg", genero: "Animação", trailer: "videos/ben10.mp4" },
  { titulo: "O Incrível Mundo de Gumball", descricao: "O Incrível Mundo de Gumball acompanha Gumball e sua família em aventuras engraçadas e malucas na cidade de Elmore.", imagem: "gumball.jpg", genero: "Animação", trailer: "videos/Gumball.mp4" },
  { titulo: "Apenas um Show", descricao: "Apenas um Show é um desenho animado sobre dois amigos, Mordecai (um gaiato) e Rigby (um guaxinim), que vivem aventuras bizarras e engraçadas enquanto trabalham em um parque.", imagem: "apenas-um-show.jpg", genero: "Animação", trailer: "videos/Apenas um Show.mp4" },
  { titulo: "Os Simpsons", descricao: "Os Simpsons é um desenho animado que acompanha a família Simpson — Homer, Marge, Bart, Lisa e Maggie — vivendo situações engraçadas e satíricas na cidade de Springfield.", imagem: "os-simpsons.jpg", genero: "Animação", trailer: "videos/Os Simpsons.mp4" },
  { titulo: "Scooby-Doo", descricao: "Scooby-Doo é um desenho animado sobre um grupo de amigos e seu cachorro falante, Scooby-Doo, que resolvem mistérios envolvendo monstros e fantasmas, geralmente desmascarando vilões disfarçados.", imagem: "scooby-doo.jpg", genero: "Animação", trailer: "videos/Scooby Doo.mp4" },
  { titulo: "Bob Esponja", descricao: "Bob Esponja é um desenho animado que acompanha as aventuras engraçadas de Bob Esponja, uma esponja otimista que mora no fundo do mar, junto com seus amigos na Fenda do Biquíni.", imagem: "bob esponja.jpg", genero: "Animação", trailer: "videos/Bob Esponja.mp4" },

];
atualizarCatalogo(desenhosDestaque, filmesContainerDesenhos);

const animesDestaque = [
  { titulo: "Dragon Ball Z", descricao: "Dragon Ball Z é um anime que segue Goku e seus amigos enquanto protegem a Terra de poderosos inimigos alienigenas, participam de batalhas épicas e buscam superar seus próprios limites. ", imagem: "dragon-ball-z.jpg", genero: "Açao", trailer: "videos/Dragon Ball Z.mp4" },
  { titulo: "Naruto Clássico", descricao: "Naruto é um anime que acompanha Naruto Uzumaki, um jovem ninja que carrega dentro de si a poderosa Raposa de Nove Caudas, um demônio que atacou sua vila no passado. Ele luta para ser reconhecido pelos outros, superar desafios, e se tornar líder da aldeia.", imagem: "naruto-classico.jpg", genero: "Açao", trailer: "videos/Naruto.mp4" },
  { titulo: "One Piece", descricao: "One Piece é um anime que acompanha Monkey D. Luffy e sua tripulação de piratas em busca do tesouro lendário “One Piece”, enfrentando inimigos, explorando ilhas exóticas e vivendo aventuras épicas pelo mundo.", imagem: "one-piece.jpg", genero: "Aventura", trailer: "videos/One Piece.mp4" },
  { titulo: "Bleach", descricao: "Bleach é um anime que acompanha Ichigo Kurosaki, um adolescente que ganha poderes de Ceifador de Almas de Rukia Kuchiki, protegendo os vivos de espíritos malignos e guiando almas perdidas, enquanto luta para devolver os poderes à própria Rukia.", imagem: "bleach.jpg", genero: "Fantasia", trailer: "videos/Bleach.mp4" },
  { titulo: "Pokemon", descricao: "Pokémon é um anime que acompanha Ash Ketchum e seu Pikachu em aventuras pelo mundo, capturando e treinando criaturas chamadas Pokémon, participando de batalhas e competições enquanto busca se tornar um Mestre Pokémon.", imagem: "pokemon.jpg", genero: "Aventura", trailer: "videos/Pokemon.mp4" },
  { titulo: "Death Note", descricao: "Death Note é um anime que acompanha Light Yagami, um estudante que encontra um caderno capaz de matar qualquer pessoa cujo nome seja escrito nele, e sua batalha de inteligência contra o melhor detetive do mundo L, para criar um mundo livre da criminalidade.", imagem: "death-note.jpg", genero: "Thriller Psicológico", trailer: "videos/Death Note.mp4" },
  { titulo: "Jujutsu Kaisen", descricao: "Jujutsu Kaisen é um anime que acompanha Yuji Itadori, um estudante que ingere um objeto amaldiçoado poderoso, tornando-se hospedeiro de uma maldição. Ele se junta a feiticeiros para combater maldições perigosas e proteger as pessoas de forças sobrenaturais.", imagem: "jujutsu-kaisen.jpg", genero: "Fantasia", trailer: "videos/Jujutsu Kaisen.mp4" },
  { titulo: "Attack On Titan", descricao: "Attack on Titan é um anime que acompanha Eren Yeager e seus amigos enquanto lutam para proteger a humanidade de gigantes devoradores de humanos, chamados Titãs, em um mundo cercado por enormes muralhas, explorando mistérios, batalhas intensas e dilemas morais.", imagem: "attack-on-titan.jpg", genero: "Açao", trailer: "videos/Attack On Titan.mp4" },
  { titulo: "Blue Lock", descricao: "Atacantes competem em um projeto extremo para criar o melhor artilheiro do mundo.", imagem: "blue-lock.jpg", genero: "Esporte", trailer: "" },
{ titulo: "Monster", descricao: "Um neurocirurgião brilhante mergulha em uma jornada sombria ao tentar resolver uma série de assassinatos envolvendo um paciente que ele salvou.", imagem: "monster.jpg", genero: "Thriller psicológico", trailer: "" },
{ titulo: "Mob Psycho 100", descricao: "Um garoto poderoso tenta viver normalmente enquanto controla seus poderes psíquicos.", imagem: "mob-psycho.jpg", genero: "Sobrenatural", trailer: "" },
]
atualizarCatalogo(animesDestaque, filmesContainerAnimes);

/* ====== PATCH: construir masterMovies a partir dos arrays JS (cole após os atualizarCatalogo(...)) ====== */

// converte um array (filmes/series/desenhos/animes) para o formato da busca
function mapArrayToMovies(arr, prefix = 'js') {
  if (!Array.isArray(arr)) return [];
  return arr.map((item, i) => {
    const title = (item.titulo || item.title || '').toString();
    const rawImg = item.imagem || item.poster || '';
    const poster = rawImg
      ? (rawImg.startsWith('http') || rawImg.startsWith('img/') ? rawImg : 'img/' + rawImg)
      : '';
    return {
      id: item.id || `${prefix}-${i}-${title.replace(/\s+/g,'_').toLowerCase()}`,
      title: title,
      sinopse: item.descricao || item.sinopse || '',
      genre: item.genero || item.genre || '',
      year: item.ano || item.year || '',
      posterSrc: poster
    };
  });
}

// coleta do DOM como fallback (não depende de alt para ser fonte principal)
function collectFromDOMForMaster() {
  return Array.from(document.querySelectorAll('.filme')).map((node, i) => {
    const img = node.querySelector('img');
    const title = node.dataset.title || node.dataset.titulo || '';
    const poster = node.dataset.poster || (img ? img.src : '');
    return {
      id: node.dataset.id || `dom-${i}-${(title||'').replace(/\s+/g,'_')}`,
      title: title,
      sinopse: node.dataset.sinopse || node.dataset.descricao || '',
      genre: node.dataset.genre || node.dataset.genero || '',
      year: node.dataset.year || node.dataset.ano || '',
      posterSrc: poster
    };
  });
}

// remove duplicados por título (case-insensitive)
function uniqueByTitle(arr) {
  const seen = new Set();
  return arr.filter(x => {
    const key = (x.title || '').toString().trim().toLowerCase();
    if (!key) return false;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// cria/atualiza masterMovies juntando arrays JS + DOM
function buildMasterMovies() {
  let pool = [];

  // 1) coloca os arrays JS (sempre preferir os dados JS)
  if (typeof filmes !== 'undefined') pool.push(...mapArrayToMovies(filmes, 'filmes'));
  if (typeof seriesDestaque !== 'undefined') pool.push(...mapArrayToMovies(seriesDestaque, 'series'));
  if (typeof desenhosDestaque !== 'undefined') pool.push(...mapArrayToMovies(desenhosDestaque, 'desenhos'));
  if (typeof animesDestaque !== 'undefined') pool.push(...mapArrayToMovies(animesDestaque, 'animes'));

  // 2) adiciona itens que existam no DOM (fallback) — evita perder algo que só esteja no HTML
  pool.push(...collectFromDOMForMaster());

  // 3) remove duplicatas e atribui global
  masterMovies = uniqueByTitle(pool);
}

// garante que masterMovies esteja pronto antes da busca
function ensureMasterMoviesReady() {
  if (!Array.isArray(masterMovies) || masterMovies.length === 0) {
    buildMasterMovies();
  }
}

// chama uma vez agora (já que você declarou filmes/series/desenhos/animes antes)
buildMasterMovies();

// opcional: garantir rebuild no load também
window.addEventListener('load', () => {
  buildMasterMovies();
});
/* ====== fim do patch ====== */

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".fechar").addEventListener("click", () => {
    const modal = document.getElementById("modal-detalhe");
    const trailerFrame = document.getElementById("trailer-frame");
    trailerFrame.src = "";
    modal.style.display = "none";
  });

  document.querySelector(".btn-fechar-modal").addEventListener("click", () => {
    const modal = document.getElementById("modal-detalhe");
    const trailerFrame = document.getElementById("trailer-frame");
    trailerFrame.src = "";
    modal.style.display = "none";
  });

  document.querySelector(".btn-assistir-modal").addEventListener("click", () => {
    const trailerFrame = document.getElementById("trailer-frame");
    // Ação extra ao clicar "▶ Assistir" pode ser adicionada aqui
  });
});

// === MODAL DE DETALHE ===
function abrirDetalhe(filme) {
  const modal = document.getElementById("modal-detalhe");
  const poster = document.getElementById("modal-poster");
  const tituloModal = document.getElementById("modal-titulo");
  const sinopse = document.getElementById("modal-sinopse");
  const generoElem = document.getElementById("modal-genero");
  const trailerFrame = document.getElementById("trailer-frame");

  poster.src = "img/" + filme.imagem;
  poster.alt = filme.titulo;
  tituloModal.textContent = filme.titulo;
  sinopse.textContent = filme.descricao;
  generoElem.textContent = filme.genero;

  if (filme.trailer) {
    trailerFrame.src = filme.trailer;
  } else {
    trailerFrame.src = "";
  }

  modal.style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".fechar").addEventListener("click", () => {
    const modal = document.getElementById("modal-detalhe");
    const trailerFrame = document.getElementById("trailer-frame");
    trailerFrame.src = "";
    modal.style.display = "none";
  });

  document.querySelector(".btn-fechar-modal").addEventListener("click", () => {
    const modal = document.getElementById("modal-detalhe");
    const trailerFrame = document.getElementById("trailer-frame");
    trailerFrame.src = "";
    modal.style.display = "none";
  });

  document.querySelector(".btn-assistir-modal").addEventListener("click", () => {
    const trailerFrame = document.getElementById("trailer-frame");
    // Ação extra ao clicar "▶ Assistir" pode ser adicionada aqui
  });
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

/*========PADRONIZANDO OS RESULTADOS DA PESQUISA==============*/
function renderResultsGrid(items) {
  resultsGrid.innerHTML = '';

  items.forEach(m => {
    const card = document.createElement('div');
    card.classList.add('result-card');

    card.innerHTML = `
      <img src="${m.posterSrc}" alt="${m.title}">
      <h3>${m.title}</h3>

      <button class="btn-add" data-titulo="${m.title}">➕ Minha lista</button>
      <button class="btn-info" data-titulo="${m.title}">👁 Ver mais</button>
    `;
    resultsGrid.appendChild(card);
  });

  // LIGA OS BOTÕES NOVOS
  configurarBotoes();
}


//=================serve pra ao clicar na imagem abrir o modal tbm

// Faz as imagens do carousel abrirem o modal
document.querySelectorAll('.filme').forEach(filmeDiv => {
  filmeDiv.addEventListener('click', (e) => {
    // se clicou em um botão dentro da div, não abre o modal
    if (e.target.tagName.toLowerCase() === 'button') return;

    // pega o img dentro da div
    const img = filmeDiv.querySelector('img');
    if (!img) return;

    const titulo = img.alt;
    const movie = filmes.find(f => f.titulo === titulo) || seriesDestaque.find(f => f.titulo === titulo);
    if (movie) {
      abrirDetalhe(movie);
    }
  });
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


