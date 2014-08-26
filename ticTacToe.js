(function (root) {
  var TTT = root.TTT = (root.TTT || {});

  var Game = TTT.Game = function ($rootEl) {
    this.$el = $rootEl;
    this.player = Game.marks[0];
    this.board = this.makeBoard();
  }

  Game.marks = ["blue", "green"];

  Game.prototype.diagonalWinner = function () {
    var grid = this.board;
    if (grid[0][0] === this.player && grid[1][1] === this.player && grid[2][2] === this.player){
      return true;
    }
    else if(grid[2][0] === this.player && grid[1][1] === this.player && grid[0][2] === this.player){
      return true;
    }
    return false;
  };

  Game.prototype.horizontalWinner = function () {
    var grid = this.board;
    for (var i = 0; i < 3; i++) {
      var row = grid[i];
      if (row[0] === this.player && row[1] === this.player && row[2] === this.player){
        return true;
      }
    }
    return false;
  };

  Game.prototype.makeBoard = function () {
    return _.times(3, function (i) {
      return _.times(3, function (j) {
        return null;
      });
    });
  };

  Game.prototype.switchPlayer = function () {
    if (this.player === Game.marks[0]) {
      this.player = Game.marks[1];
    } else {
      this.player = Game.marks[0];
    }
  };

  Game.prototype.verticalWinner = function ()
  {
    var grid = this.board
    for (var j = 0; j < 3; j++)
    {
      if (grid[0][j] === this.player && grid[1][j] === this.player && grid[2][j] === this.player)
      {
        return true;
      }
    }
    return false;
  }

  Game.prototype.fullBoard = function(){
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (this.board[i][j] === null) {
          return false;
        }
      }
    }
    return true;
  }

  Game.prototype.winner = function () {
    return (
      this.diagonalWinner() || this.horizontalWinner() || this.verticalWinner()
    );
  };

  Game.prototype.drawBoard = function() {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        var $box = $("<div class='box'></div>");
        $box.attr('data-row', i);
        $box.attr('data-col', j);
        this.$el.append($box);
      }
    }
  }

  Game.prototype.setUpEvents = function() {
    var that = this;
    this.$el.click('.box', function(event) {
      var $box = $(event.target);
      var row = parseInt($box.attr("data-row"));
      var col = parseInt($box.attr("data-col"));

      if(that.isValid(row, col)) {
        that.paintSquare(event);
      }
    });
  }

  Game.prototype.announceWinner = function()
  {
    alert(this.player + " is the winner! :D Please refresh the page to play again!");
  }

  Game.prototype.isValid = function(row, col)
  {
    return this.board[row][col] === null;
  }

  Game.prototype.paintSquare = function(event)
  {
    var color = this.player;
    var $box = $(event.target);
    var row = parseInt($box.attr("data-row"));
    var col = parseInt($box.attr("data-col"));
    this.board[row][col] = color;

    $box.css('background-color', color);

    if (this.winner())
    {
      this.announceWinner();
    }
    else if (this.fullBoard())
    {
      alert ("The game has ended in a draw. Please refresh the page to play again!");
    }

    this.switchPlayer();
  };

})(this);
