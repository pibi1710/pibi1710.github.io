// src/scripts/wip-filters.js
(function() {
  var weekItems = Array.prototype.slice.call(document.querySelectorAll(".week-item"));
  var weeks = weekItems.map(function(el) {
    return {
      el,
      year: el.dataset.year || "",
      month: el.dataset.month || "",
      days: el.dataset.days || ""
    };
  });
  var state = { year: null, month: null, days: null };
  var yearsBox = document.querySelector(".filter-years");
  var monthsBox = document.querySelector(".filter-months");
  var daysBox = document.querySelector(".filter-days");
  function matches(w, ignore) {
    if (state.year && ignore !== "year" && w.year !== state.year) return false;
    if (state.month && ignore !== "month" && w.month !== state.month) return false;
    if (state.days && ignore !== "days" && w.days !== state.days) return false;
    return true;
  }
  function syncActive(box, value) {
    if (!box) return;
    var btns = box.querySelectorAll(".filter-btn");
    btns.forEach(function(btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-value") === value);
    });
  }
  function renderDays() {
    if (!daysBox) return;
    daysBox.innerHTML = "";
    var seen = {};
    weeks.forEach(function(w) {
      if (!matches(w, "days")) return;
      if (seen[w.days]) return;
      seen[w.days] = true;
      var a = document.createElement("a");
      a.href = "#";
      a.className = "filter-btn";
      a.setAttribute("data-value", w.days);
      a.textContent = w.days;
      a.addEventListener("click", function(ev) {
        ev.preventDefault();
        state.days = state.days === w.days ? null : w.days;
        apply();
      });
      daysBox.appendChild(a);
    });
  }
  function markEmpty(box, key) {
    if (!box) return;
    box.querySelectorAll(".filter-btn").forEach(function(btn) {
      var value = btn.getAttribute("data-value");
      var has = weeks.some(function(w) {
        return w[key] === value && matches(w, key);
      });
      btn.classList.toggle("is-empty", !has);
    });
  }
  function apply() {
    weeks.forEach(function(w) {
      w.el.style.display = matches(w) ? "" : "none";
    });
    renderDays();
    syncActive(yearsBox, state.year);
    syncActive(monthsBox, state.month);
    syncActive(daysBox, state.days);
    markEmpty(yearsBox, "year");
    markEmpty(monthsBox, "month");
    if (monthsBox) monthsBox.style.display = state.year ? "" : "none";
    if (daysBox) daysBox.style.display = state.month ? "" : "none";
  }
  function wireStaticButtons(box, key) {
    if (!box) return;
    box.querySelectorAll(".filter-btn").forEach(function(btn) {
      btn.addEventListener("click", function(ev) {
        ev.preventDefault();
        var value = btn.getAttribute("data-value");
        state[key] = state[key] === value ? null : value;
        if (key === "year") {
          state.month = null;
          state.days = null;
        }
        if (key === "month") {
          state.days = null;
        }
        apply();
      });
    });
  }
  wireStaticButtons(yearsBox, "year");
  wireStaticButtons(monthsBox, "month");
  apply();
})();
