let batteryLevel = 100; // 초기 배터리 레벨 설정
let alarms = []; // 알람 리스트 초기화

// KST (한국 표준시) 시간을 구하는 함수
function getKSTTime() {
    const now = new Date(); // 현재 시간을 구함
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000); // UTC 시간
    const kstOffset = 9 * 60 * 60 * 1000; // 한국 시간은 UTC보다 9시간 빠름 (밀리초로 표현)
    const kstTime = new Date(utc + kstOffset); // 한국 시간 계산

    // 날짜 및 시간 포맷
    const year = kstTime.getFullYear();
    const month = String(kstTime.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(kstTime.getDate()).padStart(2, '0');
    const hours = String(kstTime.getHours()).padStart(2, '0');
    const minutes = String(kstTime.getMinutes()).padStart(2, '0');
    const seconds = String(kstTime.getSeconds()).padStart(2, '0');

    // 원하는 포맷으로 날짜와 시간 결합
    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedTime; // 포맷팅된 한국 시간 반환
}

// 시계 및 배터리 업데이트 함수
function updateClock() {
    const timeDisplay = document.getElementById("time-display"); // 시계 표시 요소
    const batteryDisplay = document.getElementById("battery-level"); // 배터리 표시 요소

    // KST 시간 업데이트
    const currentTime = getKSTTime(); // 현재 시간을 한국 표준시로 가져옴
    timeDisplay.textContent = currentTime; // 시계에 현재 시간 표시

    // 배터리 감소
    if (batteryLevel > 0) {
        batteryLevel -= 1; // 배터리 1% 감소
        batteryDisplay.textContent = `배터리: ${batteryLevel}%`; // 배터리 상태 업데이트
    } else {
        // 배터리가 0일 때
        timeDisplay.style.backgroundColor = "#000"; // 배터리가 0일 때 시계 배경을 검정색으로 변경
        timeDisplay.style.color = "#000"; // 시계 글자 색을 검정색으로 변경
    }

    // 알람 확인 (시간만 비교)
    checkAlarms(currentTime.split(" ")[1]); // HH:mm:ss 형식으로 시간을checkAlarms()에 전달하여 알람 체크
}

// 알람 확인 함수
function checkAlarms(currentTime) {
    alarms.forEach((alarm, index) => { //alarms 배열 순회
        //alarm은 현재 반복되고 있는 배열 index는 현재 항목의 인덱스를 나타냄
        if (currentTime === alarm) { // 현재 시간과 알람 시간이 일치하면
            alert(`링리리링리링리링~~~: ${alarm}이에요`); // 알람 울리기
            removeAlarm(index); // 알람이 울린 후 해당 알람을 삭제
        }
    });
}

// 알람 삭제 함수
function removeAlarm(index) {
    alarms.splice(index, 1); // 해당 인덱스의 알람을 배열에서 삭제
    updateAlarmList(); // 알람 목록을 갱신
}

// 알람 추가 함수
function addAlarm() {
    if (alarms.length >= 3) { // 알람은 최대 3개까지만 설정 가능
        alert("알람은 최대 3개까지입니다!");
        return;
    }
    //padStart()는 문자열의 길이가 지정된 길이에 도달할 때까지, 지정된 문자를 문자열의 앞에 추가하는 메서드 2쓰면 02시
    // 주로 숫자나 시간을 일정한 길이로 맞추기 위해 사용됩니다.
    const hours = document.getElementById("hours").value.padStart(2, "0");
    const minutes = document.getElementById("minutes").value.padStart(2, "0");
    const seconds = document.getElementById("seconds").value.padStart(2, "0");



    const alarmTime = `${hours}:${minutes}:${seconds}`; // 알람 시간 포맷팅

    // 이미 설정된 알람인지 확인
    // includes() 메서드는 배열에 특정 값이 존재하면 true를 반환하고, 존재하지 않으면 false를 반환합니다.
    if (alarms.includes(alarmTime)) {
        alert("이미 있는 알람입니다.");
        return;
    }

    alarms.push(alarmTime); // 새로운 알람 추가
    updateAlarmList(); // 알람 목록을 갱신
}

// 알람 목록을 업데이트하는 함수
//alarm-list 요소를 찾아서 내용 초기화
//alarms 배열을 순회하면서 각 알람에 대해 li 요소를 생성 그 알람을 텍스트로 설정합니다.
// 그 생성된 li 요소를 alarm-list 요소에 추가합니다.
function updateAlarmList() {
    const alarmList = document.getElementById("alarm-list"); // 알람 목록을 표시할 요소
    alarmList.innerHTML = ""; // 기존 알람 목록 초기화

    // 알람 목록을 갱신
    alarms.forEach((alarm, index) => {
        //alarm은 현재 반복되고 있는 배열의 각 항목 index는 현재 항목의 인덱스를 나타냄
        const listItem = document.createElement("li"); // 알람 항목(li 생성)
        listItem.textContent = alarm; // 알람 텍스트 추가
        alarmList.appendChild(listItem); // 목록에 항목 추가
        // appendchild 메서드는 alarmList자식요소로 listItem을 마지막에 추가하는 역할을 한다
        // 각 알람 항목이 alarm-list요소에 표시
    });
}

// 재시작 함수
function restart() {
    batteryLevel = 100; // 배터리 레벨을 초기화
    alarms = []; // 알람 목록 초기화
    updateAlarmList(); // 알람 목록을 갱신

    const timeDisplay = document.getElementById("time-display");
    timeDisplay.style.backgroundColor = "#f0f0f0"; // 시계 배경색 원래대로

    alert("시계와 배터리가 다시 작동됩니다.");
}

// 이벤트 리스너 등록
document.getElementById("add-alarm").addEventListener("click", addAlarm); //버튼 클릭 시 addAlarm 함수 실행
document.getElementById("restart").addEventListener("click", restart); //버튼 클릭 시 restart 함수 실행

//(1초마다 업데이트)
setInterval(updateClock, 1000); // 1초마다 updateClock 함수 실행
