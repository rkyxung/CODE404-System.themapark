import { stopGlitch } from "./glitch.js"; // 기존 글리치 중지 함수 불러옴

let animationFrameId = null; // requestAnimationFrame ID 저장용

// ✅ deepGlitch: 픽셀 글리치 효과 실행
export function deepGlitch() {
  stopGlitch(); // 기존 글리치 중단

  const canvas = document.getElementById("glitch-layer"); // 글리치용 캔버스 선택
  if (!canvas) return;

  const ctx = canvas.getContext("2d"); // 메인 캔버스 컨텍스트 설정

  // 캔버스 크기 설정 (한 번만)
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // 버퍼 캔버스 생성 (복사 및 왜곡용)
  const bufferCanvas = document.createElement("canvas");
  const bufferCtx = bufferCanvas.getContext("2d");
  bufferCanvas.width = canvas.width;
  bufferCanvas.height = canvas.height;

  // ✅ 딱 한 번만 DOM에서 대상 요소들을 모아두고 재활용
  const targets = [
    ...document.querySelectorAll(".background.glitch"),
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
  ].filter(Boolean); // 존재하는 요소만 필터링

  // ✅ 픽셀화 함수 (희미하게 깍두기 효과)
  function pixelate(ctxTarget, pixelSize = 80) {
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width = pixelSize;
    tempCanvas.height = pixelSize;

    tempCtx.imageSmoothingEnabled = false;
    tempCtx.drawImage(ctxTarget.canvas, 0, 0, pixelSize, pixelSize);

    ctxTarget.imageSmoothingEnabled = false;
    ctxTarget.clearRect(0, 0, ctxTarget.canvas.width, ctxTarget.canvas.height);
    ctxTarget.drawImage(tempCanvas, 0, 0, ctxTarget.canvas.width, ctxTarget.canvas.height);
  }

  // ✅ 애니메이션 루프
  function draw() {
    bufferCtx.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);

    // 대상 이미지들을 버퍼에 그림
    for (const img of targets) {
      const rect = img.getBoundingClientRect();
      bufferCtx.drawImage(img, rect.left, rect.top, rect.width, rect.height);
    }

    // 글리치 효과 적용 (버퍼에서 자르고 흔들어서 다시 그림)
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const w = Math.random() * 60 + 20;
      const h = Math.random() * 6 + 8;

      ctx.drawImage(
        bufferCanvas,
        x, y, w, h,
        x + (Math.random() * 10 - 5), y + (Math.random() * 4 - 2),
        w, h
      );
    }

    // 1초에 한 번 정도 픽셀화 (랜덤하게 적용)
    if (Math.random() < 0.2) {
      pixelate(ctx, 60); // 픽셀 사이즈는 60
    }

    animationFrameId = requestAnimationFrame(draw); // 다음 프레임 예약
  }

  draw(); // 애니메이션 시작
}

// ✅ 글리치 종료 함수
export function stopDeepGlitch() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}
