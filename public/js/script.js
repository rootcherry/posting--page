// DOM elements
const form = document.getElementById('postForm');
const titulo = document.getElementById('titulo');
const conteudo = document.getElementById('conteudo');
const postsContainer = document.getElementById('posts-container');

// Fn to create a new psot
function createPost(title, body) {
  const postElement = document.createElement('article');
  postElement.classList.add('post');

  const postTitle = document.createElement('h3');
  postTitle.textContent = title;

  const postContent = document.createElement('p');
  postContent.textContent = body;

  // Add el to post
  postElement.appendChild(postTitle);
  postElement.appendChild(postContent);

  // Add a new post to container
  postsContainer.appendChild(postElement);
}

// Fn to send post
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Creating obj w post data
  const data = {
    title: titulo.value,
    body: conteudo.value,
    userId: 1
  };

  // POST w fetch
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
    .then(response => response.json())  // Convertendo a resposta para JSON
    .then(data => {
      // Rendering data
      createPost(data.title, data.body);

      // Cleaning form after submission
      titulo.value = '';
      conteudo.value = '';
    })
    .catch(error => console.error('Erro ao enviar o post:', error));
});
