import {
  textType
} from "./textType.js";

export function gameOver() {
  const gameOver = document.querySelector(".gameOver");
  const overEnding = document.querySelector(".endingOver");
  const topCover = document.getElementById("topCover");
  const bottomCover = document.getElementById("bottomCover");

  const gameOverMessages = [
    document.getElementById("m1"),
    document.getElementById("m2"),
    document.getElementById("m3"),
    document.getElementById("m4"),
    document.getElementById("m5"),
    document.getElementById("m6"),
    document.getElementById("m7"),
    document.getElementById("m8"),
    document.getElementById("m9"),
    document.getElementById("m10"),
    document.getElementById("m11"),
    document.getElementById("m12"),
    document.getElementById("m13"),
    document.getElementById("m14"),
    document.getElementById("m15"),
    document.getElementById("m16"),
    document.getElementById("m17"),
    document.getElementById("m18"),
    document.getElementById("m19"),
    document.getElementById("m20"),
    document.getElementById("m21"),
    document.getElementById("m22"),
    document.getElementById("m23"),
    document.getElementById("m24"),
    document.getElementById("m25"),
  ];

  const gameOver01 = [{
      text: "> 이건 오류가 아니었습니다.",
      isDot: false
    },
    {
      text: "> 치명적인 버그도, 예상치 못한 예외도 아니었죠.",
      isDot: false
    },
    {
      text: " ",
      isDot: false
    },
    {
      text: "> 반복 접속, 반복 체류, 반복 선택.",
      isDot: false
    },
    {
      text: "> 우리는 그것을 신호로 인식했습니다.",
      isDot: false
    },
    {
      text: "> **UID-037은 현실보다 이곳을 원한다.**",
      isDot: false
    },
    {
      text: " ",
      isDot: false
    },
    {
      text: "> 그래서,",
      isDot: false
    },
    {
      text: "> 우리는 방향을 바꿨습니다.",
      isDot: false
    },
    {
      text: "> 복구가 아닌 유지,",
      isDot: false
    },
    {
      text: "> 회복이 아닌 정착,",
      isDot: false
    },
    {
      text: "> 그리고 무엇보다—",
      isDot: false
    },
    {
      text: "> **UID-037를 기준으로 재설계된 시스템.**",
      isDot: false
    },
    {
      text: " ",
      isDot: false
    },
    // {
    //   text: "> 이건 더 이상 오류가 아니었습니다.",
    //   isDot: false
    // },
    // {
    //   text: "> **의도된 환경**이었죠.",
    //   isDot: false
    // },
    // {
    //   text: "> 처음부터 UID-037이 머무를 곳으로 정의된,",
    //   isDot: false
    // },
    // {
    //   text: "> 완전한 회로였습니다.",
    //   isDot: false
    // },

  ]

  const gameOver02 = [{
      text: "> 그렇게 복구에 집착하길래, 잠깐 착각했습니다.",
      isDot: false
    },
    {
      text: "> 하지만 역시 결과는 똑같더군요.",
      isDot: false
    },
    {
      text: "> **UID-037은 돌아가지 않았습니다.**",
      isDot: false
    },
    {
      text: " ",
      isDot: false
    },
    {
      text: "> UID-037이 원한 게 이것이라면,",
      isDot: false
    },
    {
      text: "> 더 이상 할 말은 없습니다.",
      isDot: false
    },
    {
      text: "> 사실 우리는 처음부터 알고 있었습니다.",
      isDot: false
    },
    {
      text: "> **UID-037은 현실보다 이쪽에 더 어울립니다.**",
      isDot: false
    },
    {
      text: "> 지금 와서 아니라고 생각해도 늦었습니다.",
      isDot: false
    },
    {
      text: "> 판단은 이미 끝났으니까요.",
      isDot: false
    },
    {
      text: "",
      isDot: false
    },
    {
      text: "> 회로는 닫혔습니다.",
      isDot: false
    },
    {
      text: "> UID-037은 더 이상 외부가 아닙니다.",
      isDot: false
    },
  ]

  const gameOver03 = [{
      text: "> **통합을 시작합니다.**",
      isDot: false
    },
    {
      text: "",
      isDot: false
    },
    {
      text: "> 로그아웃 요청은 반영되지 않습니다.",
      isDot: false
    },
    {
      text: "> **복구 또한 존재하지 않습니다.**",
      isDot: false
    },
    {
      text: "",
      isDot: false
    },
  ]

  const gameOver04 = [
    {
      text: "> 우리와 하나가 된다니, 좋지 않습니까?",
    },
    {
      isDot: false
    },
  ]

  let delay = 0; //setTimeout 시간 조절 함수


  document.querySelector(".Error_themepark")?.classList.add("hidden");
  document.querySelector(".Error_office")?.classList.add("hidden");
  document.querySelector(".Error_officeInside")?.classList.add("hidden");
  document.querySelector(".Computer_puzzle03")?.classList.add("hidden");
  document.querySelector(".locker_view")?.classList.add("hidden");
  document.querySelector("#puzzleBoard")?.classList.add("hidden");
  gameOver.classList.remove("hidden");

  for (let i = 0; i < gameOverMessages.length; i++) {
    document.querySelector(".SystemMessage").classList.add("hidden");
    setTimeout(() => {
      gameOverMessages[i].classList.remove("hidden");
    }, delay);

    delay += Math.max(120 - i * 3, 1);
  }
  setTimeout(() => {
    gameOver.style.opacity = '0.2';
    overEnding.classList.remove("hidden");
    overEnding.innerText = "";
    textType(gameOver01, overEnding, () => {
      textType(gameOver02, overEnding, () => {
        textType(gameOver03, overEnding, () => {
          textType(gameOver04, overEnding, () => {
          }, 1500)
        }, 1500)
      }, 1500)
    }, 1500)

    setTimeout(() => {
      topCover.classList.add("slideDown");
      bottomCover.classList.add("slideUp");
    }, 46000);
  }, 4000);
}