//사용자가 회원가입할 때마다 새로운 아이디를 저장하는 용도로 사용됨
//초기값은 아이디 중복학인용으로 일단 배치
const registeredUsers = [
    { id: "user1", password: "test1", email: "user1@example.com" },
    { id: "admin", password: "test2", email: "admin@example.com" },
    { id: "testuser", password: "test3", email: "testuser@example.com" }
];

// DOM 요소 가져오기
const userIdInput = document.getElementById('user-id'); // 아이디 입력 필드
const checkIdBtn = document.getElementById('check-id-btn'); // 아이디 중복 확인 버튼
const userPasswordInput = document.getElementById('user-password'); // 비밀번호 입력 필드
const confirmPasswordInput = document.getElementById('confirm-password'); // 비밀번호 확인 필드
const userEmailInput = document.getElementById('user-email'); // 이메일 입력 필드
const signupBtn = document.getElementById('signup-btn'); // 회원가입 버튼

//아이디 중복 확인 여부를 저장하는 변수 기본false
// 사용자가 중복 확인을 하지 않으면 회원가입이 불가능함
let isIdChecked = false;

/*아이디 중복 확인 기능*/
checkIdBtn.addEventListener('click', () => {
    //사용자가 입력한 아이디 값 가져오기
    const userId = userIdInput.value.trim(); // 앞뒤 공백 제거

    //아이디가 입력되지 않았을 경우 경고 메시지 표시
    if (!userId) {
        alert("아이디를 입력해주세요."); // 경고창 출력
        return;
    }

    //registeredUsers배열 확인하여 입력한 아이디가 존재하는지 검사
    if (registeredUsers.some(user => user.id === userId)) {
        alert("이미 사용중인 아이디입니다.");
        isIdChecked = false; // 중복된 경우, 중복 확인 상태를 false로 유지
    } else {
        alert("사용 가능한 아이디입니다.");
        isIdChecked = true;  // 중복 확인 완료 상태로 변경
    }
});

/*아이디 입력값 변경 시 중복 확인 상태 초기화 사용자가 아이디를 변경하면 중복 확인을 다시 해야 함*/
userIdInput.addEventListener('input', () => {
    isIdChecked = false; // 아이디가 변경되면 중복 확인 상태를 초기화
});

/*입력된 비밀번호가 보안 기준(최소 8자, 대문자, 소문자, 숫자, 특수문자 포함)을 충족하는지 검사 정규식은 퍼옴*/
function validatePassword(password) {
    if (password.length < 8) {
        return "비밀번호는 최소 8자 이상이어야 합니다.";
    }
    if (!/[A-Z]/.test(password)) {
        return "비밀번호에 최소 한 개의 대문자가 포함되어야 합니다.";
    }
    if (!/[a-z]/.test(password)) {
        return "비밀번호에 최소 한 개의 소문자가 포함되어야 합니다.";
    }
    if (!/[0-9]/.test(password)) {
        return "비밀번호에 최소 한 개의 숫자가 포함되어야 합니다.";
    }
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
        return "비밀번호에 최소 한 개의 특수문자가 포함되어야 합니다.";
    }
    return "";  // 모든 보안 조건을 충족하면 빈 문자열 반환
}

/*회원가입 처리 기능 입력값을 검증하고 조건을 충족하면 회원 정보를 배열에 저장 검증이 실패시 오류 메시지를 표시하고 회원가입을 중단함
 */
signupBtn.addEventListener('click', () => {
    //사용자가 입력한 정보 가져오기
    const userId = userIdInput.value.trim();
    const password = userPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const email = userEmailInput.value.trim();

    let isValid = true; // 유효성 체크 플래그
    let errorMessage = ""; // 오류 메시지 저장 변수

    //아이디 검증 (중복 확인 여부 체크)
    if (!userId) {
        errorMessage = "아이디를 입력해주세요.";
        isValid = false;
    } else if (!isIdChecked) {
        errorMessage = "아이디 중복 확인을 먼저 해주세요.";
        isValid = false;
    } else if (registeredUsers.some(user => user.id === userId)) {
        errorMessage = "이미 사용중인 아이디입니다.";
        isValid = false;
    }

    //비밀번호 검증
    const pwdError = validatePassword(password);
    if (!password) {
        errorMessage = "비밀번호를 입력해주세요.";
        isValid = false;
    } else if (pwdError) {
        errorMessage = pwdError;
        isValid = false;
    }

    //비밀번호 확인 필드 검증
    if (!confirmPassword) {
        errorMessage = "비밀번호 확인을 입력해주세요.";
        isValid = false;
    } else if (password !== confirmPassword) {
        errorMessage = "비밀번호와 확인이 일치하지 않습니다.";
        isValid = false;
    }

    //이메일 필드 검증
    if (!email) {
        errorMessage = "이메일을 입력해주세요.";
        isValid = false;
    }

    //오류가 있을 경우 알림창을 띄우고 회원가입 진행 중단
    if (!isValid) {
        alert(errorMessage);
        return;
    }

    //모든 조건을 충족하면 회원가입 성공
    const newUser = {
        id: userId,
        password: password,
        email: email
    };

    // 새 사용자 정보를 배열에 추가
    registeredUsers.push(newUser);

    //콘솔에 저장된 사용자 목록 출력
    console.log("회원가입 정보:", newUser);
    console.log("전체 회원 목록:", registeredUsers);

    alert("회원가입이 완료되었습니다.");
});
