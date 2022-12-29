const baseUrl = 'https://movie-list.alphacamp.io'
const indexUrl = baseUrl + '/api/v1/movies/'
const posterUrl = baseUrl + '/posters/'
const movies = []
let filteredMovies = []
const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const paginator = document.querySelector('#paginator')
const moviePerPage = 12

// 新增電影清單
function renderMovieList(datas) {
  console.log(datas)
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
              <button class="btn btn-info btn-add-favorite" data-id='${data.id}'>❤</button>
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

// 將電影加入收藏
function addToFavorite(id) {
  const favoriteList = JSON.parse(localStorage.getItem('favoriteMovies')) || []
  const moive = movies.find((movie) => movie.id === id)
  if (favoriteList.some((movie) => moive.id === id)) {
    return alert('This moive has been added.')
  }
  favoriteList.push(movie)
  localStorage.setItem('favoriteMovies', JSON.stringify(favoriteList))
}

// 電影清單分頁
function getMovieByPage(page) {
  const showMovie = filteredMovies.length ? filteredMovies : movies
  const startIndex = (page - 1) * moviePerPage
  return showMovie.slice(startIndex, startIndex + moviePerPage)
}

// 計算總頁數
function renderPaginator(number) {
  const totalPageNumber = Math.ceil(number / moviePerPage)
  let rawHTML = ``
  for (let i = 1; i <= totalPageNumber; i++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`
  }
  paginator.innerHTML = rawHTML
}

// 點擊More按鈕秀出電影詳細資訊、點擊愛心按鈕加入收藏清單
dataPanel.addEventListener('click', function dataPanelClick(event) {
  if (event.target.matches('.btn-show-movie')) {
    showMovieMadol(Number(event.target.dataset.id))
  } else if (event.target.matches('.btn-add-favorite')) {
    addToFavorite(Number(event.target.dataset.id))
  }
})

// 點擊分頁顯示電影清單
paginator.addEventListener('click', function paginatorClick(event) {
  if (event.target.tagName !== "A") {
    return
  }
  const page = Number(event.target.dataset.page)
  renderMovieList(getMovieByPage(page))
})

// 製作電影清單
axios
  .get(indexUrl)
  .then((response) => {
    movies.push(...response.data.results)
    renderPaginator(movies.length)
    renderMovieList(getMovieByPage(1))
  })
  .catch((err) => console.log(err))

// 搜尋特定電影
searchForm.addEventListener('submit', function searchByKeyWord(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()
  if (!keyword.length) {
    return alert('請輸入有效字串！')
  }
  filteredMovies = movies.filter((movie) => {
    movie.title.toLowerCase().includes(keyword)
  })
  if (filteredMovies.length === 0) {
    return alert(`您輸入的關鍵字：${keyword} 沒有符合條件的電影`)
  }
  renderPaginator(filteredMovies.length)
  renderMovieList(getMovieByPage(1))
})
