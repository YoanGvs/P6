
// Fonction pour créer la galerie d'images
export function createGallery(data, galleryDiv) {
    data.forEach(work => {
      const figure = document.createElement('figure');
      figure.setAttribute('data-category', work.category.name);
      const img = document.createElement('img');
      const figcaption = document.createElement('figcaption');
  
      img.src = work.imageUrl;
      img.alt = work.title;
  
      figcaption.innerText = work.title;
  
      figure.appendChild(img);
      figure.appendChild(figcaption);
  
      galleryDiv.appendChild(figure);
    });
  }
  