// Fonction pour récupérer les œuvres d'art à partir de l'API
export async function fetchWorks () {
  const response = await fetch('http://localhost:5678/api/works')
  const data = await response.json()
  return data
}
