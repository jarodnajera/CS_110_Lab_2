var gameboard = ['','','',
                '','','',
                '','',''];
var p1_score = 0;
var p2_score = 0;
var p1_turn = true;
var p2_turn = false;
var game_won = false;

function new_game() {
    gameboard = ['','','',
                 '','','',
                 '','',''];
    
    const board = document.querySelectorAll(".xo");
    board.forEach((square) => {
       square.innerHTML = ''; 
    });
    p1_turn = true;
    p2_turn = false;
    document.querySelector(".display_player").innerHTML = 'X';
    game_won = false;
}

function handle_click(){
    if(!game_won) {
        if(p1_turn) {
            event.target.querySelector(".xo").innerHTML = 'X';
            p1_turn = false;
            p2_turn = true;
            document.querySelector(".display_player").innerHTML = 'O';
            gameboard[Number(event.target.id)] = 'X';
            check_board();
            // console.log(gameboard);
            // console.log(game_won);
        }
        else {
            event.target.querySelector(".xo").innerHTML = 'O';
            p1_turn = true;
            p2_turn = false;
            document.querySelector(".display_player").innerHTML = 'X';
            gameboard[Number(event.target.id)] = 'O';
            check_board();
            // console.log(gameboard);
            // console.log(game_won);
        }
    }
}

function reset_game() {
    gameboard = ['','','',
                 '','','',
                 '','',''];
                 
    const board = document.querySelectorAll(".xo");
    board.forEach((square) => {
    square.innerHTML = ''; 
    });

    p1_score = 0;
    p2_score = 0;
    p1_turn = true;
    p2_turn = false;
    game_won = false;
    document.querySelector(".display_player").innerHTML = 'X';
    document.getElementById("x-score").innerHTML = '0';
    document.getElementById("o-score").innerHTML = '0';
    document.getElementById("winner").innerHTML = '';
}

function check_board() {
    if(gameboard[0] == gameboard[1] && gameboard[1] == gameboard[2] && gameboard[0] != '') {
        game_won = true;
    }
    if(gameboard[3] == gameboard[4] && gameboard[4] == gameboard[5] && gameboard[3] != '') {
        game_won = true;
    }
    if(gameboard[6] == gameboard[7] && gameboard[7] == gameboard[8] && gameboard[6] != '') {
        game_won = true;
    }
    if(gameboard[0] == gameboard[3] && gameboard[3] == gameboard[6] && gameboard[0] != '') {
        game_won = true;
    }
    if(gameboard[1] == gameboard[4] && gameboard[4] == gameboard[7] && gameboard[1] != '') {
        game_won = true;
    }
    if(gameboard[2] == gameboard[5] && gameboard[5] == gameboard[8] && gameboard[2] != '') {
        game_won = true;
    }
    if(gameboard[0] == gameboard[4] && gameboard[4] == gameboard[8] && gameboard[0] != '') {
        game_won = true;
    }
    if(gameboard[2] == gameboard[4] && gameboard[4] == gameboard[6] && gameboard[2] != '') {
        game_won = true;
    }

    // X won
    if(game_won && p2_turn) {
        p1_score += 1;
        document.getElementById("x-score").innerHTML = '' + p1_score;
        setTimeout(function(){alert('X won this game!')}, 200);
    }

    // O won
    if(game_won && p1_turn) {
        p2_score += 1;
        document.getElementById("o-score").innerHTML = '' + p2_score;
        setTimeout(function(){alert('O won this game!')}, 200);
    }
}