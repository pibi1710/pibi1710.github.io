// src/scripts/wip-about.js
(function() {
  var link = document.querySelector(".site-about-link");
  var overlay = document.querySelector(".about-overlay");
  if (!link || !overlay) return;
  function isOpen() {
    return overlay.classList.contains("is-open");
  }
  function open() {
    overlay.classList.add("is-open");
    link.classList.add("is-active");
  }
  function close() {
    overlay.classList.remove("is-open");
    link.classList.remove("is-active");
  }
  link.addEventListener("click", function(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    if (isOpen()) close();
    else open();
  });
  document.addEventListener("click", function() {
    if (isOpen()) close();
  });
  document.addEventListener("keydown", function(ev) {
    if (ev.key === "Escape" && isOpen()) close();
  });
})();
