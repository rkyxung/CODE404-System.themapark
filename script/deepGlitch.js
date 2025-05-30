import { stopGlitch } from "./glitch.js"; // ✅ glitch 중지 함수 가져오기

let deepGlitchInterval = null; // 전역 또는 외부에서 저장

// ✅ [4] 글리치 효과 함수 (픽셀화 효과 포함, 깜빡임 제거 버전)
export function deepGlitch() {
  stopGlitch(); // ✅ deepGlitch 실행 전에 glitch 중단

  const canvas = document.getElementById("glitch-layer"); // HTML에서 id가 'glitch-layer'인 캔버스를 선택
  const ctx = canvas.getContext("2d"); // 메인 캔버스 컨텍스트

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // ✅ 더블 버퍼링용 임시 캔버스 생성
  const bufferCanvas = document.createElement("canvas");
  const bufferCtx = bufferCanvas.getContext("2d");
  bufferCanvas.width = canvas.width;
  bufferCanvas.height = canvas.height;

  // 글리치 대상 요소 모음
  function getTargets() {
    return [
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
    ].filter(Boolean);
  }

  // ✅ 픽셀화 (버퍼 캔버스에 적용)
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

  // ✅ 글리치 처리도 버퍼에서
  function glitchCanvas() {
    bufferCtx.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);

    const targets = getTargets();
    targets.forEach((img) => {
      const rect = img.getBoundingClientRect();
      bufferCtx.drawImage(img, rect.left, rect.top, rect.width, rect.height);
    });

    for (let i = 0; i < 80; i++) {
      const x = Math.random() * bufferCanvas.width;
      const y = Math.random() * bufferCanvas.height;
      const w = Math.random() * 80 + 30;
      const h = Math.random() * 6 + 10;

      bufferCtx.drawImage(
        bufferCanvas,
        x, y, w, h,
        x + (Math.random() * 20 - 10), y, w, h
      );
    }

    pixelate(bufferCtx, 200); // ✅ 버퍼 캔버스에 픽셀화 적용

    ctx.clearRect(0, 0, canvas.width, canvas.height); // 메인 캔버스를 지우고
    ctx.drawImage(bufferCanvas, 0, 0); // 최종 버퍼 결과만 복사 → 깜빡임 없음

     deepGlitchInterval = setInterval(glitchCanvas, 1000); // ✅ 새로 실행
  }

  setInterval(glitchCanvas, 1000); // 매 초마다 글리치 실행
}
