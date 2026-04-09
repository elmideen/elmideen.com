const params = new URLSearchParams(window.location.search);
const postId = params.get('id');

fetch('data/posts.json')
  .then(res => res.json())
  .then(posts => {

    const post = posts.find(p => p.id == postId);

    const output = `
      <div class="card">
        <img src="${post.image}" class="card-img-top">
        <div class="card-body">
          <h2>${post.title}</h2>
          <p>${post.content}</p>
        </div>
      </div>
    `;

    document.getElementById('post-details').innerHTML = output;
  });
