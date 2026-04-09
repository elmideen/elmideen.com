let allPosts = [];
let debounceTimer = null;

/* 🔄 Load Posts */
fetch('data/posts.json')
  .then(res => res.json())
  .then(posts => {
    allPosts = posts;
    displayPosts(posts);
  });

/* 📦 Display Posts */
function displayPosts(posts) {
  let output = '';

  if (posts.length === 0) {
    output = `<p class="text-center">No posts found 😔</p>`;
  } else {
    posts.forEach(post => {
      output += `
        <div class="col-md-6">
          <div class="card mb-3">
            <img src="${post.image}" class="card-img-top" loading="lazy">
            <div class="card-body">
              <h6>${post.title}</h6>
              <p class="small text-muted">${post.description || ''}</p>
              <a href="post.html?id=${post.id}" class="btn btn-sm btn-success">Read More</a>
            </div>
          </div>
        </div>
      `;
    });
  }

  const container = document.getElementById('post-list');
  if (container) container.innerHTML = output;
}

/* 🔍 Search Function */
function searchPost(value) {
  const keyword = value.toLowerCase();

  const filtered = allPosts.filter(post =>
    (post.title && post.title.toLowerCase().includes(keyword)) ||
    (post.description && post.description.toLowerCase().includes(keyword))
  );

  displayPosts(filtered);
  showDropdown(filtered);
}

/* ⚡ Debounce */
function debounceSearch(value) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    searchPost(value);
  }, 300); // 300ms delay
}

/* 🔽 Dropdown Suggestion */
function showDropdown(posts) {
  let dropdown = document.getElementById("searchDropdown");

  if (!dropdown) return;

  if (posts.length === 0) {
    dropdown.innerHTML = `<div class="p-2 text-muted">No result</div>`;
    dropdown.style.display = "block";
    return;
  }

  let html = '';

  posts.slice(0, 5).forEach(post => {
    html += `
      <a href="post.html?id=${post.id}" class="dropdown-item">
        ${post.title}
      </a>
    `;
  });

  dropdown.innerHTML = html;
  dropdown.style.display = "block";
}

/* ❌ Hide dropdown */
function hideDropdown() {
  const dropdown = document.getElementById("searchDropdown");
  if (dropdown) dropdown.style.display = "none";
}

/* 🎯 Init */
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");

  if (searchInput) {
    searchInput.addEventListener("keyup", function () {
      const value = this.value;

      if (value.length === 0) {
        displayPosts(allPosts);
        hideDropdown();
        return;
      }

      debounceSearch(value);
    });

    // click বাইরে করলে dropdown hide
    document.addEventListener("click", function (e) {
      if (!searchInput.contains(e.target)) {
        hideDropdown();
      }
    });
  }
});
