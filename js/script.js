"use script";
// Home Section Logic
const ui = new UI();

$(".nav-link").click(function () {
  $(".nav-link").removeClass("active");
  $(this).addClass("active");
  ui.getGames($(this).attr("id"));
});

ui.getGames("mmorpg");

document.querySelector("#input").addEventListener("input", function () {
  ui.renderGames(ui.categories[currentCat], this.value);
});

document.addEventListener("scroll", function (e) {
  if (window.scrollY > 200) {
    $("nav").addClass("fixed-top");
    $("nav").css("opacity", "0.5");
  } else {
    $("nav").removeClass("fixed-top");
    $("nav").css("opacity", "1");
  }
});

// Details Section Logic
const details = new Details();

$("#close-btn").click(function () {
  $(".bg-details").addClass("d-none");
  $("#cards-container").removeClass("d-none");
});

$("body").keydown(function (e) {
  if (e.key === "Escape") {
    $(".bg-details").addClass("d-none");
    $("#cards-container").removeClass("d-none");
  }
});
