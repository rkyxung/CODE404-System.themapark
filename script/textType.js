export function textType(messages, targetSystem, onComplete) {

  // Chat gpt의 도움을 받은 부분입니다.
  const system = typeof targetSystem === "string" ?
    document.querySelector(targetSystem) // targetSystem이 문자열이면
    :
    targetSystem; // 문자열이 아니면 (즉, DOM 요소면) 그대로 사용

  // const system = document.querySelector(".SystemMessage");

  let dotAnimation = null; // 점 애니메이션 변수. 일단 비워둠.

  // 오디오 변수
  const typingAudio = new Audio("sounds/keyboardType.mp3"); // 오디오 경로 설정
  typingAudio.volume = 1; // 볼륨 설정 (0.0 ~ 1.0)

  const dotTypingAudio = new Audio("sounds/dotTyping.mp3"); // 점 타이핑 사운드
  dotTypingAudio.volume = 0.6; // 볼륨 설정 (0.0 ~ 1.0)


  //점 애니메이션 시작 
  function startDot(txt) {
    let dotCount = 0;
    dotAnimation = setInterval(() => {
      dotCount = (dotCount + 1) % 4 //점 3개
      dotTypingAudio.play(); // 점 타이핑 사운드 재생
      const dots = ".".repeat(dotCount); //점 반복 ./../...
      //.split()은 문자열을 자름/ 문자열 -> 배열 / 각 줄 출력
      const lines = system.textContent.split('\n');
      lines[lines.length - 1] = txt + dots;
      //.join()은 문자열을 이어붙임/ 문자열 -> 배열
      system.textContent = lines.join('\n');
    }, 500);
  }

  //점 애니메이션 중단
  function stopDot() {
    clearInterval(dotAnimation);
    dotAnimation = null;
    dotTypingAudio.pause(); // 점 타이핑 사운드 일시 정지
  }

  //타이핑 함수
  function typing(txt, index = 0, speed = 50, callback) {
    if (index < txt.length) {
      system.textContent += txt[index]; // 한 글자씩 출력

      // 두글자에 한 번 오디오
      if (index % 4 === 0) {
        typingAudio.currentTime = 0; // 오디오 재생 위치를 처음으로 초기화
        typingAudio.play(); // 오디오 재생
      }


      setTimeout(() => {
        typing(txt, index + 1, speed, callback);
      }, speed);
    } else {
      system.textContent += '\n';
      //callback이 함수면 다음줄 출력력
      if (typeof callback === 'function') {
        callback();
      }
    }
  }

  //메시지 출력 시작
  system.textContent = ""
  let i = 0;

  function next() {
    if (i < messages.length) {
      const {
        text,
        isDot
      } = messages[i];

      if (isDot) {
        system.textContent += text;
        startDot(text);

        setTimeout(() => {
          stopDot();
          system.textContent += "\n";
          i++;
          setTimeout(next, 600);
        }, 3500);
      } else {
        typing(text, 0, 40, () => {
          i++;
          setTimeout(next, 600);
        });
      }
    } else {

      if (typeof onComplete === 'function') {
        onComplete();
      }
    }
  }

  next();
}