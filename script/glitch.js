// Chat gpt의 도움을 받은 부분입니다. glitch.js는 전반적으로 gpt의 도움에 의해 작성되었습니다.
let glitchInterval = null;

// 글리치 효과 함수
export function glitch() {
  const canvas = document.getElementById("glitch-layer"); // HTML에서 id가 'glitch-layer'인 캔버스를 선택
  const ctx = canvas.getContext("2d"); // 캔버스에서 2D 그래픽을 그리기 위한 도구를 가져옴

  canvas.width = window.innerWidth; // 캔버스의 너비를 브라우저 창 너비와 같게 설정
  canvas.height = window.innerHeight; // 캔버스의 높이를 브라우저 창 높이와 같게 설정

  function getTargets() {
    return [
      ...document.querySelectorAll(".background.glitch"), //...은 querySelectorAll() 결과를 배열로 풀어 넣음
      document.querySelector(".Coaster.glitch"),
      document.querySelector(".Floor.glitch"),
      document.querySelector(".Gyrodrop.glitch"),
      document.querySelector(".FerrisWheel.glitch"),
      document.querySelector(".MerryGoRound.glitch"),
      document.querySelector(".Office.glitch"),
      document.getElementById("office_flowChart"),
      document.getElementById("office_password"),
      document.getElementById("open_black"),
      document.getElementById("open_door"),
      document.getElementById("clock"),
      document.getElementById("locker"),
      document.getElementById("board"),
      document.getElementById("computer"),
      document.getElementById("memo_afternoon"),
      document.getElementById("memo_kim"),
      document.getElementById("memo_manager"),
      document.getElementById("guideline"),
      document.getElementById("electric"),
      document.getElementById("btn01"),
      document.getElementById("btn02"),
      document.getElementById("btn03"),
      document.getElementById("btn04"),
      document.getElementById("computer_background"),
      document.getElementById("keyboard"),
      document.getElementById("mouse"),
      document.getElementById("computer_front"),
      document.getElementById("locker_background"),
      document.getElementById("locker_top"),
      document.getElementById("locker_memo")

    ].filter(Boolean); // 글리치 효과를 적용할 이미지 요소들 선택
  }

  // 글리치 프레임을 그리는 함수 정의
  function glitchCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 전체를 지움

    const targets = getTargets(); // 매 프레임마다 새로 조회

    targets.forEach((img) => {
      const rect = img.getBoundingClientRect(); // 이미지의 현재 화면상 위치와 크기를 가져옴
      ctx.drawImage(img, rect.left, rect.top, rect.width, rect.height); // 이미지 위치 및 크기를 기준으로 캔버스에 그림
    });

    for (let i = 0; i < 80; i++) {
      const x = Math.random() * canvas.width; // 잘라낼 x 위치 무작위 설정
      const y = Math.random() * canvas.height; // 잘라낼 y 위치 무작위 설정
      const w = Math.random() * 80 + 30; // 잘라낼 너비 무작위 설정 (30~110px)
      const h = Math.random() * 6 + 15; // 잘라낼 높이 무작위 설정 (10~16px)
      ctx.drawImage(canvas, x, y, w, h, x + (Math.random() * 20 - 10), y, w, h); // 잘라낸 이미지 조각을 좌우로 살짝 흔들어 다시 그림
    }
  }

  setInterval(glitchCanvas, 500); // 0.5초(500ms)마다 glitchCanvas를 실행하여 효과 반복
}

export function stopGlitch() {
  if (glitchInterval) {
    clearInterval(glitchInterval); // 기존 glitch() 멈춤
    glitchInterval = null;
  }
}