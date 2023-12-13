// Sélectionne le formulaire dans le document HTML pour pouvoir interagir avec lui.
const form = document.querySelector('form')

// Sélectionne l'élément qui permet de retourner à la page principale.
const returnMainPage = document.getElementById('projects')

// Ajoute un écouteur d'événement sur le formulaire pour réagir lorsque l'utilisateur le soumet.
form.addEventListener('submit', (event) => {
  // Empêche le comportement par défaut du formulaire (qui est de recharger la page).
  event.preventDefault()

  // Récupère les valeurs entrées dans les champs email et mot de passe.
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  // Crée une expression régulière pour valider le format de l'email.
  const regex = /[a-z0-9._-]+@[a-z0-9._-]+.[a-z0-9._-]+/

  // Teste si l'email correspond au format attendu.
  const emailCheck = regex.test(email)

  // Vérifie si l'email est valide.
  if (emailCheck !== false) {
    // Prépare les informations de connexion à envoyer.
    const comboLogin = {
      email,
      password
    }
    const infoToSubmit = JSON.stringify(comboLogin)

    // Envoie une requête POST au serveur avec les informations de connexion.
    fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: infoToSubmit
    })
      .then(response => {
        // Vérifie si la réponse du serveur est positive.
        if (!response.ok) {
          throw new Error('La demande a échoué avec le code ' + response.status)
        }
        return response.json()
      })
      .then(data => {
        // Stocke les données de la réponse dans le stockage de session du navigateur.
        const login = JSON.stringify(data)
        window.sessionStorage.setItem('login', login)
        // Redirige l'utilisateur vers la page principale.
        location.href = './index.html'
      })
      .catch(error => {
        // Affiche un message d'erreur si la connexion échoue.
        const errorMsg = document.querySelector('.error-msg')
        errorMsg.textContent = 'Erreur dans l’identifiant ou le mot de passe.'
        console.error('Erreur :', error)
      })
  } else {
    // Affiche un message d'erreur si le format de l'email est invalide.
    const errorMsg = document.querySelector('.error-msg')
    errorMsg.textContent = "Format d'E-mail invalide."
  }
})

// Ajoute un écouteur d'événement sur l'élément permettant de retourner à la page principale.
returnMainPage.addEventListener('click', () => {
  // Redirige l'utilisateur vers la page principale.
  location.href = './index.html'
})
