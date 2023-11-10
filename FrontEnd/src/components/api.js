const URL_WORKS = 'http://localhost:5678/api/works'
const URL_CATEGORIES = 'http://localhost:5678/api/categories'
const URL_LOGIN = 'http://localhost:5678/api/users/login'

// Fonction pour récupérer les œuvres d'art à partir de l'API
const get = async (url) => fetch(url).then((res) => res.json()).then((data) => data)
const post = async (url, data) => fetch(url, {
  method: 'post',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json'
  }
}).then(res => res.json()).then(data => data)

export const fetchWorks = async () => get(URL_WORKS)
export const fetchCategories = async () => get(URL_CATEGORIES)
export const postLogin = async data => post(URL_LOGIN, data)
export async function deleteWork (workId, token) {
  const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('Failed to delete the work.')
  }
  return response.json()
}
