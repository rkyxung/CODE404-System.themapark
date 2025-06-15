import {
  startGame
} from "./start.js"; 

import {
  glitch
} from "./glitch.js"; 

import {
  deepGlitch
} from "./deepGlitch.js"; 

import {
  timer
} from "./timer.js";

import {
  ridesMessage
} from "./rides.js"; 

import {
  puzzle01
} from "./puzzle01.js"; 

import {
  puzzle02
} from "./puzzle02.js"; 

import {
  puzzle03
} from "./puzzle03.js";

import {
  puzzle04
} from "./puzzle04.js";

let ErrorValue = false;
// 현재 진행 중인 퍼즐 번호를 저장하는 변수
let currentPuzzle = 1;

// puzzle02가 중복 실행되는 것을 막기 위한 플래그 (딱 한 번만 실행되도록)
let puzzle01once = false;
let puzzle02once = false;
let puzzle03once = false;
let puzzle04once = false;

// 현재 퍼즐 번호에 따라 해당 퍼즐을 실행하는 함수
function Puzzle() {
  if (currentPuzzle === 1 && !puzzle01once) {
    puzzle01once = true;
    // 퍼즐1 실행
    puzzle01(() => {
      // 퍼즐1이 끝나면 currentPuzzle을 2로 올리고 Puzzle 함수를 다시 호출
      currentPuzzle = 2;
      Puzzle(); // 퍼즐2로 진입
    });
  }

  else if (currentPuzzle === 2 && !puzzle02once) {
    puzzle02once = true; 
    puzzle02(() => {
      console.log("퍼즐2 완료");
      currentPuzzle = 3;
      Puzzle();
    });
  } else if (currentPuzzle === 3 && !puzzle03once) {
    puzzle03once = true; 
    puzzle03(() => {
      console.log("퍼즐3 완료");
      currentPuzzle = 4;
      Puzzle();
    });
  } else if (currentPuzzle === 4 && !puzzle04once) {
    puzzle04once = true; 
    puzzle04(() => {
      console.log("퍼즐4 완료");
    });
  }
}


function main() {
  startGame({
    glitch, 
    timer,
    ridesMessage,
    getIsErrorState: () => ErrorValue
  });

  // 🌟 URL 파라미터에서 stage 값 확인 (예: ?stage=2)
  const params = new URLSearchParams(window.location.search);
  const stage = params.get("stage");

  if (stage === "1") {
    console.log("URL → 퍼즐1 바로 진입");
    document.querySelector(".Error_officeInside") ?.classList.remove("hidden");
    puzzle01once = true;
    currentPuzzle = 2;
    puzzle01(() => {});
    return; // 이후 Puzzle() 중복 실행 방지
  }

  if (stage === "2") {
    console.log("URL → 퍼즐2 바로 진입");
    document.querySelector(".Error_officeInside") ?.classList.remove("hidden");
    document.querySelector(".dark") ?.classList.remove("hidden");
    puzzle02once = true;
    currentPuzzle = 3;
    puzzle02(() => {});
    return;
  }

  if (stage === "3") {
    console.log("URL → 퍼즐3 바로 진입");
    document.querySelector(".Computer_puzzle03") ?.classList.remove("hidden");
    puzzle03once = true;
    currentPuzzle = 4;
    puzzle03(() => {});
    return;
  }

  if (stage === "4") {
    console.log("URL → 퍼즐4 바로 진입");
    document.querySelector(".puzzleBoard") ?.classList.remove("hidden");
    document.querySelector(".Themepark")?.classList.add("hidden");
    document.querySelector(".StartScene")?.classList.add("hidden");
    document.querySelector(".SystemFrame")?.classList.remove("hidden");
    puzzle04once = true;
    currentPuzzle = 5;
    puzzle04(() => {});
    return;
  }


  Puzzle();
}

// 웹페이지가 로드되면 게임 흐름 시작
document.addEventListener("DOMContentLoaded", () => {
  main(); 
});