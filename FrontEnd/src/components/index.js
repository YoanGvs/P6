// Import des modules nécessaires
import { fetchWorks } from './api'
import { loginA, allButton, galleryDiv, filterDiv, btnOpenModal, btnCloseModal, modalDiv } from './domLinker'
import { openModal, closeModal } from './modal'

// Cette fonction crée un bouton "Tout" qui permet d'afficher toutes les images.
function createAllButton (parentDiv, galleryDiv) {
  // Définition de la classe du bouton pour le style
  allButton.className = 'button__filter'
  // Définition du texte du bouton
  allButton.innerText = 'Tout'
  // Ajout d'un écouteur d'événements au bouton
  allButton.addEventListener('click', () => {
    // Quand on clique sur le bouton, on recherche toutes les images (éléments figure)
    const figures = galleryDiv.querySelectorAll('figure')
    // On parcourt chaque image pour la rendre visible
    figures.forEach((figure) => { figure.style.display = 'block' })
  })
  // Ajout du bouton dans le div de filtre
  filterDiv.appendChild(allButton)
}

// Cette fonction filtre les images de la galerie selon une catégorie donnée
function filterGallery (category, galleryDiv) {
  // On recherche toutes les images de la galerie
  const figures = galleryDiv.querySelectorAll('figure')
  figures.forEach((figure) => {
    // On obtient la catégorie de chaque image
    const figCategory = figure.getAttribute('data-category')
    // Si la catégorie de l'image ne correspond pas à la catégorie sélectionnée, on la cache
    if (figCategory !== category) {
      figure.style.display = 'none'
    } else {
      figure.style.display = 'block'
    }
  })
}

// Cette fonction crée des boutons pour chaque catégorie d'image disponible
function createFilterButtons (data, parentDiv, galleryDiv) {
  // Utilisation d'un Set pour éviter les doublons de catégories
  const categories = new Set()

  // On ajoute chaque catégorie dans le Set
  data.forEach((work) => categories.add(work.category.name))

  // Pour chaque catégorie unique, on crée un bouton
  categories.forEach((category) => {
    const button = document.createElement('button')
    button.className = 'button__filter'
    button.innerText = category
    button.addEventListener('click', () => filterGallery(category, galleryDiv))
    filterDiv.appendChild(button)
  })
}

// Cette fonction crée la galerie d'images à partir des données récupérées
const createGallery = (data, galleryDiv) => {
  data.forEach((work) => {
    // Création de l'élément "figure" pour chaque image
    const figure = document.createElement('figure')
    figure.setAttribute('data-category', work.category.name)
    const img = document.createElement('img')
    const figcaption = document.createElement('figcaption')

    // Définition de l'URL de l'image et du texte alternatif
    img.src = work.imageUrl
    img.alt = work.title

    // Définition du titre de l'image
    figcaption.innerText = work.title

    figure.appendChild(img)
    figure.appendChild(figcaption)
    galleryDiv.appendChild(figure)
    modalDiv.innerHTML += `
                          <div class="modal-container">
                            <img src="${img.src}" class="modal-img"></img>
                            <a href="#" class="trash-button">
                              <i class="fa-solid fa-trash-can"></i>
                            </a>
                          </div>
                          `
  })
}

// Fonction principale pour initialiser la galerie et la configurer
async function init () {
  // Récupération des données des images depuis l'API
  const data = await fetchWorks()
  const parentDiv = galleryDiv.parentElement

  createAllButton(parentDiv, galleryDiv) // Création du bouton "Tout"
  createGallery(data, galleryDiv) // Remplissage de la galerie avec les images
  createFilterButtons(data, parentDiv, galleryDiv) // Création des boutons de filtre
}

// Vérification de la connexion de l'utilisateur grâce au token dans le localStorage
if (localStorage.token) {
  // Modification du lien de connexion pour afficher "logout"
  loginA.innerHTML = 'logout'
  document.getElementById('editorBanner').style.display = 'block'
  document.getElementById('editorButton').style.display = 'block'
  filterDiv.style.display = 'none'
}

// Si l'utilisateur clique sur le lien de connexion, on efface toutes les données de session
loginA.addEventListener('click', () => localStorage.clear())

// Fonction principale pour lancer l'application
const Index = () => {
  init()
}

// Gestionnaires d'événements pour les boutons d'ouverture et de fermeture de la fenêtre modale
btnOpenModal.addEventListener('click', () => openModal())
btnCloseModal.addEventListener('click', () => closeModal())

export default Index
