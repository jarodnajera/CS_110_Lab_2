var gameboard = ['','','',
                '','','',
                '','',''];
var p1_score = 0;
var p2_score = 0;
var p1_turn = true;
var p2_turn = false;
var game_won = false;
var cpu_mode = false;
var this_timer = null;
var win_sound = new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_bb630cc098.mp3?filename=short-success-sound-glockenspiel-treasure-video-game-6346.mp3');
var bruh = new Audio('https://soundboardguy.com/wp-content/uploads/2021/07/bruh-sound-effect-2.mp3');
var x_moves = [];
var o_moves = [];

// Makes a new game
function new_game() {
    clearInterval(this_timer);
    // reset gameboard
    gameboard = ['','','',
                 '','','',
                 '','',''];
    x_moves = [];
    o_moves = [];
    
    const board = document.querySelectorAll(".xo");
    board.forEach((square) => {
       square.innerHTML = '';
    });

    // reset color of squares
    for(let i = 0; i <= 8; i++) {
        document.getElementById(String(i)).style.backgroundColor = 'pink';
    }

    // reset turns, make new game
    p1_turn = true;
    p2_turn = false;
    document.querySelector(".display_player").innerHTML = 'X';
    game_won = false;

    // reset timer
    document.getElementById("timer").innerHTML = '15';
}

// Resets game
function reset_game() {
    clearInterval(this_timer);
    // clear gameboard
    gameboard = ['','','',
                 '','','',
                 '','',''];
    x_moves = [];
    o_moves = [];
                 
    const board = document.querySelectorAll(".xo");
    board.forEach((square) => {
        square.innerHTML = '';
    });

    // reset color of squares
    for(let i = 0; i <= 8; i++) {
        document.getElementById(String(i)).style.backgroundColor = 'pink';
    }

    // reset scores and turn
    p1_score = 0;
    p2_score = 0;
    p1_turn = true;
    p2_turn = false;
    game_won = false;
    document.querySelector(".display_player").innerHTML = 'X';
    document.getElementById("x-score").innerHTML = '0';
    document.getElementById("o-score").innerHTML = '0';

    // reset timer
    document.getElementById("timer").innerHTML = '15';
}

// Main game logic
function handle_click(){
    // check if game has been won
    if(!game_won) {
        // p1's turn
        clearInterval(this_timer);
        handle_timer();
        if(p1_turn) {
            // put X in clicked box and turn box color into salmon
            event.target.querySelector(".xo").innerHTML = 'X';
            document.getElementById(event.target.id).style.backgroundColor = 'salmon';
            // change who's turn it is
            p1_turn = false;
            p2_turn = true;
            document.querySelector(".display_player").innerHTML = 'O';
            // update gameboard array and check if game has been won
            gameboard[Number(event.target.id)] = 'X';
            // update x_moves array and check remove oldest move after fifth move
            x_moves.push(Number(event.target.id));
            //console.log(x_moves);
            if(x_moves.length == 5) {
                let oldest_move = x_moves[0];
                gameboard[oldest_move] = '';
                oldest_move = String(oldest_move);
                x_moves.shift();
                document.getElementById(oldest_move).style.backgroundColor = 'pink';
                document.getElementById(oldest_move).querySelector(".xo").innerHTML = '';
            }
            check_board();
            // console.log(gameboard);
            // console.log(game_won);

            // cpu mode logic
            if(cpu_mode && !game_won) {
                setTimeout(function(){
                    let empty_space = gameboard.findIndex(item => item == '');
                    gameboard[empty_space] = 'O';
                    document.getElementById(String(empty_space)).querySelector(".xo").innerHTML = 'O';
                    document.getElementById(String(empty_space)).style.backgroundColor = 'salmon';
                    p1_turn = true;
                    p2_turn = false;
                    document.querySelector(".display_player").innerHTML = 'X';
                    // update o_moves array and check remove oldest move after fifth move
                    o_moves.push(Number(event.target.id));
                    if(o_moves.length == 5) {
                        let oldest_move = o_moves[0];
                        gameboard[oldest_move] = '';
                        oldest_move = String(oldest_move);
                        o_moves.shift();
                        document.getElementById(oldest_move).style.backgroundColor = 'pink';
                        document.getElementById(oldest_move).querySelector(".xo").innerHTML = '';
                    }
                    check_board();
                    
                }, 600);

                return
            }
        }
        // p2's turn
        else {
            // put O in clicked box and turn box color into salmon
            event.target.querySelector(".xo").innerHTML = 'O';
            document.getElementById(event.target.id).style.backgroundColor = 'salmon';
            // change who's turn it is
            p1_turn = true;
            p2_turn = false;
            document.querySelector(".display_player").innerHTML = 'X';
            // update gameboard array and check if game has been won
            gameboard[Number(event.target.id)] = 'O';
            // update o_moves array and check remove oldest move after fifth move
            o_moves.push(Number(event.target.id));
            if(o_moves.length == 5) {
                let oldest_move = o_moves[0];
                gameboard[oldest_move] = '';
                oldest_move = String(oldest_move);
                o_moves.shift();
                document.getElementById(oldest_move).style.backgroundColor = 'pink';
                document.getElementById(oldest_move).querySelector(".xo").innerHTML = '';
            }
            check_board();
            // console.log(gameboard);
            // console.log(game_won);
        }
    }
}

// Helper
function check_board() {
    // win conditions
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
        setTimeout(function(){alert('X won this game!')}, 300);
        clearInterval(this_timer);
        win_sound.play();
    }

    // O won
    if(game_won && p1_turn) {
        p2_score += 1;
        document.getElementById("o-score").innerHTML = '' + p2_score;
        setTimeout(function(){alert('O won this game!')}, 300);
        clearInterval(this_timer);
        win_sound.play();
    }
}

// Helper for CPU Mode
function checkbox_click() {
    if(!cpu_mode) {
        console.log("CPU Mode activated");
        reset_game();
        cpu_mode = true;
    }
    else {
        console.log("CPU Mode de-activated");
        reset_game();
        cpu_mode = false;
    }
}

function handle_timer() {
  var sec = 15;
  document.getElementById("timer").innerHTML = sec;
  this_timer = setInterval(function() {
    document.getElementById("timer").innerHTML = sec;
    sec--;

    if (sec == -0o2) {
        bruh.play();
        alert("Time is up! Next players turn.");
        clearInterval(this_timer);
        if(p1_turn == true && p2_turn == false){
            p1_turn = false;
            p2_turn = true;
            document.querySelector(".display_player").innerHTML = 'O';
            handle_click();
        }
        else{
            p1_turn = true;
            p2_turn = false;
            document.querySelector(".display_player").innerHTML = 'X';
            handle_click();
        }
    }
  }, 1000);
}
