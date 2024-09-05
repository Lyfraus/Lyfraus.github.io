
let ended = false;
let players = ["X","O"];
const actualPieceElement = document.getElementById('actual-piece');

let board = [
    ["","",""],
    ["","",""],
    ["","",""],
]



const isWinCondition = ()=>{
    const player = players[0];
    let isWin = {bool:false,way:{direction:"",index:0}};
    for(let i = 0 ; i < 3 ; i++){
        if(!board[i].map(x => x!==player ? "" : player).includes("")){
            isWin.bool = true;
            isWin.way.direction = "vertical";
            isWin.way.index = i;
            break;
        }
        if(
            board[0][i] === player &&
            board[1][i] === player &&
            board[2][i] === player
        ){
            isWin.bool = true;
            isWin.way.direction = "horizontal";
            isWin.way.index = i;
            break;
        }
    }
    if(!isWin.bool){
        if (board[1][1] === players[0]){
            if(board[0][0] === player && board[2][2] === player){ 
                isWin.bool = true;
                isWin.way.direction = "diagonal";
                isWin.way.index = 0;
            }else if(board[2][0] === player && board[0][2] === player){
                isWin.bool = true;
                isWin.way.direction = "diagonal";
                isWin.way.index = 1;
            }
        }
    }
    return isWin;
};


const markWinSpots = ()=>{
    let indexes = [];

    const way = isWinCondition().way;
    switch(way.direction){
        case "horizontal":
            for(let i = 0 ; i < 3 ; i++){
                document.getElementById(`c${i}r${way.index}`).classList.add("win");
            }
            break;
        case "vertical":
            for(let i = 0 ; i < 3 ; i++){
                document.getElementById(`c${way.index}r${i}`).classList.add("win");
            }
            break;
        case "diagonal":
            if(!way.index){
                for(let i = 0 ; i < 3 ; i++){
                    document.getElementById(`c${i}r${i}`).classList.add("win");
                }
            } else {
                for(let i = 0 ; i < 3 ; i++){
                    document.getElementById(`c${2-i}r${i}`).classList.add("win");
                }
            }
            break;
    }

    for(const index of indexes){
        document.getElementById(`c${index[0]}r${index[1]}`).classList.add("win");
    }
};

const setPiece = (id,pieceType)=>{
    const idArray = [...id];
    const index = [idArray[1],idArray[3]];
    board[index[0]][index[1]] = players[0];
    const element = document.getElementById(id);
    element.textContent = pieceType;
    element.classList.add(pieceType === "X" ? "orangeText" : "whiteText");
    element.classList.remove("clickeable");
    if(isWinCondition().bool){
        actualPieceElement.textContent = "Click on board to reset";
        actualPieceElement.classList.add("mini");
        ended = true;
        markWinSpots();
        return;
    }
    players = players.reverse();
    actualPieceElement.classList.toggle("orangeText");
    actualPieceElement.classList.toggle("whiteText");
    actualPieceElement.textContent = players[0];
};





const handleClick = (id)=>{
    if(board.some(column=>column.includes(id))){
        return;
    }
    setPiece(id,players[0]);
};


const resetEveryThing = ()=>{
    players = players.reverse();
    actualPieceElement.classList.toggle("orangeText");
    actualPieceElement.classList.toggle("whiteText");
    actualPieceElement.textContent = players[0];
    actualPieceElement.classList.remove("mini");
    board = [
        ["","",""],
        ["","",""],
        ["","",""],
    ];
    const elementsArray = document.getElementsByClassName("piece");
    for(const element of elementsArray){
        element.textContent = "";
        element.classList.add("clickeable");
        element.classList.remove("win");
        element.classList.remove("orangeText");
        element.classList.remove("whiteText");
    }
    ended = false;
};


const boardElement = document.getElementById("board");

boardElement.addEventListener("click",(e)=>{
    if(!ended){  
        handleClick(e.target.id);
    } else{
        resetEveryThing();
    }
});