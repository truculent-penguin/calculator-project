
const calcInputs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const operatorInputs = {
    "÷" : function (num1, num2) {
            return num1 / num2;
        },
    "x" : function (num1, num2) {
            return num1 * num2;
        },
    "-" : function (num1, num2) {
            return num1 - num2;
        },
    "+" : function (num1, num2) {
            return num1 + num2;
        }
}

let currentFunction = []

let input = "";
let firstEntry = 0;
let secondEntry = 0;
let operand = undefined;
let total = 0;

let operatorUsed = ""


const display = document.getElementById("number-display");
const calcDiv = document.getElementById("calc-buttons");
const numberBtns = document.getElementById("number-buttons");
const operatorBtns = document.getElementById("operator-buttons");
const operatorKeys = Object.keys(operatorInputs);
const operatorDisplay = document.getElementById("operator-display");
const equalBtn = document.getElementById("equal-button");
const clearBtn = document.getElementById("clear-button");

// Past Operation Items
const pastOperations = document.getElementById("past-operations")

// Create number buttons
calcInputs.map((btn) => {
    const calcBtn = numberBtns.appendChild(document.createElement("button"))
    calcBtn.textContent = btn
    calcBtn.className = "numBtn btn"
    calcBtn.addEventListener("click", () => {
        if (firstEntry !== 0) {
            operatorUsed = operatorDisplay.textContent
            operatorDisplay.textContent = ""
        }
        input = input + calcBtn.textContent
        display.textContent = input;
    })
})

//  Create operator buttons
operatorKeys.map((btn) => {
    const operatorBtn = operatorBtns.appendChild(document.createElement("button"));
    operatorBtn.textContent = btn
    operatorBtn.className = "oppBtn btn"
    operatorBtn.addEventListener("click", () => {
        if (firstEntry === 0) {
            firstEntry = +input
            operand = operatorInputs[operatorBtn.textContent]
            operatorUsed = btn;
            input = ""
            operatorDisplay.textContent = btn;
        } else {
            displayCalc()
            operatorUsed = btn;
            operand = operatorInputs[operatorBtn.textContent]
            operatorDisplay.textContent = btn;
            input = "";
            firstEntry = total;
            secondEntry = 0
        }
    })
})

// Equal sign run functions
equalBtn.addEventListener("click", () => {
    displayCalc();
    prepTotal();
});

// Clear Function
clearBtn.addEventListener("click", () => {
    clearData()
})

// Run Calculation
function runCalculation(num1, instruction, num2) {
    return instruction(num1, num2)
}

// Helper Functions
function displayCalc() {
    if (operand === undefined) {
        if (!firstEntry) {
            firstEntry = +input
            total = firstEntry;
            display.textContent = total;
        }
    } else {
        secondEntry = +input
        total = runCalculation(firstEntry, operand, secondEntry)
        display.textContent = total;
        createCurrentFunction(firstEntry, operatorUsed, secondEntry, total)
        displayPastFunctions(currentFunction);
        operatorDisplay.textContent = ""
        
    }
}

// Clears Data
function clearData() {
    input = ""
    firstEntry = 0;
    secondEntry = 0;
    operand = undefined;
    total = 0
    operatorUsed = ""
    display.textContent = total;
    operatorDisplay.textContent = ""
}

function prepTotal() {
    input = ""
    firstEntry = total
    secondEntry = 0;
    operand = undefined;
}

// creates function to be displayed
function createCurrentFunction (num1, operatorSign, num2, total) {
    currentFunction.push(`${num1} ${operatorSign} ${num2} = ${total}`)
}

// displays function
function displayPastFunctions(arr) {
    const currentChild = pastOperations.appendChild(document.createElement("p"))
    currentChild.className = "pastFunctions"
    currentChild.textContent = arr.pop();
}

function cleanUpProcessedOperations() {
    pastOperations.innerHTML = ""
}

document.getElementById("clear-past-operations").addEventListener("click", () => {
    cleanUpProcessedOperations()
})