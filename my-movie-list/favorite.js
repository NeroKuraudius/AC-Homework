const baseUrl = 'https://movie-list.alphacamp.io'
const indexUrl = baseUrl + '/api/v1/movies/'
const posterUrl = baseUrl + '/posters/'
const movies = JSON.parse(localStorage.getItem('favoriteMovies'))
const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

// 新增電影清單
function renderMovieList(datas) {
  let rawHTML = ''
  datas.forEach(data => {
    rawHTML += `
    <div class="col-sm-3">
        <div class="mb-2">
          <div class="card">
            <img
              src="${posterUrl + data.image}"
              class="card-img-top" alt="Movie Poster" />
            <div class="card-body">
              <h5 class="card-title">${data.title}</h5>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal"
                data-bs-target="#movie-modal" data-id='${data.id}'>>More</button>
              <button class="btn btn-danger btn-remove-favorite" data-id='${data.id}'>X</button>
            </div>
          </div>
        </div>
      </div>`
  });
  dataPanel.innerHTML += rawHTML
}

// 電影詳細資訊製作(綁定id)
function showMovieMadol(id) {
  const madolTitle = document.querySelector('#movie-modal-title')
  const madolDate = document.querySelector('#movie-madol-date')
  const madolDescription = document.querySelector('#movie-madol-description')
  const madolImage = document.querySelector('#movie-madol-image')

  axios.get(indexUrl + id).then(response => {
    const result = response.data.results
    madolTitle.innerText = result.title
    madolDescription.innerText = result.description
    madolDate.innetText = 'Release date: ' + result.release_date
    madolImage.innetHTML = `<img src='${posterUrl + result.image}' alt='movie-poster' class='img-fluid'>`
  })
}

// 移除收藏電影
function removeFavorite(id) {
  if (!movies || !movies.length) {
    return 
  }
  const movieIndex = movies.findIndex((movie) => { movie.id === id })
  if (movieIndex === -1) {
    return 
  }
  movies.splice(movieIndex, 1)
  localStorage.setItem('favoriteMovies', JSON.stringify(movies))
  renderMovieList(movies)
}

// 點擊More按鈕秀出電影詳細資訊、點擊愛心按鈕加入收藏清單
dataPanel.addEventListener('click', function dataPanelClick(event) {
  if (event.target.matches('.btn-show-movie')) {
    showMovieMadol(Number(event.target.dataset.id))
  } else if (event.target.matches('.btn-remove-favorite')) {
    removeFavorite(Number(event.target.dataset.id))
  }
})

renderMovieList(movies)