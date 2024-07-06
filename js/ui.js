"use strict";
let currentCat = "";
class Game {
  constructor(obj) {
    this.developer = obj.developer;
    this.shortDescription = obj.short_description
      .split(" ")
      .slice(0, 9)
      .join(" ");
    this.img = obj.thumbnail;
    this.name = obj.title;
    this.id = obj.id;
    this.genre = obj.genre;
    this.platform = obj.platform;
  }
}

class UI {
  constructor() {
    this.categories = {
      mmorpg: [],
      shooter: [],
      sailing: [],
      permadeath: [],
      superhero: [],
      pixel: [],
    };
    this.options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "4cf065bc63msh74f5c79a5032ce1p10a836jsn6a136c21faa9",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
  }

  showSpinner = function () {
    $(".bg-spinner").removeClass("d-none");
    $("body").css("overflow", "hidden");
  };

  hideSpinner = function () {
    $(".bg-spinner").addClass("d-none");
    $("body").css("overflow", "visible");
  };

  getGames = function (category) {
    let x = this;
    this.showSpinner();
    fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      this.options
    )
      .then((res) => res.json())
      .then(function (data) {
        data.forEach(function (ele) {
          x.categories[category].push(new Game(ele));
        });
        currentCat = `${category}`;
        x.renderGames(x.categories[category]);
        x.hideSpinner();
        window.scrollTo(0, 0);
      });
  };

  renderGames = function (arr, cond = "") {
    let box = ``;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name.toLowerCase().includes(cond)) {
        box += ` <div class="col-md-3 p-3 rounded position-relative"  onclick="details.getDetails(${arr[i].id})">
          <div
            class="position-absolute top-0 bottom-0 start-0 end-0 overlay"
          ></div>
          <img
            src="${arr[i].img}"
            class="w-100 rounded"
          />
          <div class="d-flex justify-content-between py-2">
            <span class="text-white">${arr[i].name}</span>
            <span class="badge bg-primary">Free</span>
          </div>
          <p class="text-center game-description">
           ${arr[i].shortDescription}
          </p>
          <div class="d-flex justify-content-between pt-2 card-footer">
            <span class="badge bg-dark">category</span>
            <span class="badge bg-dark">Platform</span>
          </div>
        </div>`;
      }
    }
    $("#cards-container").html(box);
  };

  switchGames = function () {
    $(".nav-link").removeClass("active");
    $(this).addClass("active");
    getGames($(this).attr("id"));
  };
}
