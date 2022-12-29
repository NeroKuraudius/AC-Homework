let players = [
  { name: "櫻木花道", pts: 0, reb: 0, ast: 0, stl: 0, blk: 2 },
  { name: "流川楓", pts: 30, reb: 6, ast: 3, stl: 3, blk: 0 },
  { name: "赤木剛憲", pts: 16, reb: 10, ast: 0, stl: 0, blk: 5 },
  { name: "宮城良田", pts: 6, reb: 0, ast: 7, stl: 6, blk: 0 },
  { name: "三井壽", pts: 21, reb: 4, ast: 3, stl: 0, blk: 0 }
];

const dataPanel = document.querySelector("#data-panel");

// write your code here
let playerData = ``
function displayPlayerList(players) {
  players.forEach((member) => {
    playerData += `<tr>`
    Object.values(member).forEach((performance) => {
      if (typeof performance === typeof playerData) {
        playerData += `<td>${performance}</td>`
      } else {
        playerData += `
      <td>
        <i class="fa fa-plus-circle up"></i>
        ${performance}
        <i class ="fa fa-minus-circle down"></i></td>
      `
      }
    })
  })
  playerData += `</tr>`
  return playerData
}

dataPanel.addEventListener('click', (event) => {
  let target = event.target
  if (target.classList.contains('up')) {
    let score = Number(target.parentElement.innerText)
    score += 1
    target.parentElement.innerHTML = `
     <i class="fa fa-plus-circle up"></i>
     ${score}
     <i class ="fa fa-minus-circle down"></i>`
  } else if (target.classList.contains('down')) {
    let score = Number(target.parentElement.innerText)
    score -= 1
    if (score < 0) { score = 0 }
    target.parentElement.innerHTML = `
     <i class="fa fa-plus-circle up"></i>
     ${score}
     <i class ="fa fa-minus-circle down"></i>`
  }
})

allPlayersData = displayPlayerList(players)
dataPanel.innerHTML = allPlayersData