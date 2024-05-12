const apiKey = "api_key=c7cba54e8036127f06f9792f9781dbad";
const baseUrl = "https://api.themoviedb.org/3";
const apiURl = baseUrl + "/discover/movie?sort_by=popularity.desc&" + apiKey;

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
  data.forEach((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");
    movieDiv.innerHTML = ` <div class="movie">
    <img src="img/action.jpg" alt="action logo" />
    <div class="movie-info">
      <h3>Movie Title</h3>
      <span class="green">9.8</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, adipisci
      suscipit quia, eius error doloribus minus eveniet,
    </div>
  </div>`;
  });
}
