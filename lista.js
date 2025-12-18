// ======= Containers e modal =======
const minhaListaContainer = document.getElementById("minha-lista");

const modal = document.getElementById("modal-detalhe");
const modalTitulo = document.getElementById("modal-titulo");
const modalPoster = document.getElementById("modal-poster");
const modalSinopse = document.getElementById("modal-sinopse");
const modalGenero = document.getElementById("modal-genero");
const btnFecharModal = document.querySelector(".btn-fechar-modal");
const trailerFrame = document.getElementById("trailer-frame");


// ===============================
// CORREÇÃO: função para montar src da imagem corretamente
// ===============================
function construirSrcDaImagem(imagem) {
  if (!imagem) return "";

  // Se for URL absoluta
  if (/^https?:\/\//.test(imagem)) {
    return encodeURI(imagem);
  }

  // Se já vier com "img/"
  if (imagem.startsWith("img/")) {
    return encodeURI(imagem);
  }

  // Caso normal: só o filename (ex: "naruto classico.jpg")
  return encodeURI("img/" + imagem);
}



// ======= Armazenamento da lista =======
function pegarMinhaLista() {
  const listaJSON = localStorage.getItem("minhaLista");
  if (listaJSON) return JSON.parse(listaJSON);
  return [];
}

function salvarMinhaLista(lista) {
  localStorage.setItem("minhaLista", JSON.stringify(lista));
}

//========
function mostrarMensagem(texto) {
  if (!texto || texto.trim() === "") return;

  // Remove avisos antigos
  document.querySelectorAll(".mensagem-removida").forEach(el => el.remove());

  const aviso = document.createElement("div");
  aviso.className = "mensagem-removida";
  aviso.textContent = texto;

  document.body.appendChild(aviso);

  setTimeout(() => aviso.classList.add("show"), 10);

  setTimeout(() => {
    aviso.classList.remove("show");
    setTimeout(() => aviso.remove(), 300);
  }, 2500);
}


// ======= Renderização da lista =======
// ======= Renderização da lista (VERSÃO CORRIGIDA) =======
function renderizarMinhaLista() {
  const lista = pegarMinhaLista();
  minhaListaContainer.innerHTML = "";

  if (lista.length === 0) {
    minhaListaContainer.innerHTML = "<p>Sua lista está vazia.</p>";
    return;
  }

  lista.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("filme");

    // === CORREÇÃO DA IMAGEM AQUI ===
    const posterSrc = construirSrcDaImagem(item.imagem);

    div.innerHTML = `
      <div class="filme-wrapper">
        <img src="${posterSrc}" alt="${item.titulo}">
        <p>${item.titulo}</p>

        <div class="opcoes-filme">
          <button class="btn-info-minha-lista">👁 Ver mais</button>
          <button class="btn-remover-minha-lista">❌ Remover</button>
        </div>
      </div>
    `;

    // Abrir modal
    div.querySelector(".btn-info-minha-lista").addEventListener("click", () => {
      abrirModal(item);
    });

    // Remover da lista — CAPTURA o título ANTES e CHAMA mostrarMensagem aqui
    div.querySelector(".btn-remover-minha-lista").addEventListener("click", () => {
      const tituloRemovido = item.titulo;               // captura segura
      let atual = pegarMinhaLista();
      atual = atual.filter(f => f.titulo !== tituloRemovido);
      salvarMinhaLista(atual);

      // mostra aviso DO ITEM REMOVIDO e só então rerenderiza
      mostrarMensagem(`"${tituloRemovido}" foi removido da lista!`);

      // rerenderiza a lista atualizada
      renderizarMinhaLista();
    });

    minhaListaContainer.appendChild(div);
  });
}



// ======= Modal =======
function abrirModal(filme) {
  modalTitulo.textContent = filme.titulo;
  modalSinopse.textContent = filme.sinopse || filme.descricao || "Sem descrição";
  modalGenero.textContent = filme.genero || "—";

  // === MESMA CORREÇÃO AQUI ===
  modalPoster.src = construirSrcDaImagem(filme.imagem);
  modalPoster.alt = filme.titulo;

  // Trailer
  trailerFrame.src = filme.trailer || "";

  modal.style.display = "block";
}



// Fechar modal
btnFecharModal.addEventListener("click", () => {
  trailerFrame.src = "";
  modal.style.display = "none";
});

window.addEventListener("click", e => {
  if (e.target === modal) {
    trailerFrame.src = "";
    modal.style.display = "none";
  }
});



// ======= Tema / Configurações =======
const btnConfig = document.querySelector(".btn-config");
const submenu = document.querySelector(".submenu-config");
const btnTema = document.querySelector(".btn-tema");
const body = document.body;

btnConfig.addEventListener("click", () => submenu.classList.toggle("show"));

btnTema.addEventListener("click", () => {
  body.classList.toggle("tema-claro");
  btnTema.textContent = body.classList.contains("tema-claro")
    ? "Tema Escuro"
    : "Tema Claro";
});

document.addEventListener("click", (e) => {
  if (!submenu.contains(e.target) && !btnConfig.contains(e.target)) {
    submenu.classList.remove("show");
  }
});



// ======= Inicialização =======
document.addEventListener("DOMContentLoaded", () => {
  renderizarMinhaLista();
});
