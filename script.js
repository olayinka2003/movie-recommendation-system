const apiKey = "api_key=c7cba54e8036127f06f9792f9781dbad";
const baseUrl = "https://api.themoviedb.org/3";
const apiURl = baseUrl + "/discover/movie?sort_by=popularity.desc&" + apiKey;
const imgUrl = "https://image.tmdb.org/t/p/w500";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const searchURl = baseUrl + "/search/movie?" + apiKey;
const genre = {
  genres: [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ],
};
const signOut = document.querySelector(".sign-out");
const tagEl = document.getElementById("tag");
setGenre();
function setGenre() {
  tagEl.innerHTML = "";
  genre.genres.forEach((genre) => {
    const t = document.createElement("div");
    t.classList.add("tags");
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener("click", (e) => {
      getMovies(apiURl + "&with_genres=" + e.target.id);
    });
    tagEl.appendChild(t);
  });
}

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showMovies(data.results);
    });
}
getMovies(apiURl);

function showMovies(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");
    movieDiv.innerHTML = `<img src="${imgUrl + poster_path}" alt="${title}" />
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getColor(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
         ${overview}
    </div>`;
    main.appendChild(movieDiv);
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(searchURl + "&query=" + searchTerm);
  } else {
    getMovies(apiURl);
  }
});

signOut.addEventListener("click", () => {
  document.location.href = "index.html";
});
