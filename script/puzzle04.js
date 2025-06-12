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


export function puzzle04(onComplete) {
  const board = document.querySelector(".puzzleBoard");
  const Message = document.querySelector(".SystemIntro");
  const errorMessage = document.querySelector(".SystemMessage");
  const errorThemepark = document.querySelector(".Error_themepark");
  const Themepark = document.querySelector(".Themepark");
  const timer = document.getElementById("timer");
  const YorN = document.querySelector(".YorN");
  const Yes = document.getElementById("YES");
  const No = document.getElementById("NO");
  const blackBg = document.getElementById("blackBg");

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
    {
      text: "> 이건 더 이상 오류가 아니었습니다.",
      isDot: false
    },
    {
      text: "> **의도된 환경**이었죠.",
      isDot: false
    },
    {
      text: "> 처음부터 UID-037이 머무를 곳으로 정의된,",
      isDot: false
    },
    {
      text: "> 완전한 회로였습니다.",
      isDot: false
    },

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

  let correctCount = 0;
  const totalPieces = pieceData.length;

  pieceData.forEach(piece => {
    const img = document.createElement("img");
    img.src = `img/puzzle/${piece.src}.png`;
    img.className = "piece";
    img.style.width = `${piece.w}vw`;
    img.style.height = `${piece.h}vh`;
    img.style.left = `${Math.random() * 80}vw`;
    img.style.top = `${Math.random() * 80}vh`;
    img.dataset.correctX = piece.x;
    img.dataset.correctY = piece.y;
    board.appendChild(img);
  });

  setTimeout(() => {
    errorThemepark.classList.add("hidden");
    board.classList.remove("hidden");
  }, 20)

  let dragging = null,
    offsetX = 0,
    offsetY = 0;

  board.addEventListener("mousedown", (e) => {
    if (!e.target.classList.contains("piece")) return;
    dragging = e.target;
    dragging.classList.add("dragging");
    const rect = dragging.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });

  board.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    const boardRect = board.getBoundingClientRect();
    const x = ((e.clientX - boardRect.left - offsetX) / boardRect.width) * 100;
    const y = ((e.clientY - boardRect.top - offsetY) / boardRect.height) * 100;
    dragging.style.left = `${x}vw`;
    dragging.style.top = `${y}vh`;
  });

  board.addEventListener("mouseup", () => {
    if (!dragging) return;
    const curX = parseFloat(dragging.style.left);
    const curY = parseFloat(dragging.style.top);
    const correctX = parseFloat(dragging.dataset.correctX);
    const correctY = parseFloat(dragging.dataset.correctY);

    if (Math.abs(curX - correctX) < 3 && Math.abs(curY - correctY) < 3) {
      dragging.style.left = `${correctX}vw`;
      dragging.style.top = `${correctY}vh`;
      dragging.classList.add("correct");
      if (!dragging.dataset.placed) {
        correctCount++;
        dragging.dataset.placed = "true";
      }

      if (correctCount === totalPieces) {
        board.classList.add("hidden");
        errorThemepark.classList.remove("hidden");
        stopGlitch();
        stopDeepGlitch();
        setTimeout(() => {
          errorThemepark.classList.add("hidden");
          Themepark.classList.remove("hidden");
          stopTimer();
          timer.classList.add("hidden");
          setTimeout(() => {
            Message.innerText = "복구 절차 완료. \n"
            Message.classList.remove("hidden");
            setTimeout(() => {
              Message.innerText += "시스템은 정상적으로 복구되었습니다. \n";
              setTimeout(() => {
                Message.innerText += "게임을 종료하시겠습니까?";
                YorN.classList.remove("hidden");
              }, 1000);
            }, 1000);
          }, 1500);
          Yes.addEventListener('click', () => {
            YorN.classList.add("hidden");
            textType(WinEnd, Message, () => {
              setTimeout(() => {
                blackBg.classList.remove("hidden");
                Message.classList.remove("hidden");
                setTimeout(() => {
                  textType(gameWin01, Message, () => {
                    textType(gameWin02, Message, () => {
                      textType(gameWin03, Message, () => {

                      }, 1500);
                    }, 1500);
                  }, 1500);
                }, 1500);
              }, 1000)
            })

          })
          No.addEventListener('click', () => {
            YorN.classList.add("hidden");
            textType(NoTxt, Message, () => {
              blackBg.classList.remove("hidden");
              Message.classList.remove("hidden");
              setTimeout(() => {
                textType(gameWin01, Message, () => {
                  textType(gameWin02, Message, () => {
                    textType(gameWin03, Message, () => {

                    }, 1500);
                  }, 1500);
                }, 1500);
              }, 1500);
            })

          })

        })
      }
    } else {
      dragging.classList.add("pzError");
      const thisPiece = dragging;
      setTimeout(() => {
        thisPiece.classList.remove("pzError");
      }, 1000)

    }

    dragging.classList.remove("dragging");
    dragging = null;
  });
}