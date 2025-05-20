// 게임 시작 버튼 클릭 → 메시지 순차 출력 및 오류 상태 진입
export function startGame({
  onError,
  glitch,
  timer,
  errormessage
}) {

  const StartBtn = document.querySelector(".start-button");
  const StartScene = document.querySelector(".StartScene");
  const Themapark = document.querySelector(".Themapark");
  const SystemFrame = document.querySelector(".SystemFrame");
  const error = document.querySelector(".Error_themapark");
  const SystemTxt = document.querySelector(".SystemIntro");
  const StartHover = document.querySelector(".StartHover");
  const HoverText = document.querySelector(".SystemFrame_start span");
  const Bg = document.querySelector(".Bg");

  // 시스템 메시지 배열
  const introMessage = [{
      text: "> 접속 시도 중",
      isDot: true
    },
    {
      text: "> 사용자 ID: UID-037 접속 요청 확인",
      isDot: false
    },
    {
      text: "> 이전 접속 기록 감지됨",
      isDot: false
    },
    {
      text: "> 마지막 세션 상태 복원 중",
      isDot: true
    },
    {
      text: "> 접속 완료!",
      isDot: false
    }
  ]


  let ErrorValue = false;
  let i = 0; // 메시지 인덱스를 0부터 시작 (몇 번째 메시지를 출력할지 추적) //클릭이벤트 밖으로 빼야 됨

  StartBtn.addEventListener("mouseover", () => {
    Themapark.classList.add("hidden");
    StartHover.classList.remove("hidden");
    HoverText.classList.add("hover");
  })

  StartBtn.addEventListener("mouseleave", () => {
    Themapark.classList.remove("hidden");
    StartHover.classList.add("hidden");
    HoverText.classList.remove("hover");
  })

  // [3] 게임 시작 버튼 클릭 시 처리
  StartBtn.addEventListener("click", () => {
    StartScene.classList.add("hidden");
    SystemFrame.classList.remove("hidden");
    Themapark.classList.add("hidden");
    StartHover.classList.add("hidden");

  })
}