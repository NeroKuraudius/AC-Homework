const userUrl = 'https://user-list.alphacamp.io/api/v1/users'
const showUrl = userUrl + '/'
const allUsers = document.querySelector('#all-users')

// 函式：產生使用者
function userMaker(datas) {
  let cardHTML = ``
  datas.forEach(data => {
    cardHTML +=
      `<div class="card" style="width: 16rem;">
      <img src="${data.avatar}" class="card-img-top" data-bs-toggle="modal" data-bs-target="#user-modal" data-id="${data.id}" alt="...">
        <div class="card-body">
          <p class="card-text">${data.name} ${data.surname}</p>
        </div>
    </div>`
  })
  allUsers.innerHTML = cardHTML
}

// 取得所有使用者資料並產生使用者清單
let userDatas = []
axios.get(userUrl).then((response) => {
  userDatas.push(...response.data.results)
  userMaker(userDatas)
})
  .catch((err) => { console.log('err') })

// 綁定id
function showById(id) {
  const userName = document.querySelector('.modal-title')
  const userImg = document.querySelector(".user-image")
  const userInfo = document.querySelector('.user-info')

  axios.get(showUrl + id).then((response) => {
    const detail = response.data
    userName.innerText = `${detail.name} ${detail.surname}`
    userImg.src = `${detail.avatar}`
    userInfo.innerText =
      `Email: ${detail.email}\nGender: ${detail.gender}\nAge: ${detail.age}\nRegion: ${detail.region}\nBirthday: ${detail.birthday}`
  })
}

// 設定監聽器
allUsers.addEventListener('click', (event) => {
  const target = event.target
  if (target.matches('.card-img-top')) {
    showById(target.dataset.id)
  }
})

// 送出好友申請
const userModal = document.querySelector('#user-modal')
userModal.addEventListener('click', (event) => {
  const target = event.target
  if (target.matches('.btn-primary')) {
    alert('Your request has been sent.')
  }
})