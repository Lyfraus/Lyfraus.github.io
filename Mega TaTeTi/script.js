
let players = ["X","O"];
let position = "";

let ended = false;

const positionEquivalences = [
    "topleft",
    "top",
    "topright",
    "left",
    "middle",
    "right",
    "bottomleft",
    "bottom",
    "bottomright"
];

let board = {
    topleft:{
        win: "",
        game: [
            "","","",
            "","","",
            "","",""
        ],
    },
    top:{
        win: "",
        game: [
            "","","",
            "","","",
            "","",""
        ],
    },
    topright:{
        win: "",
        game: [
            "","","",
            "","","",
            "","",""
        ],
    },
    left:{
        win: "",
        game: [
            "","","",
            "","","",
            "","",""
        ],
    },
    middle:{
        win: "",
        game: [
            "","","",
            "","","",
            "","",""
        ],
    },
    right:{
        win: "",
        game: [
            "","","",
            "","","",
            "","",""
        ],
    },
    bottomleft:{
        win: "",
        game: [
            "","","",
            "","","",
            "","",""
        ],
    },
    bottom:{
        win: "",
        game: [
            "","","",
            "","","",
            "","",""
        ],
    },
    bottomright:{
        win: "",
        game: [
            "","","",
            "","","",
            "","",""
        ],
    },
};


const didWon = (tatetiGame) => {
    const player = players[0];
    console.log(tatetiGame);
    for(let i = 0 ; i < 3 ; i++){
        if (tatetiGame[i] === player &&
            (tatetiGame[i+3] === player &&
            tatetiGame[i+6] === player)
        ){
            return true;
        }
        if (tatetiGame[i*3] === player &&
            (tatetiGame[i*3+1] === player &&
            tatetiGame[i*3+2] === player)
        ){
            return true;
        }
    }
    if(tatetiGame[0] === player &&
        (tatetiGame[4] === player &&
        tatetiGame[8] === player)
    ){
        return true;
    }
    if(tatetiGame[2] === player &&
        (tatetiGame[4] === player &&
        tatetiGame[6] === player)
    ){
        return true;
    }
};

const resetClickeable = ()=>{
    const gamesArray = [...document.getElementsByClassName("game")];
    const actualGameArray = [...document.getElementsByClassName("actual-piece")];

    if (position){
        if (board[position].win){
            position = "";
            resetClickeable();
            return;
        }
        actualGameArray.forEach((piece)=>{
            if(piece.id.replace("actual-piece","") === position){
                piece.textContent = players[0];
                piece.classList.add(`player${players[0]}`)
                piece.classList.remove(`player${players[1]}`)
            } else {
                piece.textContent = "";
            }
        });
        gamesArray.forEach((game)=>{
            if(game.id === position){
                game.classList.add("clickeable");
                game.classList.add(`player${players[0]}`);
            } else {
                game.classList.remove("clickeable");
                game.classList.remove("playerX");
                game.classList.remove("playerO");
            }
        });
        return;
    }
    actualGameArray.forEach((piece)=>{
        if (!board[piece.id.replace("actual-piece","")].win){
            piece.textContent = players[0];
            piece.classList.add(`player${players[0]}`);
            piece.classList.add(`player${players[0]}`)
            piece.classList.remove(`player${players[1]}`)
        }
    });
    gamesArray.forEach((game)=>{
        if (!board[game.id].win){
            game.classList.add("clickeable");
        }
    });
};

const resetEverything = ()=>{
    for(const piece of [...document.getElementsByClassName("piece")]){
        piece.textContent = "";
        piece.classList.remove("playerX");
        piece.classList.remove("playerO");
        piece.classList.add("clickeable");
    }
    for(const game of [...document.getElementsByClassName("game")]){
        game.classList.remove("winX");
        game.classList.remove("winO");
    }
    for(const actualPiece of [...document.getElementsByClassName("actual-piece")]){
        actualPiece.textContent = "";
        actualPiece.classList.remove("playerX");
        actualPiece.classList.remove("playerO");
        actualPiece.classList.remove("winX");
        actualPiece.classList.remove("winO");
    }
    for(const equivalent of positionEquivalences){
        board[equivalent].win = "";
    }
    position = "";
    resetClickeable();
}

resetClickeable();

const handleClick = (clickedPosition)=>{
    position = positionEquivalences[clickedPosition.replace(/[a-zA-Z]/g,"")];
    const actualPos = clickedPosition.replace(/[0-9]/g,"");
    board[actualPos][clickedPosition.replace(/[a-zA-Z]/g,"")] = players[0];
    clickedElement = document.getElementById(clickedPosition);
    clickedElement.textContent = players[0];
    clickedElement.classList.add(`player${players[0]}`);
    let win = didWon(board[actualPos]);
    if (win){
        board[actualPos].win = players[0];
        winnedGame = document.getElementById(actualPos);
        winnedGame.classList.add(`win${players[0]}`);
        winnedGame.classList.remove("clickeable");
        const thePiece = document.getElementById("actual-piece"+actualPos);
        thePiece.classList.add("win"+players[0]);
        thePiece.textContent = "";
        const realWin = didWon(positionEquivalences.map((pos)=>board[pos].win));
        if (realWin){
            ended = true;
            return;
        }
    }
    players.reverse();
    resetClickeable();
};



const tatetiElement = document.getElementById("board");

tatetiElement.addEventListener("click",(e)=>{
    if(ended){
        ended = false;
        resetEverything();
        return;
    }
    if (![...e.target.parentElement.classList].includes("clickeable")){
        return;
    }
    if(![...e.target.classList].includes("clickeable")){
        return;
    }
    handleClick(e.target.id);
});