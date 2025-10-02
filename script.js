let page = 1;
let pageSize = 8;

const spinner = document.getElementById("spinner");
const newsContainer = document.getElementById("newsContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

async function fetchNews(pageNumber = 1) {
  spinner.classList.remove("hidden");
  newsContainer.innerHTML = "";

  let response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=${pageSize}`
  );
  let data = await response.json();

  // total posts = 100 in JSONPlaceholder
  let totalCount = response.headers.get("x-total-count");
  let totalPages = Math.ceil(totalCount / pageSize);

  displayNews(
    data.map((post) => ({
      title: post.title,
      description: post.body,
      url: `https://jsonplaceholder.typicode.com/posts/${post.id}`,
      // ✅ FULL URL with https://
      urlToImage: "https://via.placeholder.com/400x200"
    }))
  );

  spinner.classList.add("hidden");

  page = pageNumber;
  prevBtn.disabled = page <= 1;
  nextBtn.disabled = page >= totalPages;
}

function displayNews(articles) {
  newsContainer.innerHTML = "";
  articles.forEach((article) => {
    let card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${article.urlToImage ? article.urlToImage : 'https://via.placeholder.com/400x200'}" alt="News Image"/>
      <div class="card-body">
        <h5>${article.title}</h5>
        <p>${article.description}</p>
        <a href="${article.url}" target="_blank">Read More</a>
      </div>
    `;
    newsContainer.appendChild(card);
  });
}

prevBtn.addEventListener("click", () => fetchNews(page - 1));
nextBtn.addEventListener("click", () => fetchNews(page + 1));

fetchNews(1);