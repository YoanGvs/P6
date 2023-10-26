// main.js
import { fetchWorks } from './api'
const loginA = document.getElementById('login')

// Fonction pour créer le bouton "Tout"
function createAllButton (parentDiv, galleryDiv) {
  const allButton = document.createElement('button')
  allButton.className = 'button__filter'
  allButton.innerText = 'Tout'
  allButton.addEventListener('click', () => {
    const figures = galleryDiv.querySelectorAll('figure')
    figures.forEach((figure) => { figure.style.display = 'block' })
  })
  parentDiv.insertBefore(allButton, galleryDiv)
}

// Fonction pour filtrer la galerie en fonction de la catégorie
function filterGallery (category, galleryDiv) {
  const figures = galleryDiv.querySelectorAll('figure')
  figures.forEach((figure) => {
    const figCategory = figure.getAttribute('data-category')
    if (figCategory !== category) {
      figure.style.display = 'none'
    } else {
      figure.style.display = 'block'
    }
  })
}

// Fonction pour créer les boutons de filtre
function createFilterButtons (data, parentDiv, galleryDiv) {
  const categories = new Set()
  data.forEach((work) => categories.add(work.category.name))

  categories.forEach((category) => {
    const button = document.createElement('button')
    button.className = 'button__filter'
    button.innerText = category
    button.addEventListener('click', () => filterGallery(category, galleryDiv))
    parentDiv.insertBefore(button, galleryDiv)
  })
}

const createGallery = (data, galleryDiv) => {
  data.forEach((work) => {
    const figure = document.createElement('figure')
    figure.setAttribute('data-category', work.category.name)
    const img = document.createElement('img')
    const figcaption = document.createElement('figcaption')

    img.src = work.imageUrl
    img.alt = work.title

    figcaption.innerText = work.title

    figure.appendChild(img)
    figure.appendChild(figcaption)

    galleryDiv.appendChild(figure)
  })
}

async function init () {
  const data = await fetchWorks()
  const galleryDiv = document.querySelector('.gallery')
  const parentDiv = galleryDiv.parentElement

  // Crée le bouton "Tout"
  createAllButton(parentDiv, galleryDiv)

  // Crée la galerie
  createGallery(data, galleryDiv)

  // Crée les boutons de filtre
  createFilterButtons(data, parentDiv, galleryDiv)
}

if (localStorage.token) {
  loginA.innerHTML = 'logout'
  document.getElementById('editorBanner').style.display = 'block'
  document.getElementById('editorbutton').style.display = 'block'
}

loginA.addEventListener('click', () => localStorage.clear())

const Index = () => {
  // Fonction initiale pour tout mettre en place

  // Appelle la fonction init pour initialiser l'application
  init()
}

export default Index
