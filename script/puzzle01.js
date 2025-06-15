import {
  wrongTime
} from "./timer.js";
import {
  glitch
} from "./glitch.js";
import {
  deepGlitch
} from "./deepGlitch.js";

export function puzzle01(onComplete) {
  const ErrorThemepark = document.querySelector(".Error_themepark");
  const ErrorOffice = document.querySelector(".Error_office");
  const ErrorOfficeBg = document.getElementById("office_bg");
  const flowChart = document.getElementById("office_flowChart");
  const password = document.getElementById("office_password");
  const modalPassword = document.querySelector(".modal.Password");
  const modalChart = document.querySelector(".modal.Chart");
  const modalPswd = document.getElementById("modal_password");
  const message = document.querySelector(".SystemMessage");
  const nums = document.querySelectorAll(".modal.Password span");
  const open = document.querySelector(".open");
  const inside = document.querySelector(".Error_officeInside");
  const door = document.getElementById("door");
  const timer = document.getElementById("timer");

  let pswd = "";
  let answer = false;

  ErrorOfficeBg.addEventListener("click", () => {
    ErrorOffice.classList.add("hidden");
    ErrorThemepark.classList.remove("hidden");
    // message.innerText = "";
    // message.classList.add("hidden");
  })

  door.addEventListener("click", () => {
    message.classList.remove("hidden");
    message.innerText = "접근 차단됨. \n보안 구역은 인증이 필요합니다."

    setTimeout(() => {
      message.innerText = "";
      message.classList.add("hidden");
    }, 1700);

  })

  password.addEventListener("click", () => {
    modalPassword.classList.remove("hidden");
    message.classList.remove("hidden");
    message.innerText = "비밀번호를 입력하십시오. \npassword : ";
  });

  flowChart.addEventListener("click", () => {
    modalChart.classList.remove("hidden");
    message.classList.remove("hidden");
    message.innerText =
      "놀이기구 점검 순서도 \n대관람차 -> 자이로드롭 -> 회전목마 -> 롤러코스터";
  });

  modalPassword.addEventListener("click", (e) => {
    if (e.target === modalPassword) {
      pswd = "";
      modalPassword.classList.add("hidden");
      message.classList.add("hidden");
    }
  });

  modalChart.addEventListener("click", (e) => {
    if (e.target === modalChart) {
      modalChart.classList.add("hidden");
      message.classList.add("hidden");
    }
  });

  nums.forEach((number) => {
    number.addEventListener("click", () => {
      if (pswd.length < 4) {
        pswd += number.dataset.num;
        message.innerText += number.dataset.num;
      }

      if (pswd.length === 4) {
        if (pswd === "0817") {
          setTimeout(() => {
            message.innerText = "인증 성공. \n보안 구역 접근 권한이 부여됩니다.";

            setTimeout(() => {
              modalPassword.classList.add("hidden");
              message.classList.add("hidden");
            }, 1000);
          }, 1000);

          answer = true;
        } else {
          setTimeout(() => {
            message.innerText = "인증 실패. \n비밀번호가 일치하지 않습니다.";
            message.classList.add("shake");
            modalPassword.classList.add("shake");
            timer.classList.add("shake");

            setTimeout(() => {
              wrongTime(10);
              pswd = "";
              message.innerText = "비밀번호를 입력하십시오. \npassword : ";
              message.classList.remove("shake");
              modalPassword.classList.remove("shake");
              timer.classList.remove("shake");
            }, 1500);
          }, 1000);
        }
      }

      if (answer === true) {
        open.classList.remove("hidden");
        glitch();
      }
    });
  });

  open.addEventListener("click", () => {
    ErrorOffice.classList.add("hidden");
    inside.classList.remove("hidden");

    setTimeout(() => {
      message.classList.remove("hidden");
      message.innerText = "> 메인 전력 차단됨 \n> 비상 전력으로 전환됨 : 손전등 모드 활성화"
      console.log("메시지창 열림");
      setTimeout(() => {
        message.classList.add("hidden");
        console.log("메시지창 닫힘");
      }, 1500);
    }, 500);
    if (onComplete) onComplete(); //puzzle 스크립트 구분 짓기 위함. 성공했으면 다음 단계로
  });
}