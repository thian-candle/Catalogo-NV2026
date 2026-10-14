/* =====================================================
   CONFIGURACIÓN GENERAL
===================================================== */
const TOTAL = 35;
const WHATSAPP = "573104239237";

const book = document.getElementById("book");
const slider = document.getElementById("slider");
const counter = document.getElementById("counter");
const purchase = document.getElementById("purchase");
const productTitle = document.getElementById("productTitle");
const order = document.getElementById("order");

let current = 1;
let last = 0;

/* =====================================================
   PRODUCTOS DEL CATÁLOGO
===================================================== */
const products = {
  3: "Velitas Florecer Navideño",
  4: "Velitas Luz de Estrella",
  5: "Velitas Destellos de Navidad",
  6: "Velitas Pinos de Luz",
  7: "Velas de Mascotas – set x 2",
  8: "Velas de Mascotas – set x 2",
  10: "Set Noche de Paz",
  11: "Set Nacimiento de Fe",
  12: "Colección Milagro de Navidad",
  13: "Mini Detalles Navideños",
  14: "Blanca Navidad",
  16: "Vela aromática Grinch Vibes",
  17: "Vela decorativa Dulcemente Grinch",
  19: "Dulce Navidad en Cristal",
  21: "Línea Luz de Navidad – personalizada",
  22: "Línea Luz de Navidad – personalizada",
  23: "Velas personalizadas",
  24: "Velas personalizadas",
  25: "Velas personalizadas",
  27: "Velas Tradicionales Golden",
  28: "Velas Tradicionales Golden en caja",
  29: "Velas Tradicionales Golden en caja",
  30: "Velas Tradicionales Golden en caja",
  31: "Velas Tradicionales Golden en caja",
  32: "Velas navideñas tradicionales",
  33: "Velas navideñas tradicionales",
  34: "Velas navideñas religiosas",
};

/* =====================================================
   SECCIONES DEL CATÁLOGO
===================================================== */
const sections = [
  ["Portada", 1],
  ["Línea de Deseos", 2],
  ["Combos & Sets", 9],
  ["Línea Grinch", 15],
  ["Colección Navideña", 18],
  ["Velas Tradicionales Personalizadas", 20],
  ["Velas Tradicionales Golden", 26],
  ["Gracias por elegirnos", 35],
];

/* =====================================================
   UTILIDADES - RUTAS DE IMÁGENES
===================================================== */
const src = (n) => `images/pagina-${String(n).padStart(2, "0")}.webp`;

/* =====================================================
   REVISTA DIGITAL - VISUALIZACIÓN DE PÁGINAS
===================================================== */
function show(n) {
  current = Math.min(TOTAL, Math.max(1, Number(n)));
  book.innerHTML = "";

  const page = document.createElement("div");
  page.className =
    "page " +
    (current > last ? "enter-left" : current < last ? "enter-right" : "");

  const img = document.createElement("img");
  img.src = src(current);
  img.alt = `Página ${current} del catálogo navideño`;
  img.loading = "eager";
  img.onclick = () => zoomPage(current);

  page.appendChild(img);
  book.appendChild(page);

  last = current;
  slider.value = current;
  counter.textContent = `Página ${current} de ${TOTAL}`;

  document.getElementById("prev").disabled = current === 1;
  document.getElementById("next").disabled = current === TOTAL;

  updateProduct(current);
}

/* =====================================================
   INFORMACIÓN DEL PRODUCTO Y PEDIDOS
===================================================== */
function updateProduct(page) {
  const product = products[page];
  purchase.hidden = !product;

  if (!product) return;

  productTitle.textContent = product;

  const message = `¡Hola, Thian Candle! 🎄🕯️ Vi en su catálogo navideño 2026 el producto «${product}» (página ${page}) y quisiera realizar un pedido. ¿Me brindan información?`;

  order.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

/* =====================================================
   NAVEGACIÓN - BOTONES Y CONTROL DESLIZANTE
===================================================== */
function advance(direction) {
  show(current + direction);
}

document.getElementById("prev").onclick = () => advance(-1);
document.getElementById("next").onclick = () => advance(1);
slider.oninput = (e) => show(e.target.value);

/* =====================================================
   NAVEGACIÓN - TECLADO
===================================================== */
document.addEventListener("keydown", (e) => {
  if (document.querySelector("dialog[open]")) return;

  if (e.key === "ArrowRight") advance(1);
  if (e.key === "ArrowLeft") advance(-1);
});

/* =====================================================
   NAVEGACIÓN - GESTOS TÁCTILES
===================================================== */
let startX = 0;

book.addEventListener(
  "touchstart",
  (e) => {
    startX = e.touches[0].clientX;
  },
  { passive: true },
);

book.addEventListener(
  "touchend",
  (e) => {
    const delta = e.changedTouches[0].clientX - startX;
    if (Math.abs(delta) > 50) advance(delta < 0 ? 1 : -1);
  },
  { passive: true },
);

/* =====================================================
   MODAL - ÍNDICE DEL CATÁLOGO
===================================================== */
const indexDialog = document.getElementById("indexDialog");
const chapters = document.getElementById("chapters");

document.getElementById("toc").onclick = () => indexDialog.showModal();
document.getElementById("closeIndex").onclick = () => indexDialog.close();

sections.forEach(([label, page]) => {
  const button = document.createElement("button");
  button.textContent = `${label} · pág. ${page}`;
  button.onclick = () => {
    show(page);
    indexDialog.close();
  };
  chapters.appendChild(button);
});

/* =====================================================
   MODAL - VISOR DE PÁGINAS
===================================================== */
const zoomDialog = document.getElementById("zoomDialog");
const zoomImage = document.getElementById("zoomImage");
const zoomCounter = document.getElementById("zoomCounter");
const zoomPrev = document.getElementById("zoomPrev");
const zoomNext = document.getElementById("zoomNext");

let zoomCurrent = 1;

function updateZoom(page) {
  zoomCurrent = Math.min(TOTAL, Math.max(1, Number(page)));

  zoomImage.src = src(zoomCurrent);
  zoomImage.alt = `Página ${zoomCurrent} del catálogo navideño`;
  zoomCounter.textContent = `Página ${zoomCurrent} de ${TOTAL}`;

  const isFirst = zoomCurrent === 1;
  const isLast = zoomCurrent === TOTAL;

  zoomImage.style.animation = "none";
  void zoomImage.offsetWidth;
  zoomImage.style.animation = "zoomFade .3s ease";

  zoomPrev.disabled = isFirst;
  zoomNext.disabled = isLast;
  zoomPrevFloat.disabled = isFirst;
  zoomNextFloat.disabled = isLast;
}

function zoomPage(page) {
  updateZoom(page);
  if (!zoomDialog.open) zoomDialog.showModal();
}

function navigateZoom(direction) {
  updateZoom(zoomCurrent + direction);
  show(zoomCurrent);
}

zoomPrev.addEventListener("click", () => navigateZoom(-1));
zoomNext.addEventListener("click", () => navigateZoom(1));

document.getElementById("zoom").onclick = () => zoomPage(current);
document.getElementById("closeZoom").onclick = () => zoomDialog.close();

/* =====================================================
   VISOR - NAVEGACIÓN FLOTANTE
===================================================== */
const zoomPrevFloat = document.getElementById('zoomPrevFloat');
const zoomNextFloat = document.getElementById('zoomNextFloat');

zoomPrevFloat.addEventListener('click', () => navigateZoom(-1));
zoomNextFloat.addEventListener('click', () => navigateZoom(1));

/* Cerrar al tocar fuera del contenido */
zoomDialog.addEventListener("click", (e) => {
  if (e.target === zoomDialog) zoomDialog.close();
});

/* Navegación con teclado */
document.addEventListener("keydown", (e) => {
  if (!zoomDialog.open) return;

  if (e.key === "ArrowRight") {
    e.preventDefault();
    navigateZoom(1);
  }

  if (e.key === "ArrowLeft") {
    e.preventDefault();
    navigateZoom(-1);
  }
});

/* =====================================================
   VISOR - NAVEGACIÓN TÁCTIL
===================================================== */
const zoomContent = document.querySelector('.zoom-content');

let zoomStartX = 0;
let zoomStartY = 0;

zoomContent.addEventListener('touchstart', e => {
    zoomStartX = e.touches[0].clientX;
    zoomStartY = e.touches[0].clientY;
}, { passive: true });

zoomContent.addEventListener('touchend', e => {
    const deltaX = e.changedTouches[0].clientX - zoomStartX;
    const deltaY = e.changedTouches[0].clientY - zoomStartY;

    /* Evitar cambios al desplazarse verticalmente */
    if (Math.abs(deltaX) < 60 || Math.abs(deltaX) < Math.abs(deltaY)) return;

    navigateZoom(deltaX < 0 ? 1 : -1);
}, { passive: true });

/* =====================================================
   REPRODUCTOR - MÚSICA AMBIENTAL
===================================================== */
const musicToggle = document.getElementById("musicToggle");
const backgroundMusic = document.getElementById("backgroundMusic");

backgroundMusic.volume = 0.25;

function updateMusicButton() {
  const isPlaying = !backgroundMusic.paused;

  musicToggle.innerHTML = isPlaying
    ? '<i class="fa-solid fa-volume-high" aria-hidden="true"></i><span>Silenciar</span>'
    : '<i class="fa-solid fa-music" aria-hidden="true"></i><span>Música</span>';

  musicToggle.classList.toggle("music-active", isPlaying);
  musicToggle.setAttribute("aria-pressed", String(isPlaying));
  musicToggle.setAttribute(
    "aria-label",
    isPlaying ? "Pausar música" : "Activar música",
  );
  musicToggle.title = isPlaying ? "Pausar música" : "Activar música";
}

/* =====================================================
   CONTROL MANUAL DE MÚSICA
===================================================== */
musicToggle.addEventListener("click", async () => {
  if (!backgroundMusic.paused) {
    backgroundMusic.pause();
    return;
  }

  try {
    await backgroundMusic.play();
  } catch (error) {
    console.error("Error al reproducir música:", error);
  }
});

/* =====================================================
   REPRODUCCIÓN AUTOMÁTICA
===================================================== */
async function autoPlayMusic() {
  try {
    await backgroundMusic.play();
  } catch (error) {
    console.log("El navegador requiere interacción para reproducir música.");
  }
}

/* =====================================================
   EVENTOS DEL REPRODUCTOR
===================================================== */
backgroundMusic.addEventListener("play", updateMusicButton);
backgroundMusic.addEventListener("pause", updateMusicButton);
backgroundMusic.addEventListener("ended", updateMusicButton);

updateMusicButton();

/* =====================================================
   INICIALIZACIÓN DE MÚSICA
===================================================== */
autoPlayMusic();

/* =====================================================
   COMPARTIR CATÁLOGO
===================================================== */
const shareButton = document.getElementById("share");

async function shareCatalog() {
  const shareData = {
    title: "Thian Candle | Catálogo Navideño 2026",
    text: "🎄🕯️ ¡La magia de la Navidad llegó a Thian Candle! Descubre nuestra colección de velas artesanales y encuentra el detalle perfecto. ✨",
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await copyCatalogLink();
    }
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error("Error al compartir:", error);
      await copyCatalogLink();
    }
  }
}

async function copyCatalogLink() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    alert("¡Enlace del catálogo copiado! 🎄");
  } catch (error) {
    console.error("Error al copiar:", error);
    window.prompt("Copia el enlace de nuestro catálogo:", window.location.href);
  }
}

shareButton.addEventListener("click", shareCatalog);

/* =====================================================
   PANTALLA COMPLETA
===================================================== */
document.getElementById("fullscreen").onclick = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen?.();
  }
};

/* =====================================================
   INICIALIZACIÓN DE LA REVISTA
===================================================== */
show(1);
