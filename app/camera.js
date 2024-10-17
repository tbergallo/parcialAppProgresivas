const btnCapturar = document.querySelector("button#btnCapturar");
const btnpublicar = document.getElementById('publicarBtn');
const picture = document.querySelector("img#imgCamera");
const pictureBtnCamera = document.getElementById('imgCamera')
const postBox = document.getElementById('postBox');
const URLPictures = 'https://67100c9ea85f4164ef2ce87c.mockapi.io/pictures';


// Creamos el elemento input
const inputCamera = document.createElement('input');
inputCamera.id = 'inputFile';
inputCamera.type = 'file';
inputCamera.accept = ".png, .jpg, .webp";

inputCamera.addEventListener('change', () => {
    const imgCapturada = URL.createObjectURL(inputCamera.files[0]);
    picture.src = imgCapturada;
    postBox.hidden = false;
});


// Trigereo de la carga de imagen
if (btnCapturar) {
    btnCapturar.addEventListener('click', () => inputCamera.click());
}

if (pictureBtnCamera) {
    pictureBtnCamera.addEventListener('click', () => inputCamera.click()); // Aclaro profesor que intenté poner dblclick pero no funcionó.
}


// Función para convertir la imagen a Base64
function convertirBase64() {
    const canvas = document.createElement('canvas');
    canvas.width = picture.width;
    canvas.height = picture.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(picture, 0, 0, picture.width, picture.height);

    return canvas.toDataURL('image/webp');
}


// Publicamos la imagen en MOCKAPI
export function postPicture() {
    const title = document.querySelector('#titleInput').value;
    const description = document.querySelector('#descInput').value;

    if (!title || !description) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const newPicture = {
        image: convertirBase64(),
        title: title,
        description: description,
        date: new Date(),
    };

    const opciones = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPicture)
    };

    return fetch(URLPictures, opciones)
        .then(response => {
            if (response.status === 201) {
                console.log('Imagen publicada con éxito');
                return response.json();
            } else {
                throw new Error('No se puede subir la nueva imagen.');
            }
        })
        .catch(error => {
            console.log(error);
            throw error;
        });
}

// Publicamos la imagen
if (btnpublicar) {
    btnpublicar.addEventListener('click', () => {
        postPicture()
            .then(() => {
                window.location.href = 'index.html';
                getPictures();
            });
    });
}