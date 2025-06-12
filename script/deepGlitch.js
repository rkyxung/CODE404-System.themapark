import {
  stopGlitch
} from "./glitch.js"; // ✅ glitch 중단 함수 불러오기

let deepGlitchInterval = null; // ✅ 반복 실행을 제어할 변수
let tempCanvas = null; // ✅ 재사용할 임시 캔버스
let tempCtx = null; // ✅ 재사용할 임시 컨텍스트

export function deepGlitch() {
  stopGlitch(); // ✅ 기존 glitch 효과 중단

  const canvas = document.getElementById("glitch-layer"); // ✅ 글리치 레이어용 캔버스 선택
  const ctx = canvas.getContext("2d"); // ✅ 캔버스 컨텍스트 얻기

  canvas.width = window.innerWidth; // ✅ 캔버스 너비 설정
  canvas.height = window.innerHeight; // ✅ 캔버스 높이 설정

  // ✅ 버퍼 캔버스 생성 (더블 버퍼링용)
  const bufferCanvas = document.createElement("canvas"); // ✅ 메모리 상 버퍼용 캔버스 생성
  const bufferCtx = bufferCanvas.getContext("2d"); // ✅ 버퍼용 컨텍스트 얻기
  bufferCanvas.width = canvas.width; // ✅ 버퍼 너비 설정
  bufferCanvas.height = canvas.height; // ✅ 버퍼 높이 설정

  // ✅ tempCanvas 재사용 설정 (픽셀화 전용)
  if (!tempCanvas) {
    tempCanvas = document.createElement("canvas"); // ✅ 임시 캔버스 처음 한 번만 생성
    tempCanvas.width = 200; // ✅ 픽셀화 대상 크기
    tempCanvas.height = 200;
    tempCtx = tempCanvas.getContext("2d"); // ✅ 임시 컨텍스트 얻기
    tempCtx.imageSmoothingEnabled = false; // ✅ 이미지 보간 제거
  }

  // ✅ glitch 효과를 줄 DOM 요소 목록 가져오기
  const targets = [
    ...document.querySelectorAll(".background.glitch"),
    document.querySelector(".Coaster.glitch"),
    document.querySelector(".Floor.glitch"),
    document.querySelector(".Gyrodrop.glitch"),
    document.querySelector(".FerrisWheel.glitch"),
    document.querySelector(".MerryGoRound.glitch"),
    document.querySelector(".Office.glitch")
  ].filter(Boolean); // ✅ null 제외

  // ✅ 픽셀화 함수 (전역 tempCanvas 재사용)
  function pixelate(ctxTarget) {
    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height); // ✅ 이전 내용 제거
    tempCtx.drawImage(ctxTarget.canvas, 0, 0, tempCanvas.width, tempCanvas.height); // ✅ 축소

    ctxTarget.clearRect(0, 0, ctxTarget.canvas.width, ctxTarget.canvas.height); // ✅ 원본 지움
    ctxTarget.drawImage(tempCanvas, 0, 0, ctxTarget.canvas.width, ctxTarget.canvas.height); // ✅ 확대 복원
  }

  // ✅ 글리치 효과 처리 함수
  function glitchCanvas() {
    bufferCtx.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height); // ✅ 버퍼 초기화

    targets.forEach((img) => {
      const rect = img.getBoundingClientRect(); // ✅ 화면에서의 위치 계산
      bufferCtx.drawImage(img, rect.left, rect.top, rect.width, rect.height); // ✅ 이미지 복사
    });

    for (let i = 0; i < 60; i++) { // ✅ 반복 횟수 줄임 (성능 최적화)
      const x = Math.random() * bufferCanvas.width;
      const y = Math.random() * bufferCanvas.height;
      const w = Math.random() * 60 + 20;
      const h = Math.random() * 6 + 10;

      bufferCtx.drawImage(
        bufferCanvas, // ✅ 원본
        x, y, w, h, // ✅ 자르기 영역
        x + (Math.random() * 20 - 10), y, w, h // ✅ 찌그러진 위치로 복사
      );
    }

    pixelate(bufferCtx); // ✅ 픽셀화 적용

    ctx.clearRect(0, 0, canvas.width, canvas.height); // ✅ 메인 캔버스 초기화
    ctx.drawImage(bufferCanvas, 0, 0); // ✅ 최종 결과 복사
  }

  // ✅ 글리치 반복 실행 설정
  deepGlitchInterval = setInterval(glitchCanvas, 1000); // ✅ 1초마다 효과 실행
}

export function stopDeepGlitch() {
  if (deepGlitchInterval) {
    clearInterval(deepGlitchInterval); // 기존 glitch() 멈춤
    deepGlitchInterval = null;
  }
}