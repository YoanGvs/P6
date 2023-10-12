// main.js

import { fetchWorks } from './api/fetchWorks.js';
import { createGallery } from './components/gallery.js';
import { createFilterButtons, createAllButton } from './components/filterButtons.js';

// Fonction initiale pour tout mettre en place
async function init() {
  const data = await fetchWorks();
  const galleryDiv = document.querySelector('.gallery');
  const parentDiv = galleryDiv.parentElement;

  // Crée le bouton "Tout"
  createAllButton(parentDiv, galleryDiv);

  // Crée la galerie
  createGallery(data, galleryDiv);

  // Crée les boutons de filtre
  createFilterButtons(data, parentDiv, galleryDiv);
}

// Appelle la fonction init pour initialiser l'application
init();
