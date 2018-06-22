var userturn = true;
var move = 0;
var ended = false;
var wins = 0;
var draws = 0;
var loses = 0;
var winner = "";
var computer = "";
var player = "";
var board = {
    1:"", 2:"", 3:"",
    4:"", 5:"", 6:"",
    7:"", 8:"", 9:""
}

var avaliable = [1,2,3,4,5,6,7,8,9];

$("document").ready(function() {
  console.log("hi")
  $(".board-item").on("click", function() {
      if ($(this).html() == "" && !ended) {
          move++;
          $(this).html(player);
          var id = $(this).attr('id');
          board[id] = player;
          ended = checkEnd(id);
          avaliable = avaliable.filter(function(a){
              return a != id;
          });
          if (ended) {
              end('win');
          } else if (move == 9) {
              end('draw');
          } else {
              computerMove();
          }
      }
  });

  $(".choice").on('click', function(){
      player = $(this).html();
      if (player == "X") {
          computer = "O";
      } else {
          computer = "X";
      }
      $("#choose").hide();
      $("#game").fadeIn();
  });
});

function checkEnd(id) {
    switch (id) {
        case '1':
            if (board[2] != "" && board[3] != "" && board[1] == board[2] && board[1] == board[3]) {
                markWinPattern(1,2,3);
                return true;
            } else if (board[5] != "" && board[9] != "" && board[1] == board[5] && board[1] == board[9]) {
                markWinPattern(1,5,9);
                return true;
            } else if (board[4] != "" && board[7] != "" && board[1] == board[4] && board[1] == board[7]) {
                markWinPattern(1,4,7);
                return true;
            } else {
                return false;
            }
        case '2':
            if (board[1] != "" && board[3] != "" && board[1] == board[2] && board[2] == board[3]){
                markWinPattern(1,2,3);
                return true;
            } else if (board[5] != "" && board[8] != "" && board[2] == board[5] && board[2] == board[8]) {
                markWinPattern(2,5,8);
                return true;
            } else {
                return false;
            }
        case '3':
            if (board[1] != "" && board[2] != "" && board[1] == board[3] && board[2] == board[3]) {
                markWinPattern(1,2,3);
                return true;
            } else if (board[5] != "" && board[7] != "" && board[3] == board[5] && board[3] == board[7]) {
                markWinPattern(3,5,7);
                return true;
            } else if (board[6] != "" && board[9] != "" && board[3] == board[6] && board[3] == board[9]) {
                markWinPattern(3,6,9);
                return true;
            } else {
                return false;
            }
        case '4':
            if (board[1] != "" && board[7] != "" && board[1] == board[4] && board[4] == board[7]) {
                markWinPattern(1,4,7);
                return true;
            } else if (board[5] != "" && board[6] != "" && board[4] == board[5] && board[4] == board[6]) {
                markWinPattern(4,5,6);
                return true;
            } else {
                return false;
            }
        case '5':
            if (board[1] != "" && board[9] != "" && board[1] == board[5] && board[5] == board[9]) {
                markWinPattern(1,5,9);
                return true;
            } else if (board[3] != "" && board[7] != "" && board[3] == board[5] && board[5] == board[7]) {
                markWinPattern(3,5,7);
                return true;
            } else if (board[4] != "" && board[6] != "" && board[4] == board[5] && board[5] == board[6]) {
                markWinPattern(4,5,6);
                return true;
            } else if (board[2] != "" && board[8] != "" && board[2] == board[5] && board[5] == board[8]) {
                markWinPattern(2,5,8);
                return true;
            } else {
                return false;
            }
        case '6':
            if (board[3] != "" && board[9] != "" && board[3] == board[6] && board[6] == board[9]) {
                markWinPattern(3,6,9);
                return true;
            } else if (board[4] != "" && board[5] != "" && board[4] == board[6] && board[5] == board[6]) {
                markWinPattern(4,5,6);
                return true;
            } else {
                return false;
            }
        case '7':
            if (board[1] != "" && board[4] != "" && board[1] == board[7] && board[4] == board[7]) {
                markWinPattern(1,4,7);
                return true;
            } else if (board[3] != "" && board[5] != "" && board[3] == board[7] && board[5] == board[7]) {
                markWinPattern(3,5,7);
                return true;
            } else if (board[8] != "" && board[9] != "" && board[7] == board[8] && board[7] == board[9]) {
                markWinPattern(7,8,9);
                return true;
            } else {
                return false;
            }
        case '8':
            if (board[2] != "" && board[5] != "" && board[2] == board[8] && board[5] == board[8]) {
                markWinPattern(2,5,8);
                return true;
            } else if (board[7] != "" && board[9] != "" && board[7] == board[8] && board[8] == board[9]) {
                markWinPattern(7,8,9);
                return true;
            } else {
                return false;
            }
        case '9':
            if (board[3] != "" && board[6] != "" && board[3] == board[9] && board[6] == board[9]) {
                markWinPattern(3,6,9);
                return true;
            } else if (board[1] != "" && board[5] != "" && board[1] == board[9] && board[5] == board[9]) {
                markWinPattern(1,5,9);
                return true;
            } else if (board[7] != "" && board[8] != "" && board[7] == board[9] && board[8] == board[9]) {
                markWinPattern(7,8,9);
                return true;
            } else {
                return false;
            }
    }
}

function computerMove() {
    var moved;
    ended = tryToWin();
    if (!ended){
        moved = tryToBlock();
    }

    if (!ended && !moved) {
        var id;
        if (avaliable.indexOf(5) != -1) {
            id = '5';
        } else {
            id = avaliable[Math.floor(Math.random() * avaliable.length)].toString();
        }
        $("#"+id).html(computer);
        board[id] = computer;
        avaliable = avaliable.filter(function(a) {
            return a != id;
        });
        if (checkEnd(id)) {
            end('lose');
        }
    }

    if (move == 8 && !ended) {
        end('draw');
    } else if (move != 8){
        move++;
    }
}

function end(result) {
    setTimeout(function(){
        switch (result) {
            case 'win':
                wins++;
                $("#wins").html(wins);
                break;
            case 'lose':
                loses++;
                $("#loses").html(loses);
                break;
            case 'draw':
                draws++;
                $("#draws").html(draws);
                break;
        }
        avaliable = [1,2,3,4,5,6,7,8,9];
        ended = false;
        move = 0;
        resetBoard();

        if (userturn) {
            computerMove();
            userturn = false;
        } else {
            userturn = true;
        }

    }, 1700);
}

function markWinPattern(a,b,c) {
    $("#"+a).css("background-color", "#888");
    $("#"+b).css("background-color", "#888");
    $("#"+c).css("background-color", "#888");
}


function resetBoard() {
    $(".board-item").each(function() {
        $(this).css("background-color", "white").html("");
        board[$(this).attr('id')] = "";
    });
}

function tryToWin() {
    // 1  2  3
    if (board[1] == computer && board[2] == computer && board[3] == "") {
        board[3] = computer;
        $("#3").html(computer);
        markWinPattern(1,2,3);
        end('lose');
        return true;
    } else if (board[1] == computer && board[3] == computer && board[2] == "") {
        board[2] = computer;
        $("#2").html(computer);
        markWinPattern(1,2,3);
        end('lose');
        return true;
    }  else if (board[2] == computer && board[3] == computer && board[1] == "") {
        board[1] = computer;
        $("#1").html(computer);
        markWinPattern(1,2,3);
        end('lose');
        return true;
    }

    // 1  4  7
    else if (board[1] == computer && board[4] == computer && board[7] == "") {
        board[7] = computer;
        $("#7").html(computer);
        markWinPattern(1,4,7);
        end('lose');
        return true;
    } else if (board[1] == computer && board[7] == computer && board[4] == "") {
        board[4] = computer;
        $("#4").html(computer);
        markWinPattern(1,4,7);
        end('lose');
        return true;
    } else if (board[4] == computer && board[7] == computer && board[1] == "") {
        board[1] = computer;
        $("#1").html(computer);
        markWinPattern(1,4,7);
        end('lose');
        return true;
    }

    // 1  5  9
    else if (board[1] == computer && board[5] == computer && board[9] == "") {
        board[9] = computer;
        $("#9").html(computer);
        markWinPattern(1,5,9);
        end('lose');
        return true;
    } else if (board[1] == computer && board[9] == computer && board[5] == "") {
        board[5] = computer;
        $("#5").html(computer);
        markWinPattern(1,5,9);
        end('lose');
        return true;
    }  else if (board[5] == computer && board[9] == computer && board[1] == "") {
        board[1] = computer;
        $("#1").html(computer);
        markWinPattern(1,5,9);
        end('lose');
        return true;
    }

    // 2  5  8
    else if (board[2] == computer && board[5] == computer && board[8] == "") {
        board[8] = computer;
        $("#8").html(computer);
        markWinPattern(2,5,8);
        end('lose');
        return true;
    } else if (board[2] == computer && board[8] == computer && board[5] == "") {
        board[5] = computer;
        $("#5").html(computer);
        markWinPattern(2,5,8);
        end('lose');
        return true;
    }  else if (board[5] == computer && board[8] == computer && board[2] == "") {
        board[2] = computer;
        $("#2").html(computer);
        markWinPattern(2,5,8);
        end('lose');
        return true;
    }

    // 3  5  7
    else if (board[3] == computer && board[5] == computer && board[7] == "") {
        board[7] = computer;
        $("#7").html(computer);
        markWinPattern(3,5,7);
        end('lose');
        return true;
    } else if (board[3] == computer && board[7] == computer && board[5] == "") {
        board[5] = computer;
        $("#5").html(computer);
        markWinPattern(3,5,7);
        end('lose');
        return true;
    }  else if (board[5] == computer && board[7] == computer && board[3] == "") {
        board[3] = computer;
        $("#3").html(computer);
        markWinPattern(3,5,7);
        end('lose');
        return true;
    }

    // 3  6  9]
    else if (board[3] == computer && board[6] == computer && board[9] == "") {
        board[9] = computer;
        $("#9").html(computer);
        markWinPattern(3,6,9);
        end('lose');
        return true;
    } else if (board[3] == computer && board[9] == computer && board[6] == "") {
        board[6] = computer;
        $("#6").html(computer);
        markWinPattern(3,6,9);
        end('lose');
        return true;
    }  else if (board[6] == computer && board[9] == computer && board[3] == "") {
        board[3] = computer;
        $("#3").html(computer);
        markWinPattern(3,6,9);
        end('lose');
        return true;
    }

    // 4  5  6
    else if (board[4] == computer && board[5] == computer && board[6] == "") {
        board[6] = computer;
        $("#6").html(computer);
        markWinPattern(4,5,6);
        end('lose');
        return true;
    } else if (board[4] == computer && board[6] == computer && board[5] == "") {
        board[5] = computer;
        $("#5").html(computer);
        markWinPattern(4,5,6);
        end('lose');
        return true;
    }  else if (board[5] == computer && board[6] == computer && board[4] == "") {
        board[4] = computer;
        $("#4").html(computer);
        markWinPattern(4,5,6);
        end('lose');
        return true;
    }

    // 7  8  9
    else if (board[7] == computer && board[8] == computer && board[9] == "") {
        board[9] = computer;
        $("#9").html(computer);
        markWinPattern(7,8,9);
        end('lose');
        return true;
    } else if (board[7] == computer && board[9] == computer && board[8] == "") {
        board[8] = computer;
        $("#8").html(computer);
        markWinPattern(7,8,9);
        end('lose');
        return true;
    }  else if (board[8] == computer && board[9] == computer && board[7] == "") {
        board[7] = computer;
        $("#7").html(computer);
        markWinPattern(7,8,9);
        end('lose');
        return true;
    }

    // Not possible to win
    else {
        return false;
    }
}

function tryToBlock() {
    // 1  2  3
    if (board[1] == player && board[2] == player && board[3] == "") {
        board[3] = computer;
        $("#3").html(computer);
        avaliable = avaliable.filter(function(a){
            return a != 3;
        });
        return true;
    } else if (board[1] == player && board[3] == player && board[2] == "") {
        board[2] = computer;
        $("#2").html(computer);
        avaliable = avaliable.filter(function(a){
            return a != 2;
        });
        return true;
    }  else if (board[2] == player && board[3] == player && board[1] == "") {
        board[1] = computer;
        $("#1").html(computer);
        avaliable = avaliable.filter(function(a){
            return a != 1;
        });
        return true;
    }

    // 1  4  7
    else if (board[1] == player && board[4] == player && board[7] == "") {
        board[7] = computer;
        $("#7").html(computer);
        avaliable = avaliable.filter(function(a){
            return a != 7;
        });
        return true;
    } else if (board[1] == player && board[7] == player && board[4] == "") {
        board[4] = computer;
        $("#4").html(computer);
        avaliable = avaliable.filter(function(a){
            return a != 4;
        });
        return true;
    } else if (board[4] == player && board[7] == player && board[1] == "") {
        board[1] = computer;
        $("#1").html(computer);
        avaliable = avaliable.filter(function(a){
            return a != 1;
        });
        return true;
    }

    // 1  5  9
    else if (board[1] == player && board[5] == player && board[9] == "") {
        board[9] = computer;
        $("#9").html(computer);
        avaliable = avaliable.filter(function(a){
            return a != 9;
        });
        return true;
    } else if (board[1] == player && board[9] == player && board[5] == "") {
        board[5] = computer;
        $("#5").html(computer);
        avaliable = avaliable.filter(function(a){
            return a != 5;
        });
        return true;
    }  else if (board[5] == player && board[9] == player && board[1] == "") {
        board[1] = computer;
        $("#1").html(computer);
        avaliable = avaliable.filter(function(a){
            return a != 1;
        });
        return true;
    }

    // 2  5  8
    else if (board[2] == player && board[5] == player && board[8] == "") {
        board[8] = computer;
        $("#8").html(computer);
        avaliable = avaliable.filter(function(a){
            return a != 8;
        });
        return true;
    } else if (board[2] == player && board[8] == player && board[5] == "") {
        board[5] = computer;
        $("#5").html(computer);
        avaliable = avaliable.filter(function(a){
            return a != 5;
        });
        return true;
    }  else if (board[5] == player && board[8] == player && board[2] == "") {
        board[2] = computer;
        $("#2").html(computer);
        avaliable = avaliable.filter(function(a){
            return a != 2;
        });
        return true;
    }

    // 3  5  7
    else if (board[3] == player && board[5] == player && board[7] == "") {
        board[7] = computer;
        $("#7").html(computer);
        avaliable = avaliable.filter(function(a){
            return a != 7;
        });
        return true;
    } else if (board[3] == player && board[7] == player && board[5] == "") {
        board[5] = computer;
        $("#5").html(computer);
        avaliable = avaliable.filter(function(a){
            return a != 5;
        });
        return true;
    }  else if (board[5] == player && board[7] == player && board[3] == "") {
        board[3] = computer;
        $("#3").html(computer);
        avaliable = avaliable.filter(function(a){
            return a != 3;
        });
        return true;
    }

    // 3  6  9]
    else if (board[3] == player && board[6] == player && board[9] == "") {
        board[9] = computer;
        $("#9").html(computer);
        avaliable = avaliable.filter(function(a){
            return a != 9;
        });
        return true;
    } else if (board[3] == player && board[9] == player && board[6] == "") {
        board[6] = computer;
        $("#6").html(computer);
        avaliable = avaliable.filter(function(a){
            return a != 6;
        });
        return true;
    }  else if (board[6] == player && board[9] == player && board[3] == "") {
        board[3] = computer;
        $("#3").html(computer);
        avaliable = avaliable.filter(function(a){
            return a != 3;
        });
        return true;
    }

    // 4  5  6
    else if (board[4] == player && board[5] == player && board[6] == "") {
        board[6] = computer;
        $("#6").html(computer);
        avaliable = avaliable.filter(function(a){
            return a != 6;
        });
        return true;
    } else if (board[4] == player && board[6] == player && board[5] == "") {
        board[5] = computer;
        $("#5").html(computer);
        avaliable = avaliable.filter(function(a){
            return a != 5;
        });
        return true;
    }  else if (board[5] == player && board[6] == player && board[4] == "") {
        board[4] = computer;
        $("#4").html(computer);
        avaliable = avaliable.filter(function(a){
            return a != 4;
        });
        return true;
    }

    // 7  8  9
    else if (board[7] == player && board[8] == player && board[9] == "") {
        board[9] = computer;
        $("#9").html(computer);
        avaliable = avaliable.filter(function(a){
            return a != 9;
        });
        return true;
    } else if (board[7] == player && board[9] == player && board[8] == "") {
        board[8] = computer;
        $("#8").html(computer);
        avaliable = avaliable.filter(function(a){
            return a != 8;
        });
        return true;
    }  else if (board[8] == player && board[9] == player && board[7] == "") {
        board[7] = computer;
        $("#7").html(computer);
        avaliable = avaliable.filter(function(a){
            return a != 7;
        });
        return true;
    }

    // Nothing to block
    else {
        return false;
    }
}
