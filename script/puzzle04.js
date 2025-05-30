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


export function puzzle04(onComplete) {
  const board = document.getElementById("puzzleBoard");
  const Message = document.querySelector(".SystemIntro");
  const errorMessage = document.querySelector(".SystemMessage");

  const pieceData = [
      {src: "pz1", w: 12.5, h: 25, x: 0, y: 0},
      {src: "pz2", w: 14.7, h: 28.8, x: 10.3, y: 0},
      {src: "pz3", w: 16.9, h: 25, x: 22.8, y: 0},
      {src: "pz4", w: 14.7, h: 28.9, x: 37.5, y: 0},
      {src: "pz5", w: 12.5, h: 25, x: 50, y: 0},
      {src: "pz6", w: 16.9, h: 28.9, x: 60.3, y: 0},
      {src: "pz7", w: 12.5, h: 28.9, x: 75, y: 0},
      {src: "pz8", w: 14.7, h: 28.9, x: 85.3, y: 0},
      {src: "pz9", w: 14.7, h: 32.9, x: 0, y: 21.0},
      {src: "pz10", w: 12.5, h: 28.9, x: 12.5, y: 25},
      {src: "pz11", w: 14.7, h: 29.0, x: 22.8, y: 21.0},
      {src: "pz12", w: 14.7, h: 25.0, x: 35.3, y: 25.0},
      {src: "pz13", w: 14.7, h: 29.0, x: 47.8, y: 21.1},
      {src: "pz14", w: 14.7, h: 28.9, x: 60.3, y: 25},
      {src: "pz15", w: 16.9, h: 28.9, x: 72.8, y: 25},
      {src: "pz16", w: 12.5, h: 28.9, x: 87.5, y: 25},
      {src: "pz17", w: 12.5, h: 25, x: 0, y: 50},
      {src: "pz18", w: 16.9, h: 25, x: 10.3, y: 50},
      {src: "pz19", w: 14.7, h: 32.9, x: 25, y: 46},
      {src: "pz20", w: 14.7, h: 29, x: 37.5, y: 46},
      {src: "pz21", w: 12.5, h: 32.9, x: 50, y: 46},
      {src: "pz22", w: 14.7, h: 25, x: 60.3, y: 50},
      {src: "pz23", w: 14.7, h: 28.9, x: 72.8, y: 50},
      {src: "pz24", w: 14.7, h: 25, x: 85.3, y: 50},
      {src: "pz25", w: 12.5, h: 28.9, x: 0, y: 71.1},
      {src: "pz26", w: 14.7, h: 28.9, x: 10.3, y: 71.1},
      {src: "pz27", w: 16.9, h: 24.9, x: 22.8, y: 75.1},
      {src: "pz28", w: 14.7, h: 28.9, x: 37.5, y: 71.1},
      {src: "pz29", w: 12.5, h: 24.9, x: 50, y: 75.1},
      {src: "pz30", w: 16.9, h: 28.9, x: 60.3, y: 71.1},
      {src: "pz31", w: 12.5, h: 24.9, x: 75, y: 75.1},
      {src: "pz32", w: 14.7, h: 28.9, x: 85.3, y: 71.1}
    ];

    let correctCount = 0;
    const totalPieces = pieceData.length;

    pieceData.forEach(piece => {
      const img = document.createElement("img");
      img.src = `img/puzzle/${piece.src}.png`;
      img.className = "piece";
      img.style.width = `${piece.w}vw`;
      img.style.height = `${piece.h}vh`;
      img.style.left = `${Math.random() * 80}vw`;
      img.style.top = `${Math.random() * 80}vh`;
      img.dataset.correctX = piece.x;
      img.dataset.correctY = piece.y;
      board.appendChild(img);
    });

    let dragging = null, offsetX = 0, offsetY = 0;

    board.addEventListener("mousedown", (e) => {
      if (!e.target.classList.contains("piece")) return;
      dragging = e.target;
      dragging.classList.add("dragging");
      const rect = dragging.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
    });

    board.addEventListener("mousemove", (e) => {
      if (!dragging) return;
      const boardRect = board.getBoundingClientRect();
      const x = ((e.clientX - boardRect.left - offsetX) / boardRect.width) * 100;
      const y = ((e.clientY - boardRect.top - offsetY) / boardRect.height) * 100;
      dragging.style.left = `${x}vw`;
      dragging.style.top = `${y}vh`;
    });

    board.addEventListener("mouseup", () => {
      if (!dragging) return;
      const curX = parseFloat(dragging.style.left);
      const curY = parseFloat(dragging.style.top);
      const correctX = parseFloat(dragging.dataset.correctX);
      const correctY = parseFloat(dragging.dataset.correctY);

      if (Math.abs(curX - correctX) < 3 && Math.abs(curY - correctY) < 3) {
        dragging.style.left = `${correctX}vw`;
        dragging.style.top = `${correctY}vh`;
        dragging.classList.add("correct");
        if (!dragging.dataset.placed) {
          correctCount++;
          dragging.dataset.placed = "true";
        }

        if (correctCount === totalPieces) {
          document.getElementById("success-message").style.display = "block";
        }
      } else {
        dragging.classList.add("shake");
        setTimeout(() => dragging.classList.remove("shake"), 100);
      }

      dragging.classList.remove("dragging");
      dragging = null;
    });
    }