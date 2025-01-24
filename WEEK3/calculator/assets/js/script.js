const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');
const deleteButton = document.querySelector('.delete-button');
deleteButton.addEventListener('click', () => {
    clearHistory();
});

let currentInput = '0'; // 현재 입력값
let previousInput = ''; // 이전 입력값 (연산자 입력 전)
let operator = ''; // 연산자 (+, -, *, /)
let resetDisplay = false; // 연산 후 숫자 입력 초기화 여부

// 버튼 클릭 이벤트 핸들러
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const value = button.textContent.trim(); // 버튼의 텍스트 값 (숫자 또는 연산자)

        if (!isNaN(value) || value === '.') {
            handleNumber(value); // 숫자 또는 소수점 처리
        } else {
            handleOperator(value); // 연산자 처리
        }

        updateDisplay(); // 버튼 클릭 후 디스플레이 업데이트
    });
});

// 숫자 처리 함수
function handleNumber(value) {
    if (resetDisplay) {
        // 연산 후 새 숫자 입력 시 초기화 (디스플레이 초기화)
        currentInput = value === '.' ? '0.' : value;
        resetDisplay = false;
    } else {
        if (value === '.' && currentInput.includes('.')) return; // 소수점 중복 입력 방지
        if (currentInput.length >= 10) return; // 숫자 길이 제한 (10자 이상 입력 방지)
        currentInput = currentInput === '0' ? value : currentInput + value; // '0'일 경우 처음 숫자 입력
    }
}

// 연산자 처리 함수
function handleOperator(value) {
    switch (value) {
        case 'AC': // AC 버튼 클릭 시 계산기 초기화
            resetCalculator();
            break;
        case '=': // '=' 버튼 클릭 시 결과 계산
            if (operator && previousInput) {
                const result = calculate(previousInput, currentInput, operator); // 계산 수행
                addHistory(`${previousInput} ${operator} ${currentInput} = ${result}`); // 히스토리 추가
                currentInput = result; // 결과를 현재 입력값으로 설정
                operator = ''; // 연산자 초기화
                previousInput = ''; // 이전 값 초기화
                resetDisplay = true; // 결과 후 디스플레이 초기화 상태 설정
            }
            break;
        default: // 연산자 입력 처리
            if (!operator) {
                operator = value; // 첫 연산자 입력 시 저장
                previousInput = currentInput; // 현재 입력값을 previousInput에 저장
                resetDisplay = true; // 숫자 입력 초기화 상태
            } else if (!resetDisplay) {
                previousInput = calculate(previousInput, currentInput, operator); // 이전 계산 결과와 현재 입력값으로 계산
                operator = value; // 연산자 변경
                resetDisplay = true; // 숫자 입력 초기화 상태
            }
            break;
    }
    updateDisplay(); // 연산자 처리 후 디스플레이 업데이트
}

// 계산 함수
function calculate(num1, num2, op) {
    const n1 = parseFloat(num1); // 첫 번째 숫자
    const n2 = parseFloat(num2); // 두 번째 숫자
    let result = 0; // 계산 결과

    switch (op) {
        case '+':
            result = n1 + n2; // 덧셈
            break;
        case '-':
            result = n1 - n2; // 뺄셈
            break;
        case '*':
            result = n1 * n2; // 곱셈
            break;
        case '/':
            result = n2 !== 0 ? n1 / n2 : '그런건 없어요'; // 0으로 나누기 방지
            break;
        default:
            break;
    }

    return result.toString(); // 결과를 문자열로 반환
}

// 디스플레이 업데이트 함수
function updateDisplay() {
    if (operator && resetDisplay) {
        // 연산자 클릭 후 디스플레이에 연산 표시
        display.textContent = `${previousInput} ${operator}`;
    } else if (operator) {
        // 연산자와 현재 입력값이 있는 경우 디스플레이에 표시
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
    history.push(entry); // 히스토리 배열에 새로운 항목 추가

    // 히스토리 UI 업데이트
    const li = document.createElement('li');
    li.textContent = entry; // 히스토리 항목 내용 설정
    historyList.appendChild(li); // 히스토리 목록에 항목 추가
}

// 히스토리 초기화 함수
function clearHistory() {
    history = []; // 히스토리 배열 초기화
    historyList.innerHTML = ''; // 히스토리 UI 초기화
}

// 계산기 초기화 함수
function resetCalculator() {
    currentInput = '0'; // 현재 입력값 초기화
    previousInput = ''; // 이전 입력값 초기화
    operator = ''; // 연산자 초기화
    updateDisplay(); // 디스플레이 업데이트
}
