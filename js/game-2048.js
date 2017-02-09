//intitial state of the board
function Game2048 () {
  this.score =0;
  this.board = [
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
  ];
  this.hasWon = false;
  this.hasLost = false;

  this._generateTile();
  this._generateTile();
}
//randomly generates new positions
Game2048.prototype._generateTile = function(){
  var tileValue;
  if (Math.random() <0.8) {
    tileValue = 2;
  } else {
    tileValue = 4;
  }
  var emptyTile = this._getAvailablePositon ();


if (emptyTile !==null){
  var row = emptyTile.x;
  var col = emptyTile.y;
  this.board[row][col] = tileValue;
}
};
//finding empty cells
Game2048.prototype._getAvailablePositon = function (){
  var emptyTiles = [];

    this.board.forEach(function(row, rowIndex){
      row.forEach(function (cell, colIndex) {
        if (cell===null) {
          emptyTiles.push({x: rowIndex, y: colIndex});

        }
    });
  });
if (emptyTiles.length ===0) {
  return null;
}

  var randomIndex = Math.floor(Math.random()* emptyTiles.length);
  return emptyTiles[randomIndex];
};

Game2048.prototype._renderBoard =function(){
  this.board.forEach(function(row) {
    console.log(row);
  });
};
