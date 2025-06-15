import {
  glitch
} from './glitch.js';

import {
  errorThemeparkBgm
} from './start.js';


export function ridesMessage(getIsErrorState) {
  const Themepark = document.querySelector(".Themepark");
  const normalMessage = document.querySelector(".SystemIntro");
  const Message = document.querySelector(".SystemMessage");
  const ErrorOffice = document.querySelector(".Error_office");
  const ErrorThemepark = document.querySelector(".Error_themepark");
  const yes = document.getElementById("YES");
  const no = document.getElementById("NO");
  const YorN = document.querySelector(".YorN");


  const normalClick = [{
      id: "coaster_normal",
      message: "롤러코스터를 탑승하시겠습니까?"
    },
    {
      id: "merry_normal",
      message: "회전목마를 탑승하시겠습니까?"
    },
    {
      id: "gyro_normal",
      message: "자이로드롭를 탑승하시겠습니까?"
    },
    {
      id: "ferris_normal",
      message: "대관람차를 탑승하시겠습니까?"
    },
    {
      id: "office_normal",
      message: "관리자 외 출입불가 구역입니다. \n현재 접근 권한이 없습니다."
    },
  ];


  const errorClick = [{
      id: "coaster_error",
      message: "> 탑승 요청: 거부됨 \n> 오류 코드: QF1-R07 \n> 이 기구는 현재 접근할 수 없습니다."
    },
    {
      id: "merry_error",
      message: "> 탑승 요청: 거부됨 \n> 오류 코드: ZD9-R01 \n> 이 기구는 현재 접근할 수 없습니다."
    },
    {
      id: "gyro_error",
      message: "> 탑승 요청: 거부됨 \n> 오류 코드: LM3-R08 \n> 이 기구는 현재 접근할 수 없습니다."
    },
    {
      id: "ferris_error",
      message: "> 탑승 요청: 거부됨 \n> 오류 코드: XK2-R00 \n> 이 기구는 현재 접근할 수 없습니다."
    },
    {
      id: "office_error"
    },
  ];



  // 배열을 순회하며 각 요소에 이벤트 등록
  normalClick.forEach((ride) => {
    const element = document.getElementById(ride.id); // id로 해당 요소 선택
    if (!element) return; // 요소가 존재하지 않으면 무시하고 건너뜀

    element.addEventListener("click", () => {
      if (getIsErrorState()) return;
      normalMessage.innerText = ride.message;
      normalMessage.classList.remove("hidden");
      YorN.classList.remove("hidden");

      if (ride.id === "office_normal") {
        normalMessage.classList.remove("hidden");
        YorN.classList.add("hidden");

        setTimeout(() => {
          normalMessage.classList.add("hidden");
        }, 1000);
      }
    })
  });

  no.addEventListener("click", () => {
    YorN.classList.add("hidden");
    normalMessage.classList.add("hidden");
  })

  yes.addEventListener("click", () => {
    normalMessage.classList.add("shake");

    setTimeout(() => {
      normalMessage.classList.remove("shake");
    }, 2000);
  })

  // 배열을 순회하며 각 요소에 이벤트 등록
  errorClick.forEach((ride) => {
    const element = document.getElementById(ride.id); // id로 해당 요소 선택
    if (!element) return; // 요소가 존재하지 않으면 무시하고 건너뜀

    // 마우스를 올렸을 때 실행
    element.addEventListener("click", () => {

      if (!getIsErrorState()) return; // 오류 상태가 아니면 무시
      Message.innerText = ride.message; // 메시지 텍스트 설정
        Message.classList.remove("hidden"); // 메시지 박스 보이기

        setTimeout(() => {
          Message.classList.add("hidden");
        }, 1500);

      



      if (ride.id === "office_error") {
        ErrorThemepark.classList.add("hidden");
        ErrorOffice.classList.remove("hidden");
        Message.classList.add("hidden");

        glitch()
      }
    });
  });


}