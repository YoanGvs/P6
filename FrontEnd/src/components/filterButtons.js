
// Fonction pour créer le bouton "Tout"
export function createAllButton(parentDiv, galleryDiv) {
    const allButton = document.createElement('button');
    allButton.innerText = "Tout";
    allButton.addEventListener('click', () => {
      const figures = galleryDiv.querySelectorAll('figure');
      figures.forEach(figure => {
        figure.style.display = 'block';
      });
    });
    parentDiv.insertBefore(allButton, galleryDiv);
  }
  
  // Fonction pour créer les boutons de filtre
  export function createFilterButtons(data, parentDiv, galleryDiv) {
    const categories = new Set();
    data.forEach(work => categories.add(work.category.name));
  
    categories.forEach(category => {
      const button = document.createElement('button');
      button.innerText = category;
      button.addEventListener('click', () => filterGallery(category, galleryDiv));
      parentDiv.insertBefore(button, galleryDiv);
    });
  }
  
  // Fonction pour filtrer la galerie en fonction de la catégorie
  function filterGallery(category, galleryDiv) {
    const figures = galleryDiv.querySelectorAll('figure');
    figures.forEach(figure => {
      const figCategory = figure.getAttribute('data-category');
      if (figCategory !== category) {
        figure.style.display = 'none';
      } else {
        figure.style.display = 'block';
      }
    });
  }
  