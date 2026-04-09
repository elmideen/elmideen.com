fetch('data/posts.json')
  .then(res => res.json())
  .then(posts => {

    let output = '';

    posts.forEach(post => {
      output += `
        <div class="col-md-6">
          <div class="card mb-3">
            <img src="${post.image}" class="card-img-top">
            <div class="card-body">
              <h6>${post.title}</h6>
              <a href="post.html?id=${post.id}" class="btn btn-sm btn-success">Read More</a>
            </div>
          </div>
        </div>
      `;
    });

    document.getElementById('post-list').innerHTML = output;
  });

let allPosts = [];

fetch('data/posts.json')
  .then(res => res.json())
  .then(posts => {
    allPosts = posts;
    displayPosts(posts);
  });

function displayPosts(posts) {
  let output = '';

  posts.forEach(post => {
    output += `
      <div class="col-md-6">
        <div class="card mb-3">
          <img src="${post.image}" class="card-img-top">
          <div class="card-body">
            <h6>${post.title}</h6>
            <a href="post.html?id=${post.id}" class="btn btn-sm btn-success">Read More</a>
          </div>
        </div>
      </div>
    `;
  });

  document.getElementById('post-list').innerHTML = output;
}

function searchPost() {
  const value = document.getElementById('searchInput').value.toLowerCase();

  const filtered = allPosts.filter(post =>
    post.title.toLowerCase().includes(value)
  );

  displayPosts(filtered);
}
