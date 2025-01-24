const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');
const deleteButton = document.querySelector('.delete-button');
deleteButton.addEventListener('click', () => {
    clearHistory();
});

let currentInput = '0';
let previousInput = '';
let operator = '';
let resetDisplay = false;

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const value = button.textContent.trim();

        if (!isNaN(value) || value === '.') {
            handleNumber(value);
        } else {
            handleOperator(value);
        }

        updateDisplay();
    });
});

function handleNumber(value) {
    if (resetDisplay) {
        currentInput = value === '.' ? '0.' : value;
        resetDisplay = false;
    } else {
        if (value === '.' && currentInput.includes('.')) return;
        if (currentInput.length >= 10) return;
        currentInput = currentInput === '0' ? value : currentInput + value;
    }
}

function handleOperator(value) {
    switch (value) {
        case 'AC':
            resetCalculator();
            break;
        case '=':
            if (operator && previousInput) {
                const result = calculate(previousInput, currentInput, operator);
                addHistory(`${previousInput} ${operator} ${currentInput} = ${result}`);
                currentInput = result;
                operator = '';
                previousInput = '';
                resetDisplay = true;
            }
            break;
        default:
            if (!operator) {
                operator = value;
                previousInput = currentInput;
                resetDisplay = true;
            } else if (!resetDisplay) {
                previousInput = calculate(previousInput, currentInput, operator);
                operator = value;
                resetDisplay = true;
            }
            break;
    }
    updateDisplay();
}

function calculate(num1, num2, op) {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    let result = 0;

    switch (op) {
        case '+':
            result = n1 + n2;
            break;
        case '-':
            result = n1 - n2;
            break;
        case '*':
            result = n1 * n2;
            break;
        case '/':
            result = n2 !== 0 ? n1 / n2 : '그런건 없어요';
            break;
        default:
            break;
    }

    return result.toString();
}

function updateDisplay() {
    if (operator && resetDisplay) {
        display.textContent = `${previousInput} ${operator}`;
    } else if (operator) {
        display.textContent = `${previousInput} ${operator} ${currentInput}`;
    } else {
        display.textContent = currentInput;
    }
}

const historyList = document.querySelector('.history-list');

let history = [];

function addHistory(entry) {
    history.push(entry);
    const li = document.createElement('li');
    li.textContent = entry;
    historyList.appendChild(li);
}

function clearHistory() {
    history = [];
    historyList.innerHTML = '';
}

function resetCalculator() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    updateDisplay();
}
