const currentDisplay = document.querySelector(".current-display");
const expressionDisplay = document.querySelector(".expression-display");

let currentInput = "";
let operator = null;
let firstNumber = null;
let expression = "";

// handle numbers
document.querySelectorAll("[data-number]").forEach(button => {
    button.addEventListener("click", () => {
        if (button.dataset.number === "." && currentInput.includes(".")) return;
        currentInput += button.dataset.number;
        currentDisplay.textContent = currentInput;
    });
});

// handle operators
document.querySelectorAll("[data-operator]").forEach(button => {
    button.addEventListener("click", () => {
        if (currentInput === "") return;
        if (firstNumber !== null && operator !== null) {
            calculate();
        } else {
            firstNumber = parseFloat(currentInput);
        }
        operator = button.dataset.operator;
        expression = `${firstNumber}${operator}`;
        expressionDisplay.textContent = expression;
        currentInput = "";
    });
});

// back button
document.querySelector("#back").addEventListener("click", () => {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        currentDisplay.textContent = currentInput;
    }
});

// clear button
document.querySelector("#clear").addEventListener("click", () => {
    resetCalculator();
});

// equals button
document.querySelector("#equals").addEventListener("click", () => {
    if (firstNumber === null || currentInput === "" || operator === null) return;
    calculate();
});

// calculate
function calculate() {
    const secondNumber = parseFloat(currentInput);
    let result = 0;

    switch (operator) {
        case "+":
            result = add(firstNumber, secondNumber);
            break;
        case "-":
            result = subtract(firstNumber, secondNumber);
            break;
        case "*":
            result = multiply(firstNumber, secondNumber);
            break;
        case "÷":
            if (secondNumber === 0) {
                currentDisplay.textContent = "Can't divide by 0";
                setTimeout(() => {
                    resetCalculator();
                }, 2000);
                return;
            }
            result = divide(firstNumber, secondNumber);
            break;
    }
    expressionDisplay.textContent = `${firstNumber}${operator}${secondNumber}`;
    currentDisplay.textContent = result;
    firstNumber = result;
    currentInput = "";
    operator = null;
}

function resetCalculator() {
    currentInput = "";
    firstNumber = null;
    operator = null;
    expression = "";
    currentDisplay.textContent = "";
    expressionDisplay.textContent = "";
}

function add(firstNumber, secondNumber) {
    result = firstNumber + secondNumber;
    return result;
}

function subtract(firstNumber, secondNumber) {
    result = firstNumber - secondNumber;
    return result;
}

function multiply(firstNumber, secondNumber) {
    result = firstNumber * secondNumber;
    return result;
}

function divide(firstNumber, secondNumber) {
    result = firstNumber / secondNumber;
    return result;
}