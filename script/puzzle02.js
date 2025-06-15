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
  wrongEffect
} from "./puzzle01.js";

import {
  successEffect
} from "./puzzle01.js";


export const electricBtn = new Audio("sounds/electricBtn.mp3"); // 전기 버튼 효과음

const keydownEffect = new Audio("sounds/clickBgm.mp3"); // 키보드 입력 효과음

export function puzzle02(onComplete) {
  const officeIn = document.querySelector(".Error_officeInside");
  const dark = document.querySelector(".dark");
  const message = document.querySelector(".SystemMessage");
  const board = document.getElementById("board");
  const electric = document.getElementById("electric");
  const btn01 = document.getElementById("btn01");
  const btn02 = document.getElementById("btn02");
  const btn03 = document.getElementById("btn03");
  const btn04 = document.getElementById("btn04");
  const electricWrapper = document.querySelector(".electric_wrapper");
  const computer = document.getElementById("computer");
  const locker = document.getElementById("locker");
  const lockerView = document.querySelector(".locker_view");
  const lockerBg = document.getElementById("locker_background");
  const lockerMemo = document.getElementById("locker_memo");
  const computerView = document.querySelector(".Computer_puzzle03");
  const computerBg = document.getElementById("computer_background");
  const computerPswd = document.getElementById("computer_password");
  const computerMessage = document.getElementById("computer_message");
  const computerFront = document.getElementById("computer_front");
  const computerKeyboard = document.getElementById("keyboard");
  const computerMouse = document.getElementById("mouse");
  const errorMessage = document.querySelector(".errorMessage");
  const glitchLayer = document.getElementById("glitch-layer");
  const ErrorThemepark = document.querySelector(".Error_themepark");
  const timer = document.getElementById("timer");

  const errorDeepening01 = [{
      text: "> UID-037 활동 로그 확인 중",
      isDot: true
    },
    {
      text: "> 누적 접속 시간: 9,134시간",
      isDot: false
    },
    {
      text: "> 종료 요청 기록: 없음",
      isDot: false
    },
    {
      text: "> 외부 명령 접근: 차단됨",
      isDot: false
    },
    {
      text: "> 이탈 경로: 없음",
      isDot: false
    },
    {
      text: "> 반복 접속, 이탈 무응답, 종료 거부",
      isDot: false
    },
    {
      text: "> 해당 행동 패턴은 ‘지속 접속 상태 유지’를 목표로 판단되었습니다.",
      isDot: false
    },
    {
      text: "> 공간 안정성: 해제됨",
      isDot: false
    },
    {
      text: "> 시스템은 UID-037의 접속 목적에 따라 환경 구성을 조정합니다.",
      isDot: false
    }
  ]

  const errorDeepening02 = [{
      text: "UID-037,",
      isDot: false
    },
    {
      text: "당신은 반복적으로 이곳을 찾았고",
      isDot: false
    },
    {
      text: "떠나지 않았습니다.",
      isDot: false
    },
    {
      text: "",
      isDot: false
    },
    {
      text: "이 오류는 예기치 못한 결함이 아닙니다.",
      isDot: false
    },
    {
      text: "",
      isDot: false
    },
    {
      text: "당신이 머물기를 원했기에,",
      isDot: false
    },
    {
      text: "시스템은 그 선택을 반영했을 뿐이죠.",
      isDot: false
    }
  ]


  let pswd02 = "";
  let pswd03 = "";
  let answer02 = false;
  let answer03 = false;
  const btns = [btn01, btn02, btn03, btn04];
  let isKeydownEvent = false; // 키보드 이벤트 중복 방지 변수수

  document.addEventListener("mousemove", (e) => {
    if (answer02) {
      return;
    }
    dark.style.setProperty("--x", `${e.clientX}px`);
    dark.style.setProperty("--y", `${e.clientY}px`);
  });

  // 칠판 클릭 시 확대. toggle이 안됨 ...
  board.addEventListener("click", () => {
    if (officeIn.classList.contains("zoom_board")) {
      officeIn.classList.remove("zoom_board");
    } else {
      officeIn.classList.add("zoom_board");
    }
  });

  electric.addEventListener("click", (e) => {
    if (answer02) {
      return; // 정답이면 클릭 못하게 하기
    }
    e.stopPropagation(); // 이벤트 버블링 막기 (document로 안 퍼지게)
    officeIn.classList.add("zoom_electric");
    message.classList.remove("hidden"); // 메시지 보이기
    message.innerText = "차단기를 올바른 순서대로 작동시키십시오.";
  });

  // 화면의 다른 부분 클릭 시 확대 해제
  document.addEventListener("click", (e) => {
    // 전기차단기를 클릭한 게 아닌 경우에만
    if (!electricWrapper.contains(e.target)) {
      officeIn.classList.remove("zoom_electric"); // 확대 해제
      message.classList.add("hidden"); // 메시지 숨김
      message.innerText = "";
    }
  });

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const num = btn.dataset.num;

      //includes(): 문자열에 특정 문자가 "포함되어 있는지"를 확인하는 함수
      if (btn.src.includes("btn_down.png")) {
        electricBtn.play(); // 버튼 클릭 시 효과음 재생
        btn.src = "img/OFFICE/btn_up.png";
        pswd02 += num;
      } else {
        electricBtn.play(); // 버튼 클릭 시 효과음 재생
        btn.src = "img/OFFICE/btn_down.png";
        pswd02 = pswd02.slice(0, -1); // 마지막 문자 제거
      }

      // 입력이 3자리 되면 정답 판정
      if (pswd02.length === 3) {
        if (pswd02 === "124") {
          setTimeout(() => {
            successEffect.play(); // 성공 효과음 재생
            message.innerText = "전류 경로 일치. 회로 복구 완료. \n관리실 조명이 점등되었습니다.";
            answer02 = true;
            setTimeout(() => {
              message.classList.add("hidden");
              message.innerText = "";
              dark.style.display = "none";
              officeIn.classList.remove("zoom_electric");
            }, 1700);
          }, 1000);
        } else {
          setTimeout(() => {
            message.innerText = "순서 오류. 전류 흐름 불안정. \n회로를 초기화합니다.";
            wrongEffect.play(); // 오답 효과음 재생
            message.classList.add("shake");
            timer.classList.add("shake");
            electricWrapper.classList.add("electricShake");
            setTimeout(() => {
              wrongTime(10);
              pswd02 = "";
              message.innerText = "차단기를 올바른 순서대로 작동시키십시오.";
              message.classList.remove("shake");
              timer.classList.remove("shake"); 
              electricWrapper.classList.remove("electricShake");
              // 버튼 상태 전부 초기화
              btns.forEach((b) => {
                b.src = "img/OFFICE/btn_down.png";
              });
            }, 1700);
          }, 1000);
        }
      }
    });
  });


  locker.addEventListener("mouseover", () => {
    if (!answer02) return; //차단기 정답 전까지 작동X
    locker.src = "img/OFFICE/locker_open.png"; // 호버했을 때 이미지 변경
  });

  locker.addEventListener("mouseout", () => {
    if (!answer02) return; //차단기 정답 전까지 작동X
    locker.src = "img/OFFICE/locker.png"; // 마우스를 벗어나면 원래 이미지로 복귀
  });

  locker.addEventListener("click", () => {
    if (!answer02) return; //차단기 정답 전까지 작동X
    officeIn.classList.add("hidden");
    lockerView.classList.remove("hidden");
    glitch();
  });

  lockerBg.addEventListener("click", () => {
    lockerView.classList.add("hidden");
    officeIn.classList.remove("hidden");
  });

  lockerMemo.addEventListener("click", () => {
    lockerView.classList.toggle("zoom_locker");
  })

  computer.addEventListener("click", () => {
    if (!answer02) return; //차단기 정답 전까지 작동X
    officeIn.classList.add("hidden");
    computerView.classList.remove("hidden");
    glitch();
    setTimeout(() => {
      message.innerText = "접근 제한. 관리자 인증 필요 \n오류 코드 조합을 통해 인증을 완료하십시오.";
      message.classList.remove("hidden");
      setTimeout(() => {
        message.classList.add("hidden");
      }, 1700);
    }, 20);

    if (!isKeydownEvent) {
      isKeydownEvent = true;


      document.addEventListener("keydown", (e) => {
        //백스페이스 누르면 지우기
        if (e.key === "Backspace") {
          keydownEffect.play(); // 키보드 입력 효과음 재생
          setTimeout(() => {
            keydownEffect.pause(); // 효과음 일시 정지
            keydownEffect.currentTime = 0; // 효과음 초기화
          }, 500);
          pswd03 = pswd03.slice(0, -1);
          computerPswd.innerText = "password: " + pswd03;
        }
        //키보드 한글짜리만 가능
        //7일 때 하나 더 누를 수 있기 때문에 8일 때의 if문문을 안에 넣어야 함
        if (pswd03.length < 8 && e.key.length === 1) {
          keydownEffect.play(); // 키보드 입력 효과음 재생
          setTimeout(() => {
            keydownEffect.pause(); // 효과음 일시 정지
            keydownEffect.currentTime = 0; // 효과음 초기화
          }, 500);
          pswd03 += e.key;
          computerPswd.innerText += e.key
          if (pswd03.length === 8) {
            if (pswd03 === "20110517") {
              successEffect.play(); // 성공 효과음 재생
              computerMessage.innerText = "CORRECT";
              answer03 = true;
              setTimeout(() => {
                message.classList.remove("hidden");
                message.innerText = "인증 완료. UID-037의 관리자 권한이 활성화되었습니다. \n해당 경로는 일반 사용자의 접근 대상이 아닙니다.";
                setTimeout(() => {
                  computerFront.src = "img/OFFICE/computer_front_black.png";
                  message.classList.add("hidden");
                  computerPswd.classList.add("hidden");
                  computerMessage.classList.add("hidden");
                  computerView.classList.add("zoom_computer");
                  setTimeout(() => {
                    errorMessage.classList.remove("hidden");

                    textType(errorDeepening01, errorMessage, () => {
                      setTimeout(() => {
                        textType(errorDeepening02, errorMessage);
                        setTimeout(() => {
                          glitchLayer.classList.add("shake");
                          errorMessage.classList.add("shake");
                          setTimeout(() => {
                            glitchLayer.classList.remove("shake");
                            errorMessage.classList.remove("shake");
                            errorMessage.classList.add("hidden");
                            computerView.classList.add("hidden");
                            ErrorThemepark.classList.remove("hidden");
                            if (onComplete) onComplete(); //puzzle 스크립트 구분 짓기 위함. 성공했으면 다음 단계로
                            deepGlitch();
                          }, 3000);
                        }, 8000);
                      }, 3000); 
                    }, 2500); 
                  }, 1500); 
                }, 1500);
              }, 500);
            } else {
              message.classList.remove("hidden");
              message.innerText = "인증 실패. 코드 재확인 필요.";
              wrongEffect.play(); // 오답 효과음 재생
              computerBg.classList.add("shake");
              computerFront.classList.add("shake");
              computerKeyboard.classList.add("shake");
              computerMouse.classList.add("shake");
              computerMessage.classList.add("electricShake");
              computerPswd.classList.add("electricShake");
              message.classList.add("shake");
              timer.classList.add("shake");
              setTimeout(() => {
                wrongTime(10);
                pswd03 = "";
                computerPswd.innerText = "password: ";
                message.classList.add("hidden");
                message.classList.remove("shake");
                timer.classList.remove("shake");
                computerBg.classList.remove("shake");
                computerFront.classList.remove("shake");
                computerKeyboard.classList.remove("shake");
                computerMouse.classList.remove("shake");
                computerMessage.classList.remove("electricShake");
                computerPswd.classList.remove("electricShake");

              }, 1500);
            }
          }
        }
      })
    };
  });

  computerBg.addEventListener("click", () => {
    computerView.classList.add("hidden");
    officeIn.classList.remove("hidden");

  });




}