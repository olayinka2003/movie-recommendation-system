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
    const { title, poster_path, vote_average, overview, id } = movie;
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
         <br/>
         <button class= "Know-more" id="${id}" >Know more</button>
    </div>`;
    main.appendChild(movieDiv);

    document.getElementById(id).addEventListener("click", () => {
      console.log(id);
      openNav(movie);
    });
  });
}
const overlay = document.getElementById("overlay-content");
/* Open when someone clicks on the span element */
function openNav(movie) {
  let id = movie.id;
  fetch(baseUrl + `/movie/` + id + `/videos?` + apiKey)
    .then((response) => response.json())
    .then((videoData) => {
      console.log(videoData);
      if (videoData) {
        document.getElementById("myNav").style.width = "100%";
        if (videoData.results.length > 0) {
          var embed = [];
          videoData.results.forEach((video) => {
            let { name, key, site } = video;
            if (site == "YouTube") {
              embed.push(`
              <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}?si=2KP-XLKD2ik0WFJ7" title="${name}" class = "embed hide"frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              
              `);
            }
          });

          overlay.innerHTML = embed.join("");
          activeSlide = 0;
          showVideos();
        }
      }
    });
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}
var activeSlide = 0;
var totalVideos = 0;
function showVideos() {
  let embedclasses = document.querySelectorAll(".embed");
  totalVideos = embedclasses.length;
  embedclasses.forEach((embedclass, idx) => {
    if (activeSlide == idx) {
      embedclass.classList.add("show");
      embedclass.classList.remove("hide");
    } else {
      embedclass.classList.add("hide");
      embedclass.classList.remove("show");
    }
  });
}

const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

leftArrow.addEventListener("click", () => {
  if (activeSlide > 0) {
    activeSlide--;
  } else {
    activeSlide = totalVideos - 1;
  }
  showVideos();
});
rightArrow.addEventListener("click", () => {
  if (activeSlide < totalVideos - 1) {
    activeSlide++;
  } else {
    activeSlide = 0;
  }
  showVideos();
});

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
