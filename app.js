const currentDisplay = document.querySelector(".current-display");
const expressionDisplay = document.querySelector(".expression-display");

let currentInput = "";
let operator = null;
let firstNumber = null;
let expression = "";
let resultsDisplayed = false;

// mouse-click event listeners
document.querySelectorAll("[data-number]").forEach(button => {
    button.addEventListener("click", () => handleNumbers(button.dataset.number));
});

document.querySelectorAll("[data-operator]").forEach(button => {
    button.addEventListener("click", () => handleOperators(button.dataset.operator));
});

document.querySelector("#back").addEventListener("click", handleBackSpace);
document.querySelector("#clear").addEventListener("click", handleClear);
document.querySelector("#equals").addEventListener("click", handleEquals);

// keyboard event listeners
document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (!isNaN(key)) handleNumbers(key);
    else if (["+", "-", "*", "/"].includes(key)) handleOperators(key);
    else if (key === ".") handleNumbers(".");
    else if (key === "Enter" || key === "=") handleEquals();
    else if (key === "Escape") handleClear();
});


// handle numbers
function handleNumbers(number) {
    if (resultsDisplayed) {
        currentInput = "";
        resultsDisplayed = false;
    }
    // prevents adding multiple decimal points
    if (number === "." && currentInput.includes(".")) return;
    currentInput += number;
    updateDisplay();
}

// handle operators
function handleOperators(updatedOperator) {
    // const updatedOperator = button.dataset.operator;

    // do nothing if no number have been selected
    if (currentInput === "" && firstNumber === null) return;

    // allows user to chain the expression even after pressing equals
    if (resultsDisplayed) resultsDisplayed = false;

    // operator can be changed after it has already been selected
    if (currentInput === "" && firstNumber !== null) {
        operator = updatedOperator;
        expression = `${firstNumber}${operator}`;
        expressionDisplay.textContent = expression;
        return;
    }

    // calculate after both numbers are available 
    if (firstNumber !== null && currentInput !== null) {
        calculate();
    } else if (currentInput !== "") {
        firstNumber = parseFloat(currentInput);
    }
    operator = updatedOperator;
    expression = `${firstNumber}${operator}`;
    expressionDisplay.textContent = expression;
    currentInput = "";
}

// back button
function handleBackSpace() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }
}

// clear button
function handleClear() {
    resetCalculator();
}

// equals button
function handleEquals() {
    if (firstNumber === null || currentInput === "" || operator === null) return;
    calculate();
    resultsDisplayed = true;
}

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
        case "/":
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
    resultsDisplayed = false;
}

function updateDisplay() {
    currentDisplay.textContent = currentInput || "0";
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