let board = document.getElementById("board");
let number1 = "";
let number2 = "";
let operation = "";

function calculate(num1, num2, oper) {
  switch (oper) {
    case "+":
      return +num1 + +num2;
    case "-":
      return +num1 - +num2;
    case "*":
      return +num1 * +num2;
    case "/":
      return +num1 / +num2;
  }
}

document
  .querySelector(".calculator")
  .addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      handler(event.target.textContent);
    } else return;
  });

document.querySelector(".board").addEventListener("keydown", function (event) {
  event.preventDefault();
  handler(event.keyCode);
});

function handler(symbol) {
  if (symbol >= "0" && symbol <= "9") {
    if (operation) {
      number2 = number2 + symbol;
    } else {
      number1 = number1 + symbol;
    }
  }

  switch (symbol) {
    case "C":
      number1 = "";
      number2 = "";
      break;
    case ".":
    case ",":
      if (operation) {
        number2 = number2.indexOf(".") < 0 ? number2 + "." : number2;
      } else {
        number1 = number1.indexOf(".") < 0 ? number1 + "." : number1;
      }
      break;
    case "+":
    case "-":
    case "*":
      if (number2) {
        number1 = String(calculate(number1, number2, symbol));
        number2 = "";
        operation = "";
      } else {
        operation = symbol;
      }
      break;
    case "←":
    case "Backspace":
      if (operation) {
        number2 = number2.slice(0, number2.length - 1);
      } else {
        number1 = number1.slice(0, number1.length - 1);
      }
      break;
    case "/":
      if (number2) {
        if (number2 != "" && number2 != "0") {
          number1 = String(calculate(number1, number2, symbol));
          number2 = "";
          operation = "";
        } else {
          number1 = "ZERO DIVISION";
        }
      } else {
        operation = symbol;
      }
      break;
    case "√":
      if (operation) {
        number2 = number2 < 0 ? "NEGAT.RADICAL" : String((+number2) ** (1 / 2));
      } else {
        number1 = number1 < 0 ? "NEGAT.RADICAL" : String((+number1) ** (1 / 2));
      }
      break;
    case "X²":
      if (operation) {
        number2 = String((+number2) ** 2);
      } else {
        number1 = String((+number1) ** 2);
      }
      break;
    case "/-/":
      if (operation) {
        number2 = String(-+number2);
      } else {
        number1 = String(-+number1);
      }
      break;
    case "=":
    case "Enter":
      if (operation != "") {
        number1 = String(calculate(number1, number2, operation));
        number2 = "";
        operation = "";
      }
  }

  board.value = number1 + operation + number2; // демонстрация всего выражения
  /*if (operation) {
    board.value = number2;
  } else {                                     // демонстрация только одного аргумента
    board.value = number1;
  }*/
}
