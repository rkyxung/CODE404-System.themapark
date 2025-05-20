let Timer = 0; // ✅ 전체 남은 시간
let countdown = null;
let timerBox = null;

// ✅ 화면에 시간 표시를 업데이트하는 함수 (외부에서도 쓰임)
function updateTimerDisplay() {
  const minutes = String(Math.floor(Timer / 60)).padStart(2, "0");
  const seconds = String(Timer % 60).padStart(2, "0");
  if (timerBox) {
    timerBox.textContent = `${minutes}:${seconds}`;
  }
}

// ✅ [5] 타이머 시작 함수
export function timer(time) {
  timerBox = document.getElementById("timer"); // 타이머 표시 박스 선택
  timerBox.classList.remove("hidden"); // 타이머 박스 표시

  Timer = time; // ✅ 전달받은 시간으로 초기화
  updateTimerDisplay(); // 첫 화면 표시

  countdown = setInterval(() => {
    Timer--; // 남은 시간 감소
    updateTimerDisplay(); // 시간 표시 갱신

    if (Timer <= 0) {
      clearInterval(countdown); // 타이머 종료
      timerBox.textContent = "GAME OVER"; // 종료 메시지 표시
    }
  }, 1000); // 1초마다 실행
}

// ✅ 외부에서 시간 감산하는 함수 (예: 오답 시 -10초)
export function wrongTime(seconds) {
  Timer -= seconds;
  if (Timer < 0) {
    Timer = 0;
  }
  updateTimerDisplay(); // ✅ 시간 감소 후 바로 UI 갱신
}
