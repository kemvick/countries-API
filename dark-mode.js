// dark mode
const mode = document.querySelector(".mode");
const page = document.querySelector(`body`);

mode.addEventListener("click", function () {
  page.classList.toggle(`dark-mode`);
  if (page.classList.contains(`dark-mode`)) {
    localStorage.setItem(`user-mode-preference`, `dark-mode`);
  } else {
    localStorage.removeItem(`user-mode-preference`);
  }
});
window.addEventListener(`DOMContentLoaded`, () => {
  const preference = localStorage.getItem(`user-mode-preference`);
  page.classList.add(preference);
});
