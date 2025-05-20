export function textType(message, targetSystem) {

const intro = document.querySelector(".SystemIntro");
const system = document.querySelector(".SystemMessage");


let dot = null; // 점 애니메이션 변수. 일단 비워둠.

//타이핑 함수
function typing(txt, index = 0, speed = 50, callback) {
  
  if(index < txt.length) {
    setTimeout(() => {
      typing(txt, index + 1, speed, callback);
    }, speed);
  } else {
    intro.textContent += '\n';
    if(typeof callback === 'function'){
      callback();
    }
  }

  function startDot(txt) {
    let dotCount = 0;
    dotAnimation = setInterval(() => {
      dotCount = (dotCount + 1) % 4 //점 3개

    })
  }
}

}