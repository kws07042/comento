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

// 버튼 클릭 이벤트 핸들러
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const value = button.textContent.trim();

        if (!isNaN(value) || value === '.') {
            handleNumber(value);
        } else {
            handleOperator(value);
        }

        // 버튼 클릭 시 디스플레이 업데이트
        updateDisplay();
    });
});

// 숫자 처리 함수
function handleNumber(value) {
    if (resetDisplay) {
        // 이전 연산 후 새 숫자 입력 시 초기화
        currentInput = value === '.' ? '0.' : value;
        resetDisplay = false;
    } else {
        if (value === '.' && currentInput.includes('.')) return; // 중복 소수점 방지
        if (currentInput.length >= 10) return; // 숫자 길이 제한
        currentInput = currentInput === '0' ? value : currentInput + value;
    }
}

// 연산자 처리 함수
function handleOperator(value) {
    switch (value) {
        case 'AC': // 초기화 버튼
            resetCalculator();
            break;
        case '=': // 결과 계산
            if (operator && previousInput) {
                const result = calculate(previousInput, currentInput, operator);
                addHistory(`${previousInput} ${operator} ${currentInput} = ${result}`); // 히스토리 항목 수정
                currentInput = result;
                operator = '';
                previousInput = '';
                resetDisplay = true;
            }
            break;
        default: // 연산자 입력 처리
            if (!operator) {
                operator = value;
                previousInput = currentInput; // 연산자 입력 시 이전 값을 previousInput에 저장
                resetDisplay = true; // 숫자 입력 초기화 상태
            } else if (!resetDisplay) {
                // 이전 연산 결과와 현재 입력값으로 계산 후, 연산자 변경
                previousInput = calculate(previousInput, currentInput, operator);
                operator = value;
                resetDisplay = true;
            }
            break;
    }
    updateDisplay();
}


// 계산 함수
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
            result = n2 !== 0 ? n1 / n2 : '그런건 없어요'; // 0으로 나누기 방지
            break;
        default:
            break;
    }

    return result.toString();
}

// 디스플레이 업데이트 함수
function updateDisplay() {
    if (operator && resetDisplay) {
        // 연산자 클릭 시 디스플레이에 연산 표시
        display.textContent = `${previousInput} ${operator}`;
    } else if (operator) {
        // 숫자 입력 중에 연산자와 현재 입력 표시
        display.textContent = `${previousInput} ${operator} ${currentInput}`;
    } else {
        // 기본 숫자 표시
        display.textContent = currentInput;
    }
}

// 히스토리 요소 가져오기
const historyList = document.querySelector('.history-list');

// 히스토리 기록 배열
let history = [];

// 히스토리 추가 함수
function addHistory(entry) {
    history.push(entry);

    // 히스토리 UI 업데이트
    const li = document.createElement('li');
    li.textContent = entry;
    historyList.appendChild(li);
}

function clearHistory() {
    history = [];
    historyList.innerHTML = ''; // 히스토리 UI 초기화
}

function resetCalculator() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    updateDisplay();
}
