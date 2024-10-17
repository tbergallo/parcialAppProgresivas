const openCameraBtn = document.getElementById('openCameraBtn');
const btnBack = document.getElementById('btnBack');
const btnpublicar = document.getElementById('publicarBtn');
const URLPictures = 'https://67100c9ea85f4164ef2ce87c.mockapi.io/pictures';
let pictures = [];


// Navegación entre windows
if (openCameraBtn) {
    openCameraBtn.addEventListener('click', () => {
        window.location.href = 'camera.html';
    });
}

if (btnBack) {
    btnBack.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

window.onload = getPictures();


// Obtenemos imagenes desde MOCKAPI
function getPictures() {
    fetch(URLPictures)
        .then(response => {
            if (response.status === 200) return response.json();
            else throw new Error('No se pudieron obtener las imágenes.');
        })
        .then(data => {
            pictures = data;
            showPictureCard(pictures);
        })
        .catch(error => console.log(error), showDefaultCard());
}


// Mostramos las tarjetas de las imagenes
function showPictureCard(pictures) {
    let body = document.getElementById('containerReel');
    let content = '';

    pictures.forEach(p => {
        content += `
            <div class="card">
                <img src="${p.image}" class="card-img-top" alt="Foto">
                <div class="card-body">
                    <h5 class="card-title">${p.title}</h5>
                    <p class="card-text">${p.description}</p>
                </div>
                <div class="card-footer text-muted">
                    ${new Date(p.date).toLocaleDateString()}
                </div>
            </div>`;
    });

    if (body) {
        body.innerHTML = content || showDefaultCard();
    } else {
        body.innerHTML = showDefaultCard();
    }
}

function showDefaultCard() {
    return `
    <div class="card">
        <img src="https://via.placeholder.com/300" class="card-img-top" alt="Imagen modelo">
        <div class="card-body">
            <h5 class="card-title">Título de la imagen</h5>
            <p class="card-text">Descripción de la imagen</p>
        </div>
        <div class="card-footer text-muted">Fecha no disponible</div>
    </div>`;
}


// Perdida de conectividad
window.addEventListener('offline', () => {
    alert('Perdiste conectividad.');
    btnCapturar.disabled = true;
    btnpublicar.disabled = true;
});

window.addEventListener('online', () => {
    alert('Recuperaste conectividad');
    btnCapturar.disabled = false;
    btnpublicar.disabled = false;
});