import { gameOver } from "./gameOver.js";

let Timer = 0; // 전체 남은 시간
let countdown = null;
let timerBox = null;
const systemMessage = document.querySelector(".SystemMessage");

// 화면에 시간 표시를 업데이트하는 함수 (외부에서도 쓰임) 
// Chat gpt의 도움을 받은 부분입니다.
function updateTimerDisplay() {
  const minutes = String(Math.floor(Timer / 60)).padStart(2, "0");
  const seconds = String(Timer % 60).padStart(2, "0");
  if (timerBox) {
    timerBox.textContent = `${minutes}:${seconds}`;
  }
}

// 타이머 시작
export function timer(time) {
  timerBox = document.getElementById("timer"); // 타이머 표시 박스 선택
  timerBox.classList.remove("hidden"); // 타이머 박스 표시

  Timer = time; // 전달받은 시간으로 초기화
  updateTimerDisplay(); // 첫 화면 표시

  countdown = setInterval(() => {
    Timer--; // 남은 시간 감소
    updateTimerDisplay(); // 시간 표시 갱신

    if (Timer <= 0) {
      clearInterval(countdown); // 타이머 종료
      systemMessage.innerText = "UID-037의 복구 요청 시간이 초과되었습니다."
      systemMessage.classList.remove("hidden");
      systemMessage.classList.add("shake");
      timerBox.classList.add("hidden");
      setTimeout(() => {
        systemMessage.classList.remove("shake");
        gameOver();
      }, 3000); // 2초 후 메시지 숨김
      
    }
  }, 1000); // 1초마다 실행
}

// 오답 시 시간 감소
export function wrongTime(seconds) {
  Timer -= seconds;
  if (Timer < 0) {
    Timer = 0;
  }
  updateTimerDisplay(); // 시간 감소 후 바로 UI 갱신
}

// 타이머 중단단
export function stopTimer() {
  if (countdown) {
    clearInterval(countdown); // setInterval 중단
    countdown = null; // 변수 초기화 (불필요한 재실행 방지)
  }
}