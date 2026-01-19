const currentDisplay = document.querySelector(".current-operand");
let currentInput = "";
let operator = null;
let firstNumber = null;

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
    currentInput = "";
    firstNumber = null;
    operator = null;
    currentDisplay.textContent = "";
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
                alert("Cannot divide by zero");
                resetCalculator();
                return;
            }
            result = divide(firstNumber, secondNumber);
            break;
    }
    currentDisplay.textContent = result;
    firstNumber = result;
    currentInput = "";
    operator = null;
}

function resetCalculator() {
    currentInput = "";
    firstNumber = null;
    operator = null;
    currentDisplay.textContent = "";
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