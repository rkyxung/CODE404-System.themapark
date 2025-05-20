import {
  wrongTime
} from "./timer.js";
import {
  glitch
} from "./glitch.js";

export function puzzle02() {
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


  let pswd02 = "";
  let pswd03 = "";
  let answer02 = false;
  let answer03 = false;
  const btns = [btn01, btn02, btn03, btn04];

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
      console.log("현재 확대 상태 → 제거 시도");
      officeIn.classList.remove("zoom_board");
    } else {
      console.log("현재 축소 상태 → 확대 시도");
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
    message.innerText = "차단기를 올바른 순서로 올리세요.\n";
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
        btn.src = "img/OFFICE/btn_up.png";
        pswd02 += num;
        message.innerText += num;
      } else {
        btn.src = "img/OFFICE/btn_down.png";
        pswd02 = pswd02.slice(0, -1); // 마지막 문자 제거
        message.innerText = message.innerText.slice(0, -1);
      }

      // 입력이 3자리 되면 정답 판정
      if (pswd02.length === 3) {
        if (pswd02 === "124") {
          setTimeout(() => {
            message.innerText = "정답";
            answer02 = true;
            setTimeout(() => {
              message.classList.add("hidden");
              message.innerText = "";
              dark.style.display = "none";
              officeIn.classList.remove("zoom_electric");
            }, 1000);
          }, 1000);
        } else {
          setTimeout(() => {
            message.innerText = "오답";
            setTimeout(() => {
              wrongTime(10);
              pswd02 = "";
              message.innerText = "차단기를 올바른 순서로 올리세요.\n";

              // 버튼 상태 전부 초기화
              btns.forEach((b) => {
                b.src = "img/OFFICE/btn_down.png";
              });
            }, 500);
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

    document.addEventListener("keydown", (e) => {
      //백스페이스 누르면 지우기
      if (e.key === "Backspace") {
        pswd03 = pswd03.slice(0, -1);
        computerPswd.innerText = "password: " + pswd03;;
      }
      //키보드 한글짜리만 가능
      //7일 때 하나 더 누를 수 있기 때문에 8일 때의 if문문을 안에 넣어야 함
      if (pswd03.length < 8 && e.key.length === 1) {
        pswd03 += e.key;
        computerPswd.innerText += e.key;

        if (pswd03.length === 8) {
          if (pswd03 === "20110517") {
            computerMessage.innerText = "CORRECT";
            computerMessage.style.left = "40vw";
            answer03 = true;
            setTimeout(() => {
              message.classList.remove("hidden");
              message.innerText = "잠금이 해제되었습니다.";
              setTimeout(() => {
                computerFront.src = "img/OFFICE/computer_front_black.png";
                message.classList.add("hidden");
                computerPswd.classList.add("hidden");
                computerMessage.classList.add("hidden");
                computerView.classList.add("zoom_computer");
              }, 500);
            }, 500);
          } else {
            message.classList.remove("hidden");
            message.innerText = "오답. 다시 입력하시오.";
            setTimeout(() => {
              wrongTime(10);
              pswd03 = "";
              computerPswd.innerText = "password: ";
              message.classList.add("hidden");
            }, 500);
          }
        }
      }
    })
  });

  computerBg.addEventListener("click", () => {
    computerView.classList.add("hidden");
    officeIn.classList.remove("hidden");
  });




}