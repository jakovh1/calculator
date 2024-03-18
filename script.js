const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const bottomScreen = document.querySelector(".bottom-screen");
const topScreen = document.querySelector(".top-screen");
const allClear = document.querySelector("button[value='ac']");
const clearEntry = document.querySelector("button[value='ce']");
const backspace = document.querySelector("button[value='backspace']");
const decimalPointButton = document.querySelector("button[value='decimal']");
const operators = ['+', '-', '/', '*'];
const equalSign = document.querySelector("button[value='equal-sign']");
let firstOperand = 0;
let secondOperand = 0;
let aritmethicalOperator = '';
let result;
let topScreenRow;
let presentOperators;
let lastOperatorIndex;
let regExpression;
let containsDecimalPoint = false;

numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        bottomScreen.textContent = bottomScreen.textContent + e.target.value;
    })
});

decimalPointButton.addEventListener('click', (e) => {

    presentOperators = Object.keys(checkOperators(bottomScreen.textContent));
    lastOperatorIndex = Number(presentOperators[presentOperators.length-1]);
    regExpression = /[*/+-]?\d+\.\d+$/;

    containsDecimalPoint = regExpression.test(bottomScreen.textContent);


    if (!isNaN(Number(bottomScreen.textContent[bottomScreen.textContent.length-1])) && !containsDecimalPoint) {
        bottomScreen.textContent = bottomScreen.textContent + '.';
    }

})

equalSign.addEventListener('click', () => {

    presentOperators = Object.keys(checkOperators(bottomScreen.textContent));
    lastOperatorIndex = Number(presentOperators[presentOperators.length-1]);

    if (lastOperatorIndex+1 < bottomScreen.textContent.length && lastOperatorIndex !== 0) {

        firstOperand = Number(bottomScreen.textContent.slice(0, lastOperatorIndex));
        secondOperand = Number(bottomScreen.textContent.slice(lastOperatorIndex+1, bottomScreen.textContent.length));

        console.log(firstOperand, secondOperand);
        result = roundIfDecimal(computeOperation(firstOperand, bottomScreen.textContent[lastOperatorIndex], secondOperand));
        
        topScreenRow = document.createElement("p");
        topScreenRow.textContent = bottomScreen.textContent + ' =  ' + result;
        topScreen.insertBefore(topScreenRow, topScreen.firstChild);
        bottomScreen.textContent = result;
        topScreen.scrollTop = topScreen.scrollHeight;

    }

});

operations.forEach(operation => {
    operation.addEventListener('click', () => {

        presentOperators = Object.keys(checkOperators(bottomScreen.textContent));
        lastOperatorIndex = Number(presentOperators[presentOperators.length-1]);

        if (bottomScreen.textContent.length === 0 && operation.textContent === '-') {

            bottomScreen.textContent = operation.textContent;

        } else if ((lastOperatorIndex === 0 || isNaN(lastOperatorIndex)) && bottomScreen.textContent[bottomScreen.textContent.length-1] != "." && !isNaN(bottomScreen.textContent[bottomScreen.textContent.length-1])) {

            firstOperand = Number(bottomScreen.textContent);
            bottomScreen.textContent = bottomScreen.textContent + operation.textContent;
            aritmethicalOperator = operation.textContent;

        } else if (lastOperatorIndex+1 < bottomScreen.textContent.length) {

            secondOperand = Number(bottomScreen.textContent.slice(lastOperatorIndex+1, bottomScreen.textContent.length));
            result = roundIfDecimal(computeOperation(firstOperand, bottomScreen.textContent[lastOperatorIndex], secondOperand));

            topScreenRow = document.createElement("p");
            topScreenRow.textContent = bottomScreen.textContent + ' =  ' + result;
            topScreen.insertBefore(topScreenRow, topScreen.firstChild);
            bottomScreen.textContent = result + operation.textContent;
            firstOperand = result;
            topScreen.scrollTop = topScreen.scrollHeight;

        }
        
    })
});

allClear.addEventListener('click', () => {
    bottomScreen.innerHTML = "";
    topScreen.innerHTML = "";
});

clearEntry.addEventListener('click', () => {
    bottomScreen.innerHTML = "";
    firstOperand = 0;
    secondOperand = 0;
    aritmethicalOperator = '';
});

backspace.addEventListener('click', () => {
    bottomScreen.textContent = bottomScreen.textContent.slice(0, -1);
});

function computeOperation(firstOperand, operation, secondOperand) {
    
    if (operation === '+') {

        return firstOperand + secondOperand;

    } else if (operation === '-') {

        return firstOperand - secondOperand;

    } else if (operation === '*') {

        return firstOperand * secondOperand;

    } else {

        return firstOperand / secondOperand;

    }
}

function checkOperators(str) {

    let resultObject = {};
    let index = 0;

    for (const char of str) {

        if (operators.includes(char)) {

            resultObject[index] = char;

        }

        index++;

    }

    return resultObject;
}

function roundIfDecimal(num) {
    return num % 1 !== 0 ? num.toFixed(3) : num
}