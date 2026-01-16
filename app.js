const num1 = "";
const num2 = "";
const operator = "";

const display = document.querySelector(".display");


function add(num1, num2) {
    console.log(num1 + num2);
}

function subtract(num1, num2) {
    console.log(num1 - num2);
}

function multiply(num1, num2) {
    console.log(num1 * num2);
}

function divide(num1, num2) {
    console.log(num1 / num2);
}

function operate(num1, num2, operator) {
    if (operator === "+") {
        add(num1, num2);
    } else if (operator === "-") {
        subtract(num1, num2);
    } else if (operator === "*") {
        multiply(num1, num2);
    } else if (operator === "/") {
        divide(num1, num2);
    }
}

// operate(2, 2, "*");

function logicButton() {
    const buttons = document.querySelectorAll(".button");
    buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
            let target = event.target;
            let keyValue = target.textContent;
            if (target.classList.contains("btn-clear")) {
                clearDisplay();
            } else if (target.classList.contains("btn-back")) {
                display.value = display.value.slice(0, -1);
                // button opperators and decimal can only be displayed once
            } else if (target.classList.contains("btn-operator") || target.classList.contains("btn-decimal")) {
                if (display.value != "" && !display.value.includes(keyValue)) {
                    appendToDisplay(keyValue);

                }
            }
            else {
                appendToDisplay(keyValue);
            }
        });
    });
}
logicButton();

function appendToDisplay(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}



