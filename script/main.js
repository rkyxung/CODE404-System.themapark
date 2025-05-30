// startGame 함수: 게임 시작 흐름 처리 (start 버튼 클릭 → 씬 전환, 메시지 출력 등)
import {
  startGame
} from "./start.js"; // start.js에서 startGame 함수 가져오기

// glitch 함수: 글리치 캔버스 효과 (이미지 흔들림 등 시각적 오류 연출)
import {
  glitch
} from "./glitch.js"; // glitch.js에서 glitch 함수 가져오기

import {
  deepGlitch
} from "./deepGlitch.js"; // glitch.js에서 glitch 함수 가져오기

// timer 함수: 카운트다운 타이머 실행 (오류 해결 제한 시간 관리)
import {
  timer
} from "./timer.js"; // timer.js에서 timer 함수 가져오기

// errorHover 함수: 오류 상태에서 마우스 호버 시 메시지 출력 처리
import {
  ridesMessage
} from "./rides.js"; // errorHover.js에서 errormessage 함수 가져오기

import {
  puzzle01
} from "./puzzle01.js"; // 퍼즐1 함수 가져오기

import {
  puzzle02
} from "./puzzle02.js"; // 퍼즐2 함수 가져오기

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
let puzzle04once = false

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
  // 퍼즐2 실행 조건: currentPuzzle이 2이고 아직 실행한 적이 없을 때
  else if (currentPuzzle === 2 && !puzzle02once) {
    puzzle02once = true; // 한 번만 실행되게 설정
    puzzle02(() => {
      // 퍼즐2가 끝난 후 처리할 로직이 있다면 여기에 작성
      console.log("퍼즐2 완료");
      currentPuzzle = 3;
      Puzzle();
    });
  } else if (currentPuzzle === 3 && !puzzle03once) {
    puzzle03once = true; // 한 번만 실행되게 설정
    puzzle03(() => {
      // 퍼즐2가 끝난 후 처리할 로직이 있다면 여기에 작성
      console.log("퍼즐3 완료");
      currentPuzzle = 4;
      Puzzle();
    });
  } else if (currentPuzzle === 4 && !puzzle04once) {
    puzzle04once = true; // 한 번만 실행되게 설정
    puzzle04(() => {
      // 퍼즐2가 끝난 후 처리할 로직이 있다면 여기에 작성
      console.log("퍼즐4 완료");
      Puzzle();
    });
  }
}

// main(): 게임 전체 흐름의 진입점 역할을 하는 함수
function main() {
  // startGame 함수 실행 → 각 기능을 인자로 전달하여 연결
  startGame({
    glitch, // glitch 효과 함수 전달
    timer, // 타이머 함수 전달
    ridesMessage,
    getIsErrorState: () => ErrorValue
  });


  // 퍼즐 실행 흐름 시작
  Puzzle(); // 첫 퍼즐 실행
}

// main() 함수 실행 → 웹페이지가 로드되면 게임 흐름 시작
document.addEventListener("DOMContentLoaded", () => {
  main(); // main.js의 진입 함수를 여기서 실행
});