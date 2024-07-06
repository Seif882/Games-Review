"use strict";

class Details {
  constructor() {
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

  getDetails = function (id) {
    let x = this;
    this.showSpinner();
    let box = ``;
    fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      this.options
    )
      .then((res) => res.json())
      .then(function (data) {
        box = `<div class="col-md-4">
          <img
            src=${data.thumbnail}
            class="w-100 "
          />
          
        </div>
        <div class="col-md-8">
          <p>Title: ${data.title}</p>
          <p>Category: <span class="badge bg-primary">${data.genre}</span></p>
          <p>Platform: <span class="badge bg-primary">${data.platform}</span></p>
          <p>Publisher: <span class="badge bg-primary">${data.publisher}</span></p>
          <p>Status: <span class="badge bg-primary">${data.status}</span></p>
          <p>${data.description}</p>
          <a target="_blank" href="${data.game_url}"
            ><button type="button" class="btn btn-outline-warning text-white me-5">
              Show Game
            </button></a
          > <span class="text-center info ms-5">Press [Esc] to close</span>
        </div>`;
        $(".bg-details .row").html(box);
        $(".bg-details").removeClass("d-none");
        x.hideSpinner();
        $("#cards-container").addClass("d-none");
      });
  };
}
