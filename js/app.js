console.log('app.js');

// 1. create game object
var myGlobalGame;

$(document).ready(function () {
  myGlobalGame = new Game2048();

  // 2. take the initial tiles and put them on the screen
  renderTiles();

  // 3. handle keyboard events
  $(document).keydown(moveGame);

  loadSounds();
});


function moveGame (ev) {
  var acceptableKeys = [ 37, 65, 38, 87, 39, 68, 40, 83 ];
console.log("test 1");
  if (!acceptableKeys.includes(ev.keyCode)) {

    return;
  }

  // prevent arrow key scrolling
  ev.preventDefault();

  // 4. move board in object based on keypresses (up, down, left, right)
  // move if correct keys were pressed
  switch (ev.keyCode) {
    case 37:  // left arrow

      myGlobalGame.move('left');
      break;
    case 38:  // up arrow

      myGlobalGame.move('up');
      break;
    case 39:  // right arrow

      myGlobalGame.move('right');
      break;
    case 40:  // down arrow

      myGlobalGame.move('down');
      break;
  }

  // 5. updating the screen based on new board state
  renderTiles();
}


function renderTiles () {
  $('#tile-container').empty();

  myGlobalGame.board.forEach(function (row, rowIndex) {
    row.forEach(function (cell, colIndex) {
      if (cell === null) {
        return;
      }

      // put cell on the screen
      var tileHtml = '<div class="tile tile-position-' + rowIndex + '-' + colIndex + ' val-' + cell + '"> ' + cell + ' </div>';
      $('#tile-container').append(tileHtml);
    });
  });
}

function loadSounds(){
  ion.sound({
      sounds: [{ name: "snap"}, {name: "tap"}],
      path: 'lib/soundz/sounds/',
      preload: true,
      volume: 1.0,
  });

}


// 6. win or lose (maybe)
