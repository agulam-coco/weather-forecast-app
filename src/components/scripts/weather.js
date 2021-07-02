setTimeout(function () {
  document
    .getElementById("input-field")
    .addEventListener("keyup", function (event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementById("search-button").click();
      }
    });
}, 1000);
