// 統計區變數
const scores = document.querySelector(".scores")
const times = document.querySelector(".times")

// 牌區變數
const Symbols = [
  "https://assets-lighthouse.alphacamp.co/uploads/image/file/17988/__.png",
  "https://assets-lighthouse.alphacamp.co/uploads/image/file/17991/diamonds.png",
  "https://assets-lighthouse.alphacamp.co/uploads/image/file/17992/heart.png",
  "https://assets-lighthouse.alphacamp.co/uploads/image/file/17989/__.png"
]
const gameStatus = {
  waitingFirstCard: "waitingFirstCard",
  waitingSecondCard: "waitingSecondCard",
  matched: "matched",
  matchingFail: "matchingFail",
  gameSet: "gameSet"
}


// 程式碼區
const utility = {
  // 洗牌
  shuffle(count) {
    const numberList = Array.from(Array(count).keys())
    for (let i = count - 1; i > 0; i--) {
      randomNumber = Math.floor(Math.random() * (i + 1));
      [numberList[i], numberList[randomNumber]] = [numberList[randomNumber], numberList[i]]
    }
    return numberList
  }
}

const view = {
  transformNumber(number) {
    // 特殊數字顯示轉換
    switch (number) {
      case 11:
        return "J"
      case 12:
        return "Q"
      case 13:
        return "K"
      case 1:
        return "A"
      default:
        return number
    }
  },

  getCardElemnet(index) {
    // 回傳牌背
    return `<div class="card back" data-index="${index}"></div>`
  },

  getCardContent(index) {
    const number = this.transformNumber(1 + (index % 13))
    const symbol = Symbols[Math.floor(index / 13)]
    // 回傳牌面
    return `
      <p>${number}</p>
      <img src="${symbol}">
      <p>${number}</p>
    `
  },

  displayCards(indexes) {
    // 產生52張牌並隨機排列
    const rootElement = document.querySelector('#cards-area')
    rootElement.innerHTML = indexes.map(index => this.getCardElemnet(index)).join("")
  },

  flipCards(...cards) {
    cards.map(card => {
      if (card.classList.contains('back')) {
        card.classList.remove('back')
        card.innerHTML = this.getCardContent(Number(card.dataset.index))
        return
      }
      card.classList.add('back')
      card.innerHTML = null
    })
  },

  pairCards(...cards) {
    cards.map(card => {
      card.classList.add('paired')
    })
  },

  renderScores(score) {
    scores.innerText = `Score: ${score}`
  },

  renderTimes(count) {
    times.innerText = `You've tried: ${count} times.`
  },

  appendWrongAnimation(...cards) {
    cards.map((card) => {
      card.classList.add("wrong")
      card.addEventListener('animationend',
        e => { card.classList.remove('wrong') },
        // one time use only
        { once: true })
    })
  },

  gameFinished() {
    const div = document.createElement('div')
    div.classList.add('achieved')
    div.innerHTML = `
      <p>Complete!</p>
      <p>Score: ${model.totalScore}</p>
      <p>You've tried: ${model.triedTimes} times.</p>
    `
    times.after(div)
  }
}

const model = {
  revealedCards: [],

  isRevealedCardsPair() {
    return Number(this.revealedCards[0].dataset.index) % 13 === Number(this.revealedCards[1].dataset.index) % 13
  },

  totalScore: 0,

  triedTimes: 0,
}

const controller = {
  currentState: gameStatus.waitingFirstCard,

  generateCards() {
    view.displayCards(utility.shuffle(52))
  },

  dispatchCardAction(card) {
    if (!card.classList.contains('back')) {
      return
    }
    switch (this.currentState) {
      case gameStatus.waitingFirstCard:
        view.flipCards(card)
        model.revealedCards.push(card)
        this.currentState = gameStatus.waitingSecondCard
        return

      case gameStatus.waitingSecondCard:
        view.renderTimes(model.triedTimes += 1)
        view.flipCards(card)
        model.revealedCards.push(card)
        if (model.isRevealedCardsPair()) {
          this.currentState = gameStatus.matched
          view.renderScores((model.totalScore += 10))
          view.pairCards(...model.revealedCards)
          model.revealedCards = []
          console.log(model.totalScore)
          if (model.totalScore === 260) {
            this.currentState = gameStatus.gameSet
            view.gameFinished()
            return
          }
          this.currentState = gameStatus.waitingFirstCard
        } else {
          this.currentState = gameStatus.matchingFail
          view.appendWrongAnimation(...model.revealedCards)
          setTimeout(this.resetCards, 1000)
        }
        return
    }
  },

  resetCards() {
    view.flipCards(...model.revealedCards)
    model.revealedCards = []
    controller.currentState = gameStatus.waitingFirstCard
  }
}
controller.generateCards()

// 監聽器區
const allCard = document.querySelectorAll('.card')
allCard.forEach((one) => {
  one.addEventListener('click', (event) => {
    controller.dispatchCardAction(one)
  })
})



