import {
  wrongTime
} from "./timer.js";

import {
  glitch
} from "./glitch.js";

import {
  textType
} from "./textType.js";

import {
  deepGlitch
} from "./deepGlitch.js";

import {
  puzzle04
} from "./puzzle04.js";


export function puzzle03(onComplete) {
  const board = document.getElementById("puzzleBoard");
  const Message = document.querySelector(".SystemIntro");
  const errorMessage = document.querySelector(".SystemMessage");

  const puzzle03Message = [{
      text: "> 탈출 경로 오류",
      isDot: false
    },
    {
      text: "> 재시도 실패",
      isDot: false
    },
    {
      text: "> 오류 심화로 인해 사용자의 위치가 강제로 변경되었습니다.",
      isDot: false
    }
  ]

  setTimeout(() => {
    errorMessage.classList.remove("hidden");
    textType(puzzle03Message, errorMessage, () => {
      setTimeout(() => {
        errorMessage.innerText = "비상 전력 소멸 \n공간 안정성 손상. 복구 퍼즐을 완료하여 재구성하십시오."
        setTimeout(() => {
          errorMessage.classList.add("hidden");
          if (typeof onComplete === 'function') {
            onComplete();
          }
        }, 2000);
      }, 1500);
    });
  }, 3000);

}