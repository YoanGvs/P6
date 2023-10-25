import { postLogin } from './api'
const email = document.getElementById('email')
const password = document.getElementById('password')
const formLogin = document.getElementById('form-login')

formLogin.addEventListener('submit', async e => {
  e.preventDefault()

  // Post login
  await postLogin({ email: email.value, password: password.value })
    .then(data => {
      if (data.token) {
        localStorage.token = data.token
        window.location.href = '../index.html'
      } else {
        alert('Erreur dans l’identifiant ou le mot de passe')
      }
    })
})
