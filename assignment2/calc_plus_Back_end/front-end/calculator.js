// 部署时，注释取消
// const serverData = require('./serve');
// let database=[];
// async function getData() {
//   try {
//     const data = await serverData.fetchData();
//     database=data;
//     console.log(database);// 使用async/await获取从数据库获取的数据并打印
//   } catch (error) {
//     console.error(error);
//   }
// }
// getData();
let result = document.getElementById("result");
let historybody = document.getElementById("history");
let historyList = document.getElementById("history-list");
let pager = document.getElementsByClassName("pager");
let history = [
  { id: 1, expression: '3 + 5 ', result: '8' },
  { id: 2, expression: 'floor(2.9) ', result: '2' },
  { id: 3, expression: '2^2', result: '4' },
  { id: 4, expression: 'exp(3) ', result: '20.085536923187668' },
  { id: 5, expression: 'ceil(5.3)', result: '6' },
  { id: 6, expression: 'sin(45)', result: '0.8509035245341184' },
  { id: 7, expression: 'log(1)', result: '0' },
  { id: 8, expression: '2^5 ', result: '44' },
  { id: 9, expression: '120 - 56', result: '64' },
  { id: 10, expression: 'pow(2,3)', result: '8' }
];
let undoStack = []; // 存储操作历史的堆栈
let shouldClearResult = false; // 标记是否需要清零
let currentPage = 0;
const itemsPerPage =5;

function appendToResult(value) {
  if (result.value === "0" || shouldClearResult) {
    result.value = "";
    shouldClearResult = false;
  }
  if (result.value === "Error") {
    result.value = value;
  } else {
    result.value += value;
  }
}

function clearResult() {
  result.value = "0";
  shouldClearResult = false;
}

//come back to the last step
function undo() {
  if (result.value) {
    result.value = result.value.slice(0, -1);
    shouldClearResult = false;
  }
}

function calculateResult() {
  try {
    
    const expression = result.value;
    
    result.value = evaluateExpression(expression);
    shouldClearResult = true;

    // 将计算结果和表达式添加到历史记录
    history.push({ expression, result: result.value });
    undoStack = []; // 清空撤销堆栈，因为执行了新的操作
    showHistory();
  } catch (error) {
    result.value = "Error";
    shouldClearResult = true;
    setTimeout(() => {
      result.value = "0";
    }, 1500);
  }
}

// 历史记录
function showHistory() {
  // historyList.innerHTML = "";
  // history.forEach((entry, index) => {
  //   const listItem = document.createElement("li");
  //   const res = document.createElement("li");
  //   listItem.textContent = `${entry.expression} = `;
  //   res.textContent = `${entry.result}`;
  //   listItem.classList.add("f1");
  //   res.classList.add("f2");
  //   historyList.appendChild(listItem);
  //   historyList.appendChild(res);
  // });
  historyList.innerHTML = "";
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  const displayedHistory = history.slice(start, end);
  displayedHistory.forEach((entry, index) => {
    // const listItem = document.createElement('li');
    // listItem.textContent = `Expression: ${entry.expression}, Result: ${entry.result}`;
    const listItem = document.createElement("li");
    const res = document.createElement("li");
    listItem.textContent = `${entry.expression} = `;
    res.textContent = `${entry.result}`;
    listItem.classList.add("f1");
    res.classList.add("f2");
    historyList.appendChild(listItem);
    historyList.appendChild(res);
  });
  updatePagination();
}

function updatePagination() {
  const prevPageButton = document.getElementById("prev-page");
  const nextPageButton = document.getElementById("next-page");
  prevPageButton.disabled = currentPage === 0;
  nextPageButton.disabled =
    currentPage * itemsPerPage + itemsPerPage >= history.length;
}

function nextPage() {
  if (currentPage * itemsPerPage + itemsPerPage < history.length) {
    currentPage++;
    showHistory();
  }
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    showHistory();
  }
}

function evaluateExpression(expression) {
  // 使用eval来计算表达式，也可以使用更复杂的表达式解析库
  // 添加自定义函数，例如log、exp、pow等
  expression = expression.replace(/log/g, "Math.log");
  expression = expression.replace(/exp/g, "Math.exp");
  expression = expression.replace(/pow/g, "Math.pow");
  // 添加其他函数，例如round、floor、ceil、sqrt
  expression = expression.replace(/\^/g, '**');
  expression = expression.replace(/round/g, "Math.round");
  expression = expression.replace(/floor/g, "Math.floor");
  expression = expression.replace(/ceil/g, "Math.ceil");
  expression = expression.replace(/sqrt/g, "Math.sqrt");
  expression = expression.replace(/sqrt/g, "Math.sqrt");
  expression = expression.replace(/sin/g, "Math.sin");
  expression = expression.replace(/cos/g, "Math.cos");
  expression = expression.replace(/tan/g, "Math.tan");
  expression = expression.replace(/cot/g, "Math.cot");

  return eval(expression);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    calculateResult();
  } else if (event.key === "Escape") {
    clearResult();
  } else if (event.key === "Backspace") {
    result.value = result.value.slice(0, -1);
  } else if (/^[0-9+\-*/.^()%]$/.test(event.key)) {
    appendToResult(event.key);
  }
});

const buttons = document.querySelectorAll(".button");
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
  });
});

const btn = document.getElementById("btn");
btn.addEventListener("click", (event) => {
  event.preventDefault();
  historybody.classList.add("active");
  historybody.style = "display: block;";
  if (history.length > 0) {
    showHistory();
  }
});
pager.addEventListener("click", (event) => {});
