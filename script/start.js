import {
  textType
} from "./textType.js";

import {
  ridesMessage
} from "./rides.js";

import {
  timer
} from "./timer.js";

import {
  glitch
} from "./glitch.js";


export const errorThemeparkBgm = new Audio("sounds/errorThemepark.mp3"); // 오류 테마파크 배경음악
errorThemeparkBgm.loop = true; // 오류 테마파크 배경음악 반복 재생 설정

export  const ThemeparkBgm = new Audio("sounds/Themepark.mp3"); // 오디오 경로 설정
ThemeparkBgm.loop = true; // 배경음악 반복 재생 설정


// 게임 시작 버튼 클릭 → 메시지 순차 출력 및 오류 상태 진입
export function startGame({
  onError,
  glitch,
  ridesMessage,
  getIsErrorState
}) {

  const StartBtn = document.querySelector(".start-button");
  const StartScene = document.querySelector(".StartScene");
  const Themepark = document.querySelector(".Themepark");
  const SystemFrame = document.querySelector(".SystemFrame");
  const error = document.querySelector(".Error_themepark");
  const intro = document.querySelector(".SystemIntro");
  const Message = document.querySelector(".SystemMessage");
  const StartHover = document.querySelector(".StartHover");
  const HoverText = document.querySelector(".SystemFrame_start span");
  const yes = document.getElementById("YES");
  const no = document.getElementById("NO");
  const YorN = document.querySelector(".YorN");


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
      text: "> 이전 접속 기록 감지됨: 누적 접속 시간 9134시간",
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

  const WelcomeMessage = [{
      text: "환영합니다, UID-037님.",
      isDot: false
    },
    {
      text: "system.themepark에 오신 것을 축하합니다.",
      isDot: false
    },
    {
      text: "원하시는 놀이기구를 선택하여 즐거운 시간을 시작하십시오.",
      isDot: false
    }
  ]

  const errorMessage01 = [{
      text: "> 오류 발생",
      isDot: false
    },
    {
      text: "> 예상치 못한 접근 경로 감지됨.",
      isDot: false
    },
    {
      text: "> 시스템 안정성 보장 불가. 긴급 복구를 시도합니다.",
      isDot: false
    }
  ]

  const errorMessage02 = [{
      text: "> 복구 중",
      isDot: true
    },
    {
      text: "> 복구 실패",
      isDot: false
    },
    {
      text: "> 전력 상태 비정상. 제한 전원으로 작동됩니다.",
      isDot: false
    }
  ]

  const errorMessage03 = [{
    text: "제한 시간 내에 악성코드를 제거하시길 바랍니다.",
    isDot: false
  }]


  let ErrorValue = false;
  let i = 0; // 메시지 인덱스를 0부터 시작 (몇 번째 메시지를 출력할지 추적) //클릭이벤트 밖으로 빼야 됨

  // 오디오 변수
  const ThemeparkBgm = new Audio("sounds/Themepark.mp3"); // 오디오 경로 설정
  ThemeparkBgm.loop = true; // 배경음악 반복 재생 설정

  const errorEffect = new Audio("sounds/error_first.mp3"); // 오류 효과음
  errorEffect.loop = true; // 오류 효과음 반복 재생 설정
  errorEffect.volume = 0.7; // 오류 효과음 볼륨 설정



  StartBtn.addEventListener("mouseover", () => {
    Themepark.classList.add("hidden");
    StartHover.classList.remove("hidden");
    HoverText.classList.add("hover");
  })

  StartBtn.addEventListener("mouseleave", () => {
    Themepark.classList.remove("hidden");
    StartHover.classList.add("hidden");
    HoverText.classList.remove("hover");
  })


  StartBtn.addEventListener("click", () => {
    StartScene.classList.add("hidden");
    SystemFrame.classList.remove("hidden");
    setTimeout(() => {
      Themepark.classList.add("hidden");
      StartHover.classList.add("hidden");
    }, 20);

    // textType 실행해서 메시지 출력 시작
    textType(introMessage, intro, () => {
      SystemFrame.classList.add("hidden");
      Themepark.classList.remove("hidden");
      ThemeparkBgm.play(); // 테마파크 오디오 재생
      setTimeout(() => {
        SystemFrame.classList.remove("hidden");
        textType(WelcomeMessage, intro, () => {
          intro.classList.add("hidden");
          ridesMessage(() => ErrorValue);
        });
      }, 500);
    });

    yes.addEventListener("click", () => {
      errorEffect.play(); // 오류 효과음 재생
      ThemeparkBgm.pause(); // 테마파크 오디오 일시 정지
      Themepark.classList.add("hidden");
      YorN.classList.add("hidden");
      intro.classList.add("hidden");
      Message.classList.remove("hidden");
      textType(errorMessage01, Message, () => {
        setTimeout(() => {
          Message.classList.add("shake");
        }, 4500);
        textType(errorMessage02, Message, () => {
          error.classList.remove("hidden");
          textType(errorMessage03, Message, () => {
            Message.classList.remove("shake");
            timer(600);
            ErrorValue = true;
            glitch();
            setTimeout(() => {
              Message.classList.add("hidden");
              errorEffect.pause(); // 오류 효과음 일시 정지
              errorThemeparkBgm.play(); // 오류 테마파크 배경음악 재생
            }, 600)
          })
        }, 500);
      });
    })

  })


}