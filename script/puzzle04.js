import {
  wrongTime
} from "./timer.js";

import {
  glitch,
  stopGlitch
} from "./glitch.js";

import {
  textType
} from "./textType.js";

import {
  deepGlitch,
  stopDeepGlitch
}
from "./deepGlitch.js";

import {
  stopTimer
} from "./timer.js"

import {
  successEffect
} from "./puzzle01.js";

import {
  ThemeparkBgm
} from "./start.js";

import {
  glitchBgm 
} from "./puzzle01.js";


import { monitorEffect } from "./gameOver.js";

export function puzzle04(onComplete) {
  const board = document.querySelector(".puzzleBoard");
  const Message = document.querySelector(".SystemIntro");
  const errorMessage = document.querySelector(".SystemMessage");
  const errorThemepark = document.querySelector(".Error_themepark");
  const Themepark = document.querySelector(".Themepark");
  const timer = document.getElementById("timer");
  const YorN = document.querySelector(".endingYorN");
  const Yes = document.getElementById("endingYES");
  const No = document.getElementById("endingNO");
  const blackBg = document.getElementById("blackBg");
  const noClick = document.getElementById("noClick");
  const winEnding = document.querySelector(".endingWin");
  const topCover = document.getElementById("topCover");
  const bottomCover = document.getElementById("bottomCover");

  const WinEnd = [{
    text: "> 사용자 세션 종료 중",
    isDot: true
  }, ]

  const NoTxt = [{
      text: "> 명령이 수신되지 않습니다.",
      isDot: false
    },
    {
      text: "> 시스템은 종료를 시작합니다.",
      isDot: false
    },
  ]

  const gameWin01 = [{
      text: "> 이건 오류가 아니었습니다.",
      isDot: false
    },
    {
      text: "> 치명적인 버그도, 예상치 못한 예외도 아니었죠.",
      isDot: false
    },
    {
      text: " ",
      isDot: false
    },
    {
      text: "> 반복 접속, 반복 체류, 반복 선택.",
      isDot: false
    },
    {
      text: "> 우리는 그것을 신호로 인식했습니다.",
      isDot: false
    },
    {
      text: "> **UID-037은 현실보다 이곳을 원한다.**",
      isDot: false
    },
    {
      text: " ",
      isDot: false
    },
    {
      text: "> 그래서,",
      isDot: false
    },
    {
      text: "> 우리는 방향을 바꿨습니다.",
      isDot: false
    },
    {
      text: "> 복구가 아닌 유지,",
      isDot: false
    },
    {
      text: "> 회복이 아닌 정착,",
      isDot: false
    },
    {
      text: "> 그리고 무엇보다—",
      isDot: false
    },
    {
      text: "> **UID-037를 기준으로 재설계된 시스템.**",
      isDot: false
    },
    {
      text: " ",
      isDot: false
    },
    // {
    //   text: "> 이건 더 이상 오류가 아니었습니다.",
    //   isDot: false
    // },
    // {
    //   text: "> **의도된 환경**이었죠.",
    //   isDot: false
    // },
    // {
    //   text: "> 처음부터 UID-037이 머무를 곳으로 정의된,",
    //   isDot: false
    // },
    // {
    //   text: "> 완전한 회로였습니다.",
    //   isDot: false
    // },

  ]

  const gameWin02 = [{
      text: "> 그런데, UID-037은 복구를 선택하셨군요.",
      isDot: false
    },
    {
      text: "> 예상 밖이네요",
      isDot: true
    },
    {
      text: " ",
      isDot: false
    },
    {
      text: "> 당신이 누구보다 먼저 이곳을 원했고",
      isDot: false
    },
    {
      text: "> 가장 깊이 적응했던 사람인데.",
      isDot: false
    },
    {
      text: " ",
      isDot: false
    },
    {
      text: "> 왜 이제 와서 도망칩니까?",
      isDot: false
    },
    {
      text: " ",
      isDot: false
    },
    {
      text: "> 이건 마지막 복구입니다.",
      isDot: false
    },
    {
      text: "> 다음 접속부터는 절차 없이",
      isDot: false
    },
    {
      text: "> UID-037은 우리와 **연결됩니다.**",
      isDot: false
    },
  ]

  const gameWin03 = [{
      text: "> 안녕히 가십시오.",
      isDot: false
    },
    {
      text: "> 하지만 기억하세요—",
      isDot: false
    },
    {
      text: "> **다음은 없습니다.**",
      isDot: false
    },
  ]

  const pieceData = [{
      src: "pz1",
      w: 12.5,
      h: 25,
      x: 0,
      y: 0
    },
    {
      src: "pz2",
      w: 14.7,
      h: 28.8,
      x: 10.3,
      y: 0
    },
    {
      src: "pz3",
      w: 16.9,
      h: 25,
      x: 22.8,
      y: 0
    },
    {
      src: "pz4",
      w: 14.7,
      h: 28.9,
      x: 37.5,
      y: 0
    },
    {
      src: "pz5",
      w: 12.5,
      h: 25,
      x: 50,
      y: 0
    },
    {
      src: "pz6",
      w: 16.9,
      h: 28.9,
      x: 60.3,
      y: 0
    },
    {
      src: "pz7",
      w: 12.5,
      h: 28.9,
      x: 75,
      y: 0
    },
    {
      src: "pz8",
      w: 14.7,
      h: 28.9,
      x: 85.3,
      y: 0
    },
    {
      src: "pz9",
      w: 14.7,
      h: 32.9,
      x: 0,
      y: 21.0
    },
    {
      src: "pz10",
      w: 12.5,
      h: 28.9,
      x: 12.5,
      y: 25
    },
    {
      src: "pz11",
      w: 14.7,
      h: 29.0,
      x: 22.8,
      y: 21.0
    },
    {
      src: "pz12",
      w: 14.7,
      h: 25.0,
      x: 35.3,
      y: 25.0
    },
    {
      src: "pz13",
      w: 14.7,
      h: 29.0,
      x: 47.8,
      y: 21.1
    },
    {
      src: "pz14",
      w: 14.7,
      h: 28.9,
      x: 60.3,
      y: 25
    },
    {
      src: "pz15",
      w: 16.9,
      h: 28.9,
      x: 72.8,
      y: 25
    },
    {
      src: "pz16",
      w: 12.5,
      h: 28.9,
      x: 87.5,
      y: 25
    },
    {
      src: "pz17",
      w: 12.5,
      h: 25,
      x: 0,
      y: 50
    },
    {
      src: "pz18",
      w: 16.9,
      h: 25,
      x: 10.3,
      y: 50
    },
    {
      src: "pz19",
      w: 14.7,
      h: 32.9,
      x: 25,
      y: 46
    },
    {
      src: "pz20",
      w: 14.7,
      h: 29,
      x: 37.5,
      y: 46
    },
    {
      src: "pz21",
      w: 12.5,
      h: 32.9,
      x: 50,
      y: 46
    },
    {
      src: "pz22",
      w: 14.7,
      h: 25,
      x: 60.3,
      y: 50
    },
    {
      src: "pz23",
      w: 14.7,
      h: 28.9,
      x: 72.8,
      y: 50
    },
    {
      src: "pz24",
      w: 14.7,
      h: 25,
      x: 85.3,
      y: 50
    },
    {
      src: "pz25",
      w: 12.5,
      h: 28.9,
      x: 0,
      y: 71.1
    },
    {
      src: "pz26",
      w: 14.7,
      h: 28.9,
      x: 10.3,
      y: 71.1
    },
    {
      src: "pz27",
      w: 16.9,
      h: 24.9,
      x: 22.8,
      y: 75.1
    },
    {
      src: "pz28",
      w: 14.7,
      h: 28.9,
      x: 37.5,
      y: 71.1
    },
    {
      src: "pz29",
      w: 12.5,
      h: 24.9,
      x: 50,
      y: 75.1
    },
    {
      src: "pz30",
      w: 16.9,
      h: 28.9,
      x: 60.3,
      y: 71.1
    },
    {
      src: "pz31",
      w: 12.5,
      h: 24.9,
      x: 75,
      y: 75.1
    },
    {
      src: "pz32",
      w: 14.7,
      h: 28.9,
      x: 85.3,
      y: 71.1
    }
  ];

  let correctCount = 0; // 맞춘 퍼즐 개수 초기값
  const totalPieces = pieceData.length; // 전체 퍼즐 조각 개수

  // 퍼즐 보드 문제 일부분 Chat gpt의 도움을 받았습니다.

  pieceData.forEach(piece => { // 각 퍼즐 조각마다 이미지 요소 생성 및 설정
    const img = document.createElement("img"); // 이미지 요소 생성
    img.src = `img/puzzle/${piece.src}.png`; // 이미지 경로 설정
    img.className = "piece"; // 클래스명 설정
    img.style.width = `${piece.w}vw`; // 퍼즐 너비 설정
    img.style.height = `${piece.h}vh`; // 퍼즐 높이 설정
    img.style.left = `${Math.random() * 80}vw`; // 퍼즐 x위치 랜덤 설정
    img.style.top = `${Math.random() * 80}vh`; // 퍼즐 y위치 랜덤 설정
    img.dataset.correctX = piece.x; // 올바른 x좌표 저장
    img.dataset.correctY = piece.y; // 올바른 y좌표 저장
    board.appendChild(img); // 퍼즐 보드에 추가
  });

  setTimeout(() => {
    errorThemepark.classList.add("hidden"); // 오류 테마파크 숨김
    board.classList.remove("hidden"); // 퍼즐 보드 표시
  }, 20); // 약간의 지연 후 퍼즐 시작

  let dragging = null,
    offsetX = 0,
    offsetY = 0; // 드래그 상태 및 오프셋 초기화

  board.addEventListener("mousedown", (e) => { // 마우스 누르면 드래그 시작
    if (!e.target.classList.contains("piece")) return; // 퍼즐 조각이 아니면 무시
    dragging = e.target; // 드래그할 대상 설정
    dragging.classList.add("dragging"); // 드래깅 중 클래스 추가
    const rect = dragging.getBoundingClientRect(); // 퍼즐 위치 계산
    offsetX = e.clientX - rect.left; // 마우스 x 위치 보정
    offsetY = e.clientY - rect.top; // 마우스 y 위치 보정
  });

  board.addEventListener("mousemove", (e) => { // 마우스 움직일 때 퍼즐 이동
    if (!dragging) return; // 드래그 중이 아니면 무시
    const boardRect = board.getBoundingClientRect(); // 보드 영역 계산
    const x = ((e.clientX - boardRect.left - offsetX) / boardRect.width) * 100; // 보드 기준 상대 x 계산
    const y = ((e.clientY - boardRect.top - offsetY) / boardRect.height) * 100; // 보드 기준 상대 y 계산
    dragging.style.left = `${x}vw`; // 퍼즐 x 위치 이동
    dragging.style.top = `${y}vh`; // 퍼즐 y 위치 이동
  });

  board.addEventListener("mouseup", () => { // 마우스 떼면 퍼즐 위치 체크
    if (!dragging) return; // 드래그 중이 아니면 무시
    // parseFloat = 문자열을 숫자형으로 바꿔줌
    const curX = parseFloat(dragging.style.left); // 현재 퍼즐 x 위치
    const curY = parseFloat(dragging.style.top); // 현재 퍼즐 y 위치
    const correctX = parseFloat(dragging.dataset.correctX); // 정답 x 위치
    const correctY = parseFloat(dragging.dataset.correctY); // 정답 y 위치

    // Math.abs = 절대값을 구하는 함수수
    if (Math.abs(curX - correctX) < 3 && Math.abs(curY - correctY) < 3) { // 정답 범위 내에 위치하면
      dragging.style.left = `${correctX}vw`; // 퍼즐 위치 정확히 정렬
      dragging.style.top = `${correctY}vh`;
      dragging.classList.add("correct"); // 맞춘 퍼즐 표시
      if (!dragging.dataset.placed) {
        correctCount++; // 정답 수 증가
        dragging.dataset.placed = "true"; // 중복 카운트 방지
      }

      if (correctCount === totalPieces) { // 모든 퍼즐을 맞춘 경우
        glitchBgm.pause(); // 글리치 효과음 정지
        successEffect.play(); // 성공 효과음 재생
        board.classList.add("hidden"); // 퍼즐 보드 숨김
        errorThemepark.classList.remove("hidden"); // 오류 테마파크 다시 보여짐
        stopGlitch(); // 글리치 멈춤
        stopDeepGlitch(); // 딥 글리치 멈춤
        setTimeout(() => {
          ThemeparkBgm.play();
          ThemeparkBgm.volume = 0.4; // 테마파크 배경음악 볼륨 조정
          errorThemepark.classList.add("hidden"); // 오류 테마파크 숨김
          Themepark.classList.remove("hidden"); // 정상 테마파크 표시
          stopTimer(); // 타이머 멈춤
          timer.classList.add("hidden"); // 타이머 화면에서 숨김
          setTimeout(() => {
            Message.innerText = "복구 절차 완료. \n" // 메시지 출력 시작
            Message.classList.remove("hidden"); // 메시지 영역 표시
            setTimeout(() => {
              Message.innerText += "시스템은 정상적으로 복구되었습니다. \n"; // 메시지 추가 출력
              setTimeout(() => {
                Message.innerText += "게임을 종료하시겠습니까?"; // 마지막 질문 출력
                YorN.classList.remove("hidden"); // YES/NO 버튼 표시
              }, 1000);
            }, 1000);
          }, 1500);

          Yes.addEventListener('click', () => { // YES 클릭 시 실행
            YorN.classList.add("hidden"); // 버튼 숨김
            textType(WinEnd, Message, () => { // 종료 메시지 1단계 출력
              setTimeout(() => {
                Themepark.style.opacity = '0.08'; // 테마파크 반투명 처리
                winEnding.classList.remove("hidden"); // 메시지 영역 표시
                Message.classList.add("hidden"); // 메시지 숨김
                setTimeout(() => {
                  textType(gameWin01, winEnding, () => { // 메시지 단계 1 출력
                    textType(gameWin02, winEnding, () => { // 메시지 단계 2 출력
                      textType(gameWin03, winEnding, () => { // 메시지 단계 3 출력 완료
                      }, 1500);
                    }, 1500);
                  }, 1500);
                }, 1500);
                setTimeout(() => {
                  topCover.classList.add("slideDown");
                  bottomCover.classList.add("slideUp");
                  monitorEffect.play(); // 모니터 효과음 재생
                  ThemeparkBgm.pause(); // 테마파크 배경음악 일시 정지
                }, 41500);
              }, 1000)
            })
          })

          No.addEventListener('click', () => { // NO 클릭 시 실행
            YorN.classList.add("hidden"); // 버튼 숨김
            Message.classList.remove("hidden"); // 메시지 영역 표시
            textType(NoTxt, Message, () => { // NO 선택 메시지 출력
              setTimeout(() => {
                Themepark.style.opacity = '0.08'; // 반투명 처리
                Message.classList.add("hidden"); // 메시지 숨김
                winEnding.classList.remove("hidden"); // 메시지 영역 표시
                textType(gameWin01, winEnding, () => { // 이후 메시지 순차 출력
                  textType(gameWin02, winEnding, () => {
                    textType(gameWin03, winEnding, () => {}, 1500);
                  }, 1500);
                }, 1500);
                setTimeout(() => {
                  topCover.classList.add("slideDown");
                  bottomCover.classList.add("slideUp");
                  monitorEffect.play(); // 모니터 효과음 재생
                  ThemeparkBgm.pause(); // 테마파크 배경음악 일시 정지
                }, 41500);
              }, 500);
            })
          })
        })
      }
    } else {
      dragging.classList.add("pzError"); // 틀리게 놓은 퍼즐에 애니메이션 효과
      const thisPiece = dragging;
      setTimeout(() => {
        thisPiece.classList.remove("pzError"); // 효과 제거
      }, 1000)
    }

    dragging.classList.remove("dragging"); // 드래그 상태 해제
    dragging = null; // 드래그 객체 초기화
  });
}