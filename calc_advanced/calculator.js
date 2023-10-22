let result = document.getElementById("result");
let historyList = document.getElementById('history-list');
let history = [];
let shouldClearResult = false; // 标记是否需要清零
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

function calculateResult() {
  try {
    const expression = result.value;
    result.value = evaluateExpression(expression);
    shouldClearResult = true;

    // 将计算结果和表达式添加到历史记录
    history.push({ expression, result: result.value });
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
  historyList.innerHTML = '';
  history.forEach((entry, index) => {
      const listItem = document.createElement('li');
      const res = document.createElement('li');
      listItem.textContent = `${entry.expression} = `;
      res.textContent = `${entry.result}`;
      listItem.classList.add('f1');
      res.classList.add('f2');
      historyList.appendChild(listItem);
      historyList.appendChild(res);
  });
}

function evaluateExpression(expression) {
  // 使用eval来计算表达式，也可以使用更复杂的表达式解析库
  // 添加自定义函数，例如log、exp、pow等
  expression = expression.replace(/log/g, "Math.log");
  expression = expression.replace(/exp/g, "Math.exp");
  expression = expression.replace(/pow/g, "Math.pow");
  // 添加其他函数，例如round、floor、ceil、sqrt等
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

