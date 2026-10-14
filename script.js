/* =====================================================
   CONFIGURACIÓN GENERAL
===================================================== */
const TOTAL = 35;
const WHATSAPP = '573104239237';

const book = document.getElementById('book');
const slider = document.getElementById('slider');
const counter = document.getElementById('counter');
const purchase = document.getElementById('purchase');
const productTitle = document.getElementById('productTitle');
const order = document.getElementById('order');

let current = 1;
let last = 0;

/* =====================================================
   PRODUCTOS DEL CATÁLOGO
===================================================== */
const products = {
    3: 'Velitas Florecer Navideño',
    4: 'Velitas Luz de Estrella',
    5: 'Velitas Destellos de Navidad',
    6: 'Velitas Pinos de Luz',
    7: 'Velas de Mascotas – set x 2',
    8: 'Velas de Mascotas – set x 2',
    10: 'Set Noche de Paz',
    11: 'Set Nacimiento de Fe',
    12: 'Colección Milagro de Navidad',
    13: 'Mini Detalles Navideños',
    14: 'Blanca Navidad',
    16: 'Vela aromática Grinch Vibes',
    17: 'Vela decorativa Dulcemente Grinch',
    19: 'Dulce Navidad en Cristal',
    21: 'Línea Luz de Navidad – personalizada',
    22: 'Línea Luz de Navidad – personalizada',
    23: 'Velas personalizadas',
    24: 'Velas personalizadas',
    25: 'Velas personalizadas',
    27: 'Velas Tradicionales Golden',
    28: 'Velas Tradicionales Golden en caja',
    29: 'Velas Tradicionales Golden en caja',
    30: 'Velas Tradicionales Golden en caja',
    31: 'Velas Tradicionales Golden en caja',
    32: 'Velas navideñas tradicionales',
    33: 'Velas navideñas tradicionales',
    34: 'Velas navideñas religiosas'
};

/* =====================================================
   SECCIONES DEL CATÁLOGO
===================================================== */
const sections = [
    ['Portada', 1],
    ['Línea de Deseos', 2],
    ['Combos & Sets', 9],
    ['Línea Grinch', 15],
    ['Colección Navideña', 18],
    ['Velas Tradicionales Personalizadas', 20],
    ['Velas Tradicionales Golden', 26],
    ['Gracias por elegirnos', 35]
];

/* =====================================================
   UTILIDADES - RUTAS DE IMÁGENES
===================================================== */
const src = n => `images/pagina-${String(n).padStart(2, '0')}.webp`;

/* =====================================================
   REVISTA DIGITAL - VISUALIZACIÓN DE PÁGINAS
===================================================== */
function show(n) {
    current = Math.min(TOTAL, Math.max(1, Number(n)));
    book.innerHTML = '';

    const page = document.createElement('div');
    page.className = 'page ' + (current > last ? 'enter-right' : current < last ? 'enter-left' : '');

    const img = document.createElement('img');
    img.src = src(current);
    img.alt = `Página ${current} del catálogo navideño`;
    img.loading = 'eager';
    img.onclick = () => zoomPage(current);

    page.appendChild(img);
    book.appendChild(page);

    last = current;
    slider.value = current;
    counter.textContent = `Página ${current} de ${TOTAL}`;

    document.getElementById('prev').disabled = current === 1;
    document.getElementById('next').disabled = current === TOTAL;

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

document.getElementById('prev').onclick = () => advance(-1);
document.getElementById('next').onclick = () => advance(1);
slider.oninput = e => show(e.target.value);

/* =====================================================
   NAVEGACIÓN - TECLADO
===================================================== */
document.addEventListener('keydown', e => {
    if (document.querySelector('dialog[open]')) return;

    if (e.key === 'ArrowRight') advance(1);
    if (e.key === 'ArrowLeft') advance(-1);
});

/* =====================================================
   NAVEGACIÓN - GESTOS TÁCTILES
===================================================== */
let startX = 0;

book.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
}, { passive: true });

book.addEventListener('touchend', e => {
    const delta = e.changedTouches[0].clientX - startX;
    if (Math.abs(delta) > 50) advance(delta < 0 ? 1 : -1);
}, { passive: true });

/* =====================================================
   MODAL - ÍNDICE DEL CATÁLOGO
===================================================== */
const indexDialog = document.getElementById('indexDialog');
const chapters = document.getElementById('chapters');

document.getElementById('toc').onclick = () => indexDialog.showModal();
document.getElementById('closeIndex').onclick = () => indexDialog.close();

sections.forEach(([label, page]) => {
    const button = document.createElement('button');
    button.textContent = `${label} · pág. ${page}`;
    button.onclick = () => {
        show(page);
        indexDialog.close();
    };
    chapters.appendChild(button);
});

/* =====================================================
   MODAL - AMPLIACIÓN DE IMÁGENES
===================================================== */
const zoomDialog = document.getElementById('zoomDialog');
const zoomImage = document.getElementById('zoomImage');

function zoomPage(page) {
    zoomImage.src = src(page);
    zoomDialog.showModal();
}

document.getElementById('zoom').onclick = () => zoomPage(current);
document.getElementById('closeZoom').onclick = () => zoomDialog.close();

/* =====================================================
   COMPARTIR CATÁLOGO
===================================================== */
document.getElementById('share').onclick = async () => {
    try {
        if (navigator.share) {
            await navigator.share({
                title: 'Thian Candle · Catálogo Navideño 2026',
                url: location.href
            });
        } else {
            await navigator.clipboard.writeText(location.href);
            alert('¡Enlace copiado!');
        }
    } catch (error) {
        if (error.name !== 'AbortError') {
            alert('Copia el enlace desde la barra del navegador.');
        }
    }
};

/* =====================================================
   PANTALLA COMPLETA
===================================================== */
document.getElementById('fullscreen').onclick = () => {
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