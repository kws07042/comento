//  현재 날짜 표시
const dateElement = document.getElementById('current-date');
const today = new Date();
dateElement.textContent = `${today.getFullYear()}년 ${String(today.getMonth() + 1).padStart(2, '0')}월 ${String(today.getDate()).padStart(2, '0')}일`;

// 투두리스트 관련 변수
const todoInput = document.getElementById('todo-input'); // 입력 필드
const addBtn = document.getElementById('add-btn'); // 추가 버튼
const todoList = document.getElementById('todo-list'); // 할 일 목록

// 투두 추가 함수
function addTodo(taskText) {
    if (!taskText.trim()) { //trim 공백
        alert("할 일을 입력하세요!"); // 알림창 표시
        return;
    }

    // 새로운 리스트 아이템 생성
    const li = document.createElement('li');
    li.className = 'todo-item';

    // 체크박스 생성 및 이벤트 추가 (완료 표시 기능)
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.addEventListener('change', () => {
        span.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
        span.style.color = checkbox.checked ? '#888' : '#000'; //참이면 회색 거짓이면 검정
    });

    // 할 일 텍스트 생성
    const span = document.createElement('span');
    span.textContent = taskText;

    // 삭제 버튼 생성 및 이벤트 추가
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '삭제';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
        todoList.removeChild(li);
    });

    // 요소 추가 및 리스트에 추가
    li.append(checkbox, span, deleteBtn);
    todoList.appendChild(li);

    // 입력 필드 초기화 및 포커스
    todoInput.value = '';
    todoInput.focus();
}

// 이벤트 리스너 추가
addBtn.addEventListener('click', () => addTodo(todoInput.value));