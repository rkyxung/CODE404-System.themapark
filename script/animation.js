export function animation() {
  const top = document.querySelector(".top");
  const bottom = document.querySelector(".bottom")
  
  top.classList.remove("hidden");
  bottom.classList.remove("hidden");

  top.style.transform = "translateY(100%)";
  bottom.style.transform = "translateY(-100%)";
}