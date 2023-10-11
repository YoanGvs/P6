console.log('test');


// Requête FETCH pour récupérer les données
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    const galleryDiv = document.querySelector('.gallery');

    data.forEach(work => {
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      const figcaption = document.createElement('figcaption');

      img.src = work.imageUrl;
      img.alt = work.title;
      img.setAttribute('crossorigin', 'anonymous');  // Ajout de l'attribut crossorigin

      figcaption.textContent = work.title;

      figure.appendChild(img);
      figure.appendChild(figcaption);
      galleryDiv.appendChild(figure);
    });
  });
