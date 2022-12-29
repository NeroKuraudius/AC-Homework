// 初始變數
let list = document.querySelector('#my-todo')
let addBtn = document.querySelector('#add-btn')
let input = document.querySelector('#new-todo')

// 資料
const todos = ['Hit the gym', 'Read a book', 'Buy eggs', 'Organize office', 'Pay bills']
for (let todo of todos) {
  addItem(todo)
}


// 函式
function addItem(text) {
  let newItem = document.createElement('li')
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `
  list.appendChild(newItem)
}


// write your code here
// 1.add the todo
addBtn.addEventListener('click', function () {
  let text = input.value
  let newText = text
  if (text.length > 0) {
    // 移除空白後長度不為零才可新增項目
    while (newText.includes(' ')) {
      newText = newText.replace(' ', '')
    }
    if (newText.length === 0) {
    } else {
      addItem(text)
    }
  }
})
// 按Enter鍵也可新增
input.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    let text = input.value
    let newText = text
    if (text.length > 0) {
      while (newText.includes(' ')) {
        newText = newText.replace(' ', '')
      }
      if (newText.length === 0) {
      } else {
        addItem(text)
      }
    }
  }
})

// 2.delete the todo & done the todo
// 插入Done標題與Done list
const done = document.createElement('h4')
list.after(done)
done.innerText = 'Done'
const doneList = document.createElement('ul')
done.after(doneList)

list.addEventListener('click', function (event) {
  // Todo list點擊垃圾桶圖示刪除項目
  let target = event.target
  if (target.classList.contains('delete')) {
    let parent = target.parentElement
    parent.remove()
  } else if (target.tagName === 'LABEL') {
    // Todo list點擊文字將項目移至Done list
    let doneItem = document.createElement('li')
    doneList.appendChild(doneItem)
    doneItem.innerHTML = `
    <label for="done">${target.innerText}</label>
    <i class="delete fa fa-trash"></i>
  `
    doneItem.style.listStyle = 'none'
    doneItem.style.width = '237px'
    doneItem.style.marginBottom = '0.5rem'
    doneItem.style.marginLeft = '-2rem'
    doneItem.style.display = 'flex'
    doneItem.style.justifyContent = 'space-between'
    doneItem.style.color = '#cccccc'
    // 新增至Done list後刪除原項目
    let parent = target.parentElement
    parent.remove()
  }
})

// Done list點擊垃圾桶刪除項目
doneList.addEventListener('click', (event) => {
  let target = event.target
  if (target.classList.contains('delete')) {
    let parent = target.parentElement
    parent.remove()
  }
})
