const currentDisplay = document.querySelector(".current-display");
const expressionDisplay = document.querySelector(".expression-display");

let currentInput = "";
let operator = null;
let firstNumber = null;
let expression = "";
let resultsDisplayed = false;

// handle numbers
document.querySelectorAll("[data-number]").forEach(button => {
    button.addEventListener("click", () => {
        if (resultsDisplayed) {
            currentInput = "";
            resultsDisplayed = false;
        }
        // prevents adding multiple decimal points
        if (button.dataset.number === "." && currentInput.includes(".")) return;
        currentInput += button.dataset.number;
        updateDisplay();
    });
});

// handle operators
document.querySelectorAll("[data-operator]").forEach(button => {
    button.addEventListener("click", () => {
        const updatedOperator = button.dataset.operator;

        // do nothing if no number have been selected
        if (currentInput === "" && firstNumber === null) return;

        // allows user to chain the expression even after pressing equals
        if (resultsDisplayed) resultsDisplayed = false;
        
        // operator can be changed after it has already been selected
        if (currentInput === "" && firstNumber !== null) {
            operator = updatedOperator;
            expression = `${firstNumber}${updatedOperator}`;
            expressionDisplay.textContent = expression;
            return;
        }

        // calculate after both numbers are available 
        if (firstNumber !== null && currentInput !== null) {
            calculate();
        } else if (currentInput !== "") {
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
        updateDisplay();
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
    resultsDisplayed = true;
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