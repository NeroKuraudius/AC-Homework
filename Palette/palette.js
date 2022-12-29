// 選出所有input欄位：
const colors = document.querySelectorAll(".colors");
// 顏色預覽函式
function colorPreview() {
  // 以迴圈預覽input後的單一顏色深淺：
  for (let i = 0; i < colors.length; i++) {
    // 設定每個input值：
    let inputValue = colors[i].children[1].value;
    // 當value不為空白：
    if (inputValue.length > 0) {
      let numberValue = Number(inputValue);
      // 若numberValue不符合轉換規則：
      if (isNaN(numberValue) || numberValue > 255 || numberValue < 0) {
        // 清空欄位並跳出提醒視窗
        colors[i].children[1].value = "";
        return alert("請輸入0~255之間的整數");
      } // 當numberValue符合轉換規則：
      else {
        // 轉為十六進位：
        let inputHEX = numberValue.toString(16);
        // 若轉換後只有一碼，加0補齊
        if (inputHEX.length < 2) {
          inputHEX = inputHEX.padStart(2, "0");
        }
        // 判斷不同顏色回傳的HEX
        if (i === 0) {
          colors[i].children[2].style.backgroundColor = `#${inputHEX}0000`;
        } else if (i === 1) {
          colors[i].children[2].style.backgroundColor = `#00${inputHEX}00`;
        } else if (i === 2) {
          colors[i].children[2].style.backgroundColor = `#0000${inputHEX}`;
        }
      }
    }
  }
}
// 設置監聽器，任意位置點擊預覽顏色
const HTML = document.querySelector("html");

// 選出按鈕
const convertButton = document.querySelector("#dangerbtn");
// 設置監聽器，匯出顏色HEX碼與轉換顏色
convertButton.addEventListener("click", (event) => {
  let convertHEX = ``;
  const outputHEX = document.querySelector(".output-hex");
  const outputColor = document.querySelector(".output-color");
  for (let i = 0; i < colors.length; i++) {
    if (colors[i].children[1].value === "") {
      alert("請輸入0~255之間的整數");
      return "";
    } else {
      continue;
    }
  }
  // 將所有input轉換成十六進位並組合
  colors.forEach((color) => {
    if (color.children[1].value.length !== 0) {
      let inputHEX = Number(color.children[1].value).toString(16);
      // 若轉換後只有一個字碼，加0補齊
      if (inputHEX.length < 2) {
        inputHEX = inputHEX.padStart(2, "0");
      }
      convertHEX += inputHEX;
      // 輸出組合後的色碼
      outputHEX.value = "#" + convertHEX;
      // 變更輸出色
      outputColor.style.backgroundColor = "#" + convertHEX;
    }
  });
});
