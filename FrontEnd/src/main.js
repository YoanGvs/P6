// Requête FETCH pour récupérer les données
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    const galleryDiv = document.querySelector('.gallery');
    const parentDiv = galleryDiv.parentElement;
    
    const allButton = document.createElement('button');
    allButton.innerText = "Tout";
    allButton.addEventListener('click', () => {
      const figures = galleryDiv.querySelectorAll('figure');
      figures.forEach(figure => {
        figure.style.display = 'block';
      });
    });
    parentDiv.insertBefore(allButton, galleryDiv);
    
    // Création d'un Set pour les catégories
    const categories = new Set();
    data.forEach(work => categories.add(work.category.name));

    // Ajout des boutons pour chaque catégorie
    categories.forEach(category => {
      const button = document.createElement('button');
      button.innerText = category;
      button.addEventListener('click', () => filterGallery(category));
      parentDiv.insertBefore(button, galleryDiv);
    });

    // Ajout des éléments de la galerie
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
  });

// Fonction pour filtrer la galerie
const filterGallery = (category) => {
  const galleryDiv = document.querySelector('.gallery');
  const figures = galleryDiv.querySelectorAll('figure');
  figures.forEach(figure => {
    const figCategory = figure.getAttribute('data-category');
    if (figCategory !== category) {
      figure.style.display = 'none';
    } else {
      figure.style.display = 'block';
    }
  });
};
