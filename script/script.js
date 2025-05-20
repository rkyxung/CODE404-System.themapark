
// ✅ [1] 주요 화면 요소 선택
const StartBtn = document.querySelector(".start-button"); // HTML에서 class가 'start-button'인 요소를 선택 → 이 버튼을 클릭하면 게임이 시작됨
const StartScene = document.querySelector(".StartScene"); // 시작 화면 전체 요소를 선택 (시작 장면 배경 등)
const Themapark = document.querySelector(".Themapark"); // 정상 상태의 테마파크 배경을 선택
const SystemFrame = document.querySelector(".SystemFrame"); // 시스템 메시지가 출력될 프레임(박스)을 선택
const error = document.querySelector(".Error_themapark"); // 오류 상태의 테마파크 배경을 선택
const SystemTxt = document.querySelector(".SystemIntro"); // 시스템 메시지를 출력할 텍스트 박스 요소를 선택

// ✅ [2] 시스템 메시지 배열 (2초 간격으로 출력될 메시지들)
const messages = [
  "> 시스템 초기화 중...",
  "> 사용자 접속 감지",
  "> 복구 요청: 거부됨",
  "> 외부 연결 차단",
  "> 경로 없음. 오류 지속됨.",
  "> 이탈 요청 무시됨.",
];

let ErrorValue = false; // 오류 상태 여부를 저장하는 변수 → 오류가 발생하면 true로 바뀜
let i = 0; // 메시지 인덱스를 0부터 시작 (몇 번째 메시지를 출력할지 추적) //클릭이벤트 밖으로 빼야 됨

// ✅ [3] 게임 시작 버튼 클릭 시 처리
StartBtn.addEventListener("click", () => {
  StartScene.style.display = "none"; // 시작 화면을 안 보이게 숨김
  SystemFrame.classList.remove("hidden"); // 시스템 프레임을 화면에 표시 (기존에 숨겨져 있었던 요소를 다시 보이게 함)

  const interval = setInterval(() => {
    // setInterval(): 일정한 시간 간격으로 특정 코드를 반복 실행하는 내장 함수

    if (i < messages.length) {
      const newLine = document.createElement("div"); // 새로운 줄(div 요소)을 생성
      newLine.textContent = messages[i]; // 그 줄에 현재 메시지를 텍스트로 삽입
      SystemTxt.appendChild(newLine); // 시스템 텍스트 박스에 이 줄을 추가하여 출력
      i++; // 다음 메시지로 넘어가기 위해 인덱스 증가
    } else {
      clearInterval(interval); // setInterval로 반복되던 작업을 멈춤 (더 이상 메시지가 없을 때 종료)

      // ✅ 모든 메시지가 출력된 후 3초 뒤에 상태 전환
      setTimeout(() => {
        Themapark.classList.add("hidden"); // 정상 테마파크 배경 숨김
        SystemTxt.classList.add("hidden"); // 시스템 텍스트 박스 숨김
        error.classList.remove("hidden"); // 오류 테마파크 배경 보이기

        ErrorValue = true; // 오류 상태로 전환됨 (다른 로직에서 참고하기 위함)

        errorHover(() => ErrorValue); // ✅ 이 줄 추가! (호버 메시지 등록)
        glitch(); // 글리치 효과 실행 (배경 이미지들이 깜빡이거나 흔들리는 연출)
        timer(600); // 타이머 시작 (600초 = 10분)
      }, 3000); // 3000ms = 3초 후 실행됨
    }
  }, 2000); // 2000ms = 2초 간격으로 메시지 출력 반복
});

// ✅ [4] 글리치 효과 함수
function glitch() {
  const canvas = document.getElementById("glitch-layer"); // HTML에서 id가 'glitch-layer'인 캔버스를 선택
  const ctx = canvas.getContext("2d"); // 캔버스에서 2D 그래픽을 그리기 위한 도구를 가져옴

  canvas.width = window.innerWidth; // 캔버스의 너비를 브라우저 창 너비와 같게 설정
  canvas.height = window.innerHeight; // 캔버스의 높이를 브라우저 창 높이와 같게 설정

  const targets = [
    document.querySelector(".Coaster.glitch"),
    document.querySelector(".Gyrodrop.glitch"),
    document.querySelector(".FerrisWheel.glitch"),
    document.querySelector(".MerryGoRound.glitch"),
    document.querySelector(".Office.glitch"),
  ]; // 글리치 효과를 적용할 이미지 요소들 선택

  // ✅ 글리치 프레임을 그리는 함수 정의
  function glitchCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 전체를 지움

    targets.forEach((img) => {
      const rect = img.getBoundingClientRect(); // 이미지의 현재 화면상 위치와 크기를 가져옴
      ctx.drawImage(img, rect.left, rect.top, rect.width, rect.height); // 이미지 위치 및 크기를 기준으로 캔버스에 그림
    });

    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width; // 잘라낼 x 위치 무작위 설정
      const y = Math.random() * canvas.height; // 잘라낼 y 위치 무작위 설정
      const w = Math.random() * 80 + 15; // 잘라낼 너비 무작위 설정 (15~95px)
      const h = Math.random() * 6 + 5; // 잘라낼 높이 무작위 설정 (5~11px)
      ctx.drawImage(canvas, x, y, w, h, x + (Math.random() * 20 - 10), y, w, h); // 잘라낸 이미지 조각을 좌우로 살짝 흔들어 다시 그림
    }
  }

  setInterval(glitchCanvas, 500); // 0.5초(500ms)마다 glitchCanvas를 실행하여 효과 반복
}

// ✅ [5] 타이머 시작 함수
function timer(durationInSeconds) {
  const timerBox = document.getElementById("timer"); // 타이머 표시 박스 선택
  timerBox.classList.remove("hidden"); // 타이머 박스 표시

  let remaining = durationInSeconds; // 남은 시간 설정

  function updateTimerDisplay() {
    const minutes = String(Math.floor(remaining / 60)).padStart(2, "0"); // 분 계산 및 2자리 문자열로 포맷
    const seconds = String(remaining % 60).padStart(2, "0"); // 초 계산 및 2자리 문자열로 포맷
    timerBox.textContent = `${minutes}:${seconds}`; // 화면에 시간 표시
  }

  updateTimerDisplay(); // 첫 화면 표시

  const countdown = setInterval(() => {
    remaining--; // 남은 시간 감소
    updateTimerDisplay(); // 시간 표시 갱신

    if (remaining <= 0) {
      clearInterval(countdown); // 타이머 종료
      timerBox.textContent = "GAME OVER"; // 종료 메시지 표시
    }
  }, 1000); // 1초마다 실행
}

// ✅ [6] 오류 상태에서 마우스 호버 시 메시지 출력 함수
function errorHover(getIsErrorState) {
  const hoverBox = document.getElementById("hover-message"); // 호버 메시지를 출력할 박스 선택

  const rideElements = {
    ".Coaster.glitch": "롤러코스터입니다.",
    ".MerryGoRound.glitch": "회전목마입니다.",
    ".Gyrodrop.glitch": "자이로드롭입니다.",
    ".FerrisWheel.glitch": "대관람차입니다.",
    ".Office.glitch": "관리실입니다.",
  };

  for (const [selector, message] of Object.entries(rideElements)) {
    const element = document.querySelector(selector); // 해당 셀렉터 요소 찾기
    if (!element) continue; // 요소가 존재하지 않으면 스킵

    element.addEventListener("mouseenter", () => {
      console.log("✅ 마우스 진입 감지됨!");
      if (!getIsErrorState()) return; // 오류 상태일 때만 실행
      hoverBox.innerText = message; // 박스에 텍스트 삽입
      hoverBox.classList.remove("hidden"); // 박스 보이기
    });

    element.addEventListener("mouseleave", () => {
      if (!getIsErrorState()) return;
      hoverBox.innerText = ""; // 메시지 초기화
      hoverBox.classList.add("hidden"); // 박스 숨기기
    });
  }
}
