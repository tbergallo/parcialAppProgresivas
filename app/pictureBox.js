export function showPictureCard(pictures){
    
    let body = document.getElementById("containerReel");
    //let pictureStorage = getPictures()

    pictures.forEach(p => {
        asideContent =+ 
        `<div class="card">
            <img src="https://via.placeholder.com/300" class="card-img-top" alt="Foto 3">
            <div class="card-body">
                <h5 class="card-title">${p.title}</h5>
                <p class="card-text">${p.description}</p>
            </div>
            <div class="card-footer text-muted">
                ${p.date}
            </div>
        </div>
        `;
    });
    
    body.innerHTML = asideContent;
}