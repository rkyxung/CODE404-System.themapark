import { glitch } from './glitch.js';


export function errormessage(getIsErrorState) {
  const Message = document.querySelector(".SystemMessage");
  const ErrorOffice = document.querySelector(".Error_office");
  const ErrorThemepark = document.querySelector(".Error_themepark");


  const ridesHover = [
    { id: "coaster_error", message: "롤러코스터입니다." },
    { id: "merry_error", message: "회전목마입니다." },
    { id: "gyro_error", message: "자이로드롭입니다." },
    { id: "ferris_error", message: "대관람차입니다." },
    { id: "office_error", message: "관리실입니다." },
  ];

  const ridesClick = [
    { id: "coaster", message: "롤러코스터 에러" },
    { id: "merry", message: "회전목마 에러" },
    { id: "gyro", message: "자이로드롭 에러" },
    { id: "ferris", message: "대관람차 에러" },
    { id: "office" },
  ];

  // ✅ 배열을 순회하며 각 요소에 이벤트 등록
  ridesHover.forEach((ride) => {
    const element = document.getElementById(ride.id); // id로 해당 요소 선택
    if (!element) return; // 요소가 존재하지 않으면 무시하고 건너뜀

    // ✅ 마우스를 올렸을 때 실행
    element.addEventListener("mouseenter", () => {
      if (!getIsErrorState()) return; // 오류 상태가 아니면 무시
      Message.innerText = ride.message; // 메시지 텍스트 설정
      Message.classList.remove("hidden"); // 메시지 박스 보이기
    });

    // ✅ 마우스를 벗어났을 때 실행
    element.addEventListener("mouseleave", () => {
      if (!getIsErrorState()) return; // 오류 상태가 아니면 무시
      Message.innerText = ""; // 메시지 초기화
      Message.classList.add("hidden"); // 메시지 박스 숨기기
    });
  });

  // ✅ 배열을 순회하며 각 요소에 이벤트 등록
  ridesClick.forEach((ride) => {
    const element = document.getElementById(ride.id); // id로 해당 요소 선택
    if (!element) return; // 요소가 존재하지 않으면 무시하고 건너뜀

    // ✅ 마우스를 올렸을 때 실행
    element.addEventListener("click", () => {
      if (!getIsErrorState()) return; // 오류 상태가 아니면 무시
      Message.innerText = ride.message; // 메시지 텍스트 설정
      Message.classList.remove("hidden"); // 메시지 박스 보이기

      if (ride.id === "office") {
        ErrorThemepark.classList.add("hidden");
        ErrorOffice.classList.remove("hidden");
        Message.classList.add("hidden");

        glitch()
      }
    });

    // ✅ 마우스를 벗어났을 때 실행
    element.addEventListener("mouseleave", () => {
      if (!getIsErrorState()) return; // 오류 상태가 아니면 무시
      Message.innerText = ""; // 메시지 초기화
      Message.classList.add("hidden"); // 메시지 박스 숨기기
    });
  });
}
