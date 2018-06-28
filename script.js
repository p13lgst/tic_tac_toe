let userStarts = true;
let move = 0;
let ended = false;
let wins = 0;
let draws = 0;
let loses = 0;
let winner = "";
let computer = "";
let player = "";
let board = {
    1:"", 2:"", 3:"",
    4:"", 5:"", 6:"",
    7:"", 8:"", 9:""
}

let userTurn = true;

const computerDelay = 600;

const winPatterns = [
    [1, 2, 3],
    [1, 5, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 5, 7],
    [3, 6, 9],
    [4, 5, 6],
    [7, 8, 9]
]

let avaliable = [1,2,3,4,5,6,7,8,9];

$("document").ready(function() {
    console.log("hi")
    $(".board-item").on("click", function() {
        if ($(this).html() == "" && userTurn && !ended) {
            userTurn = false;
            move++;
            $(this).html(player);
            let id = $(this).attr('id');
            board[id] = player;
            ended = checkEnd(id);
            avaliable = avaliable.filter((x) => x != id);
            if (ended) {
                markWinPattern(...ended);
                end('win');
            } else if (move == 9) {
                end('draw');
            } else {
                setTimeout(computerMove, computerDelay);
            }
        };
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
                return [1,2,3];
            } else if (board[5] != "" && board[9] != "" && board[1] == board[5] && board[1] == board[9]) {
                return [1,5,9];
            } else if (board[4] != "" && board[7] != "" && board[1] == board[4] && board[1] == board[7]) {
                return [1,4,7];
            } else {
                return false;
            }
        case '2':
            if (board[1] != "" && board[3] != "" && board[1] == board[2] && board[2] == board[3]){
                return [1,2,3];
            } else if (board[5] != "" && board[8] != "" && board[2] == board[5] && board[2] == board[8]) {
                return [2,5,8];
            } else {
                return false;
            }
        case '3':
            if (board[1] != "" && board[2] != "" && board[1] == board[3] && board[2] == board[3]) {
                return [1,2,3];
            } else if (board[5] != "" && board[7] != "" && board[3] == board[5] && board[3] == board[7]) {
                return [3,5,7];
            } else if (board[6] != "" && board[9] != "" && board[3] == board[6] && board[3] == board[9]) {
                return [3,6,9];
            } else {
                return false;
            }
        case '4':
            if (board[1] != "" && board[7] != "" && board[1] == board[4] && board[4] == board[7]) {
                return [1,4,7];
            } else if (board[5] != "" && board[6] != "" && board[4] == board[5] && board[4] == board[6]) {
                return [4,5,6];
            } else {
                return false;
            }
        case '5':
            if (board[1] != "" && board[9] != "" && board[1] == board[5] && board[5] == board[9]) {
                return [1,5,9];
            } else if (board[3] != "" && board[7] != "" && board[3] == board[5] && board[5] == board[7]) {
                return [3,5,7];
            } else if (board[4] != "" && board[6] != "" && board[4] == board[5] && board[5] == board[6]) {
                return [4,5,6];
            } else if (board[2] != "" && board[8] != "" && board[2] == board[5] && board[5] == board[8]) {
                return [2,5,8];
            } else {
                return false;
            }
        case '6':
            if (board[3] != "" && board[9] != "" && board[3] == board[6] && board[6] == board[9]) {
                return [3,6,9];
            } else if (board[4] != "" && board[5] != "" && board[4] == board[6] && board[5] == board[6]) {
                return [4,5,6];
            } else {
                return false;
            }
        case '7':
            if (board[1] != "" && board[4] != "" && board[1] == board[7] && board[4] == board[7]) {
                return [1,4,7];
            } else if (board[3] != "" && board[5] != "" && board[3] == board[7] && board[5] == board[7]) {
                return [3,5,7];
            } else if (board[8] != "" && board[9] != "" && board[7] == board[8] && board[7] == board[9]) {
                return [7,8,9];
            } else {
                return false;
            }
        case '8':
            if (board[2] != "" && board[5] != "" && board[2] == board[8] && board[5] == board[8]) {
                return [2,5,8];
            } else if (board[7] != "" && board[9] != "" && board[7] == board[8] && board[8] == board[9]) {
                return [7,8,9];
            } else {
                return false;
            }
        case '9':
            if (board[3] != "" && board[6] != "" && board[3] == board[9] && board[6] == board[9]) {
                return [3,6,9];
            } else if (board[1] != "" && board[5] != "" && board[1] == board[9] && board[5] == board[9]) {
                return [1,5,9];
            } else if (board[7] != "" && board[8] != "" && board[7] == board[9] && board[8] == board[9]) {
                return [7,8,9];
            } else {
                return false;
            }
    }
}

function computerMove() {
    move++;
    ended = tryToWin();
    if (ended){
        markWinPattern(...ended);
        end('lose');
        return
    }
    if (!tryToBlock()) {
        let id = avaliable.indexOf(5) != -1 ? 5 : avaliable[Math.floor(Math.random() * avaliable.length)];
        $("#"+id).html(computer);
        board[id] = computer;
        avaliable = avaliable.filter((x) => x != id);
        ended = checkEnd(id);
        if (ended) {
            markWinPattern(...ended);
            end('lose');
            return
        }
    }
    if (move == 9 && !ended) {
        end('draw');
        return;
    }
    userTurn = true;
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

        userStarts = userStarts ? false : true;
        userTurn = userStarts;

        if (!userTurn) {
            setTimeout(computerMove, computerDelay);
        }

        console.log(userTurn)

    }, 1700);
}

function markWinPattern(a,b,c) {
    $(`#${a}`).css("background-color", "#888");
    $(`#${b}`).css("background-color", "#888");
    $(`#${c}`).css("background-color", "#888");
}


function resetBoard() {
    $(".board-item").each(function() {
        $(this).css("background-color", "white").html("");
        board[$(this).attr('id')] = "";
    });
}

function tryToWin() {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (board[a] == computer && board[b] == computer && board[c] == "") {
            board[c] = computer;
            $(`#${c}`).html(computer);
            return [a,b,c];
        } else if (board[a] == computer && board[c] == computer && board[b] == "") {
            board[b] = computer;
            $(`#${b}`).html(computer);
            end('lose');
            return [a,b,c];
        }    else if (board[b] == computer && board[c] == computer && board[a] == "") {
            board[a] = computer;
            $(`#${a}`).html(computer);
            end('lose');
            return [a,b,c];
        }
    }
    return false;
}

function tryToBlock() {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (board[a] == player && board[b] == player && board[c] == "") {
            board[c] = computer;
            $(`#${c}`).html(computer);
            avaliable = avaliable.filter((x) => x != c);
        return true;
    } else if (board[a] == player && board[c] == player && board[b] == "") {
        board[b] = computer;
        $(`#${b}`).html(computer);
        avaliable = avaliable.filter((x) => x != b);
        return true;
    }  else if (board[b] == player && board[c] == player && board[a] == "") {
        board[a] = computer;
        $(`#${a}`).html(computer);
        avaliable = avaliable.filter((x) => x != a);
        return true;
    }
  }
}
