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
  var emptyTile = this._getAvailablePosition ();


if (emptyTile !==null){
  var row = emptyTile.x;
  var col = emptyTile.y;
  this.board[row][col] = tileValue;
}
};
//finding empty cells
Game2048.prototype._getAvailablePosition = function (){
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
  console.log('Current Score:' + this.score);
};
Game2048.prototype._moveLeft=function(){

        var updatedBoard = [];
        var theGame = this;

    //1 remove empties from row
  this.board.forEach(function(row){
    var newRow = [];
    row.forEach(function (cell) {
      if (cell !== null){
        newRow.push(cell);
      }
    });

    //2 merge tiles in row that are together and the same number
    for (var i = 0; i < newRow.length; i += 1) {
      if(newRow[i]===newRow[i+ 1]) {
        newRow[i] += 2;
        newRow[i+1] = null;
        theGame._updateScore(newRow[i]);
      }
    }
    //remove empties again in new array
    var moved = [];
    newRow.forEach(function (cell) {
      if (cell !== null){
        moved.push(cell);
      }
    });

    if (moved.length !== row.length) {
          theGame.boardHasChanged = true;
        }

    //push() nulls until row has length 4 again
    while (moved.length <4) {
      moved.push(null);
    }
    updatedBoard.push(moved);
  });
    this.board = updatedBoard;
  };

//move right function
  Game2048.prototype._moveRight = function () {
    var updatedBoard = [];
    var theGame = this;

    this.board.forEach(function (row) {
      // 1. Remove empties from row
      var newRow = [];

      row.forEach(function (cell) {
        if (cell !== null) {
          newRow.push(cell);
        }
      });

      // 2. Merge tiles in row that are together and the same number
      for (var i = (newRow.length - 1); i >= 0; i -= 1) {
        if (newRow[i] === newRow[i - 1]) {
          newRow[i] *= 2;
          newRow[i - 1] = null;

          theGame._updateScore(newRow[i]);

        }
      }

      // 3. Remove new empties in the middle
      //     e.g. when step #2 turns [8, 8, 4] into [16, null, 4]
      //          we want to end up with [16, 4]
      var moved = [];

      newRow.forEach(function (cell) {
        if (cell !== null) {
          moved.push(cell);
        }
      });

      if (moved.length !== row.length) {
            theGame.boardHasChanged = true;
          }

      // 4. push() nulls until row has length 4 again
      while (moved.length < 4) {
        moved.unshift(null);
      }

      updatedBoard.push(moved);
    });

    this.board = updatedBoard;
  };

  Game2048.prototype._transposeMatrix = function () {
  for (var row = 0; row < this.board.length; row++) {
    for (var column = row+1; column < this.board.length; column++) {
      var temp = this.board[row][column];
      this.board[row][column] = this.board[column][row];
      this.board[column][row] = temp;
    }
  }
};

Game2048.prototype._moveUp = function () {
        this._transposeMatrix();
        var boardChanged = this._moveLeft();
        this._transposeMatrix();
        return boardChanged;
      };

Game2048.prototype._moveDown = function () {
  this._transposeMatrix();
  var boardChanged = this._moveRight();
  this._transposeMatrix();
  return boardChanged;
};



Game2048.prototype._updateScore = function(points) {
  ion.sound.play("tap");
  this.score += points;
  if (points===2048)
    {this.hasWon=true;
  }
  Game2048.prototype.isGameLost = function (){
    if (this._getAvailablePosition() !== null) {
      return;
    }
  };
};
Game2048.prototype.move = function (direction) {
  ion.sound.play("snap");

  // if (this.hasWon || this.hasLost) {
    switch (direction) {
      case "up":    boardChanged = this._moveUp();    break;
      case "down":  boardChanged = this._moveDown();  break;
      case "left":  boardChanged = this._moveLeft();  break;
      case "right": boardChanged = this._moveRight(); break;
    }

    if (this.boardHasChanged) {
      this._generateTile();
      this._isGameLost();
      this.boardHasChanged = false;
    }
  // }
};
Game2048.prototype._isGameLost = function () {
  if (this._getAvailablePosition()){
    return;
  }
  var that = this;


  this.board.forEach(function (row, rowIndex) {
    row.forEach(function (cell, cellIndex) {
      var current = that.board[rowIndex][cellIndex];
      var top, bottom, left, right;

      if (that.board[rowIndex][cellIndex - 1]) {
        left  = that.board[rowIndex][cellIndex - 1];
      }
      if (theGame.board[rowIndex][cellIndex + 1]) {
        right = that.board[rowIndex][cellIndex + 1];
      }
      if (theGame.board[rowIndex - 1]) {
        top    = that.board[rowIndex - 1][cellIndex];
      }
      if (theGame.board[rowIndex + 1]) {
        bottom = that.board[rowIndex + 1][cellIndex];
      }

      if (current === top || current === bottom || current === left || current === right)
        theGame.hasLost = true;
    });
  });

  this.lost = isLost;
};
