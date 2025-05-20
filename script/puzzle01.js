import {
  wrongTime
} from "./timer.js";
import {
  glitch
} from "./glitch.js";

export function puzzle01(onComplete) {
  const ErrorThemapark = document.querySelector(".Error_themapark");
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

  let pswd = "";
  let answer = false;

  ErrorOfficeBg.addEventListener("click", () => {
    ErrorOffice.classList.add("hidden");
    ErrorThemapark.classList.remove("hidden");
    message.innerText = "";
    message.classList.add("hidden");
  })

  door.addEventListener("click", () => {
    
    setTimeout(() => {
      message.classList.remove("hidden");
      message.innerText = "문이 잠겼습니다. \n비밀번호를 입력하세요."

      setTimeout(() => {
        message.innerText = "";
        message.classList.add("hidden");
      }, 1000);
    }, 0);

  })

  password.addEventListener("click", () => {
    modalPassword.classList.remove("hidden");
    message.classList.remove("hidden");
    message.innerText = "비밀번호를 입력하세요 \npassword : ";
  });

  flowChart.addEventListener("click", () => {
    modalChart.classList.remove("hidden");
    message.classList.remove("hidden");
    message.innerText =
      "놀이기구 점검 순서도 \n대관람차 -> 자이로드롭 -> 회전목마 -> 롤러코스터";
  });

  modalPassword.addEventListener("click", (e) => {
    if (e.target === modalPassword) {
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
        if (pswd === "3456") {
          setTimeout(() => {
            message.innerText = "정답";

            setTimeout(() => {
              modalPassword.classList.add("hidden");
              message.classList.add("hidden");
            }, 1000);
          }, 1000);

          answer = true;
        } else {
          setTimeout(() => {
            message.innerText = "오답";

            setTimeout(() => {
              wrongTime(10);
              pswd = "";
              message.innerText = "비밀번호를 입력하세요\npassword : ";
            }, 500);
          }, 1000);
        }
      }

      if (answer === true) {
        open.classList.remove("hidden");
        glitch();
      }
    });

    open.addEventListener("click", () => {
      ErrorOffice.classList.add("hidden");
      inside.classList.remove("hidden");
      glitch();
      if (onComplete) onComplete(); //puzzle 스크립트 구분 짓기 위함. 성공했으면 다음 단계로
    });


  });
}