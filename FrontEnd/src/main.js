// Bouton pour réinitialiser le filtre
const BUTTON_RESET_FILTER = 0
// Récupération des données de la galerie et des catégories depuis le localStorage
let globalGallery = JSON.parse(window.localStorage.getItem('gallery'))
let globalCategories = JSON.parse(window.localStorage.getItem('categories'))

// Initialisation et affichage de l'interface administrateur
init()
displayAdminUI()

// Fonction d'initialisation pour charger les données de la galerie et des catégories
async function init () {
  // Récupération des œuvres depuis le serveur
  let response = await fetch('http://localhost:5678/api/works')
  globalGallery = await response.json()
  // Récupération des catégories depuis le serveur
  response = await fetch('http://localhost:5678/api/categories')
  globalCategories = await response.json()
  // Mise à jour des données dans le localStorage
  window.localStorage.setItem('gallery', JSON.stringify(globalGallery))
  window.localStorage.setItem('categories', JSON.stringify(globalCategories))

  // Génération de la galerie et des boutons de filtre
  generateGallery(globalGallery)
  createFilterButtons(globalCategories)
};

// Fonction pour afficher l'interface d'administration si l'utilisateur est connecté
function displayAdminUI () {
  const userInfo = JSON.parse(window.sessionStorage.getItem('login'))
  const loginText = document.getElementById('login-btn')
  // Affichage des éléments de l'interface en fonction de l'état de connexion
  if (userInfo !== null) {
    loginText.innerText = 'logout'
    const editionDisplayElements = document.querySelectorAll('.display-login')
    for (const element of editionDisplayElements) {
      element.style.display = 'flex'
    }
    // Masquage de la barre de filtre en mode édition
    const editionFilterBar = document.querySelector('.filter')
    editionFilterBar.style.display = 'none'
  }
}

// Fonction pour générer la galerie d'images
function generateGallery (gallery) {
  const galleryDisplay = document.querySelector('.gallery')
  // Tri des œuvres par identifiant
  gallery.sort((a, b) => a.id - b.id)
  // Effacement du contenu actuel de la galerie
  galleryDisplay.innerHTML = ''
  // Création des éléments pour chaque œuvre
  gallery.forEach(work => {
    const figure = document.createElement('figure')
    const imageElement = document.createElement('img')
    imageElement.src = work.imageUrl
    imageElement.alt = work.title
    const figCaption = document.createElement('figcaption')
    figCaption.innerText = work.title

    figure.appendChild(imageElement)
    figure.appendChild(figCaption)

    galleryDisplay.appendChild(figure)
  })
};

// Fonction pour créer les boutons de filtre
function createFilterButtons (categories) {
  const filterContainer = document.querySelector('.filter')
  // Effacement des boutons de filtre existants
  filterContainer.innerHTML = ''

  // Création du bouton pour afficher toutes les catégories
  const button = document.createElement('button')
  button.classList.add('filter-btn')
  button.textContent = 'Tous'
  button.setAttribute('data-category', BUTTON_RESET_FILTER)
  filterContainer.appendChild(button)
  // Tri des catégories par identifiant
  categories.sort((a, b) => a.id - b.id)

  // Création des boutons pour chaque catégorie
  categories.forEach(category => {
    const button = document.createElement('button')
    button.classList.add('filter-btn')
    button.textContent = category.name
    button.setAttribute('data-category', category.id)
    filterContainer.appendChild(button)
  })

  // Ajout d'un gestionnaire d'événements pour le filtrage
  const filterButtons = document.querySelectorAll('[data-category]')
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const categoryID = parseInt(button.getAttribute('data-category'))
      const filter = categoryID === BUTTON_RESET_FILTER ? globalGallery : globalGallery.filter(work => work.categoryId === categoryID)
      generateGallery(filter)
    })
  })
};

// Gestionnaire d'événements pour le bouton de connexion/déconnexion
const boutonLogin = document.getElementById('login-btn')
boutonLogin.addEventListener('click', () => {
  const userInfo = JSON.parse(window.sessionStorage.getItem('login'))
  // Gestion de la connexion ou déconnexion
  if (userInfo) {
    window.sessionStorage.removeItem('login')
    location.reload()
  } else {
    location.href = './login.html'
  }
})

/** ************MODAL**********************/
// Sélection du bouton pour modifier et initialisation des éléments de la modalité
const boutonModify = document.querySelector('.modify-btn')
const modal = document.getElementById('modal')
const modalMain = document.querySelector('.modal-content-main')
const modalAdd = document.querySelector('.modal-content-add')

// Fonction pour créer la galerie dans la modalité
function createModalGallery (gallery) {
  const modalGallery = document.querySelector('.modal-gallery')
  // Effacement du contenu actuel de la galerie modal
  modalGallery.innerHTML = ''
  // Tri des œuvres par identifiant
  gallery.sort((a, b) => a.id - b.id)
  // Création des éléments pour chaque œuvre
  gallery.forEach(work => {
    const imageContainer = document.createElement('div')
    imageContainer.classList.add('modal-img-container')

    const imageElement = document.createElement('img')
    imageElement.src = work.imageUrl

    // Bouton de suppression pour chaque œuvre
    const deleteElement = document.createElement('i')
    deleteElement.classList.add('modal-delete-item', 'fa-solid', 'fa-trash-can')
    imageContainer.appendChild(imageElement)
    imageContainer.appendChild(deleteElement)

    modalGallery.appendChild(imageContainer)
    // Gestionnaire d'événements pour la suppression
    deleteElement.addEventListener('click', (event) => {
      event.preventDefault()
      const userInfo = JSON.parse(window.sessionStorage.getItem('login'))
      const adminToken = userInfo.token

      // Requête de suppression de l'œuvre
      fetch(`http://localhost:5678/api/works/${work.id}`, {
        method: 'DELETE',
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${adminToken}`
        }
      })
        .then(response => {
          if (response.ok) {
            // Mise à jour de la galerie après suppression
            gallery = gallery.filter(item => item.id !== work.id)
            window.localStorage.setItem('gallery', JSON.stringify(gallery))
            globalGallery = JSON.parse(window.localStorage.getItem('gallery'))
            createModalGallery(gallery)
            generateGallery(gallery)
          } else {
            alert('Echec de la suppression')
          }
        })
        .catch(error => {
          console.error('Erreur :', error)
        })
    })
  })
};

// Gestionnaire d'événements pour l'ouverture de la modalité
boutonModify.addEventListener('click', () => {
  modal.style.display = 'flex'
  modalMain.style.display = 'flex'
  modalAdd.style.display = 'none'
  returnArrow.style.visibility = 'hidden'
  createModalGallery(globalGallery)
})

// Gestionnaire d'événements pour la fermeture de la modalité
modal.addEventListener('click', (event) => {
  if (event.target === modal || event.target.classList.contains('modal-close')) {
    modal.style.display = 'none'
  }
})

/** ******Ajout des photos************/

// Sélection des éléments du DOM nécessaires pour l'ajout de nouvelles œuvres
const addNewWorkBtn = document.getElementById('add-work')
const returnArrow = document.querySelector('.return-arrow')
const formUpload = document.getElementById('form-upload')
const validateBtn = document.getElementById('validate-work')
const addImgBtn = document.querySelector('.add-image-btn')
const fileImg = document.querySelector('.file-img')
const fileInput = document.getElementById('file')
const workName = document.getElementById('work-name')
const categoryName = document.getElementById('select-cat')
const fileReader = new FileReader()

// Gestionnaire d'événements pour retourner à la vue principale de la modalité
returnArrow.addEventListener('click', () => {
  returnArrow.style.visibility = 'hidden'
  modalMain.style.display = 'flex'
  modalAdd.style.display = 'none'
})

// Gestionnaire d'événements pour l'ouverture de la vue d'ajout de nouvelles œuvres
addNewWorkBtn.addEventListener('click', () => {
  returnArrow.style.visibility = 'visible'
  modalMain.style.display = 'none'
  modalAdd.style.display = 'flex'
  addImgBtn.style.display = 'flex'
  fileImg.style.display = 'none'

  // Réinitialisation des valeurs du formulaire
  workName.value = ''
  fileInput.value = ''
  validateBtn.classList.remove('btn-bg-green')
  validateBtn.classList.add('btn-bg-gray')
  validateBtn.disabled = true
  createSelectCategory()
})

// Variables pour stocker les données sélectionnées
let selectedFile = null
let workValue = null
let categoryID = null

// Gestionnaire d'événements pour gérer les changements sur le formulaire d'upload
formUpload.addEventListener('change', () => {
  // Assignation des valeurs saisies
  workValue = workName.value
  categoryID = categoryName.value
  const maxFileSize = 4 * 1024 * 1024 // 4 MO (taille maximale du fichier)

  // Gestion de la sélection de l'image
  if (fileInput.files.length > 0) {
    selectedFile = fileInput.files[0]

    // Vérification de la taille du fichier
    if (selectedFile.size < maxFileSize) {
      // Affichage de l'image sélectionnée
      addImgBtn.style.display = 'none'
      fileImg.style.display = 'block'

      fileReader.onload = function (event) {
        fileImg.src = event.target.result
      }
      fileReader.readAsDataURL(selectedFile)
    } else {
      alert('Fichier trop lourd, taille maximum 4 mo.')
    }
  } else {
    addImgBtn.style.display = 'flex'
    fileImg.style.display = 'none'
  }

  // Activation du bouton de validation si toutes les conditions sont remplies
  let readyToSubmit = workValue !== '' && categoryID !== 0 && fileInput.files.length > 0
  if (readyToSubmit) {
    validateBtn.classList.remove('btn-bg-gray')
    validateBtn.classList.add('btn-bg-green')
    validateBtn.disabled = false

    formUpload.removeEventListener('submit', submitHandler)
    formUpload.addEventListener('submit', submitHandler)
  } else {
    validateBtn.classList.remove('btn-bg-green')
    validateBtn.classList.add('btn-bg-gray')
    validateBtn.disabled = true
    readyToSubmit = false
  }
})

// Fonction pour gérer la soumission du formulaire
function submitHandler (event) {
  event.preventDefault()
  submitWorkToAPI(workValue, selectedFile, categoryID)
}

// Fonction pour soumettre la nouvelle œuvre à l'API
function submitWorkToAPI (title, imageUrl, categoryId) {
  const userInfo = JSON.parse(window.sessionStorage.getItem('login'))
  const adminToken = userInfo.token

  const formData = new FormData()
  formData.append('title', title)
  formData.append('image', imageUrl)
  formData.append('category', categoryId)

  // Envoi de la demande à l'API
  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${adminToken}`
    },
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('La demande a échoué avec le code ' + response.status)
      }
      return response.json()
    })
    .then(data => {
      if (data) {
        // Mise à jour de la galerie et fermeture de la modalité
        globalGallery.push(data)
        window.localStorage.setItem('gallery', JSON.stringify(globalGallery))
        globalGallery = JSON.parse(window.localStorage.getItem('gallery'))

        modal.style.display = 'none'
        generateGallery(globalGallery)
      }
    })
    .catch(error => {
      console.error('Erreur :', error)
    })
}

// Fonction pour créer le menu déroulant des catégories
function createSelectCategory () {
  if (globalCategories) {
    const selectCat = document.getElementById('select-cat')
    selectCat.innerHTML = ''

    const optionNull = document.createElement('option')
    optionNull.text = ''
    optionNull.value = 0
    selectCat.appendChild(optionNull)

    globalCategories.forEach(category => {
      const option = document.createElement('option')
      option.text = category.name
      option.value = category.id

      selectCat.appendChild(option)
    })
  } else {
    alert('Impossible de retrouver les catégories.')
  }
}

// Gestionnaire d'événements pour le formulaire de contact (si nécessaire)
const formContact = document.getElementById('form-contact')
formContact.addEventListener('submit', event => {
  event.preventDefault()
})
