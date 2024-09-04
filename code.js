
let board = [
    [
        {type:"vertical-piece",id:"v0"},
        {type:"vertical-piece",id:"v0"},
        {type:"vertical-piece",id:"v2"},
        {type:"vertical-piece",id:"v2"},
        {type:"square-piece",id:"s0"}
    ],
    [
        {type:"trabado",id:"square"},
        {type:"trabado",id:"square"},
        {type:"horizontal",id:"h"},
        {type:"square-piece",id:"s1"},
        {type:"option-piece",id:"o0"}
    ],
    [
        {type:"trabado",id:"square"},
        {type:"trabado",id:"square"},
        {type:"horizontal",id:"h"},
        {type:"square-piece",id:"s2"},
        {type:"option-piece",id:"o1"}
    ],
    [
        {type:"vertical-piece",id:"v1"},
        {type:"vertical-piece",id:"v1"},
        {type:"vertical-piece",id:"v3"},
        {type:"vertical-piece",id:"v3"},
        {type:"square-piece",id:"s3"}
    ]
]

let pieces = [
    {type: "vertical-piece", position: {left: 1, right: 2, top: 1, bottom: 3}, id: "v0"},
    {type: "vertical-piece", position: {left: 4, right: 5, top: 1, bottom: 3}, id: "v1"},
    {type: "vertical-piece", position: {left: 1, right: 2, top: 3, bottom: 5}, id: "v2"},
    {type: "vertical-piece", position: {left: 4, right: 5, top: 3, bottom: 5}, id: "v3"},
    {type: "square-piece", position: {left: 1, right: 2, top: 5, bottom: 6}, id: "s0"},
    {type: "square-piece", position: {left: 2, right: 3, top: 4, bottom: 5}, id: "s1"},
    {type: "square-piece", position: {left: 3, right: 4, top: 4, bottom: 5}, id: "s2"},
    {type: "square-piece", position: {left: 4, right: 5, top: 5, bottom: 6}, id: "s3"},
    {type: "trabado", position: {left: 2, right: 4, top: 1, bottom: 3}, id: "square"},
    {type: "horizontal-piece", position: {left: 2, right: 4, top: 3, bottom: 4}, id:"h"},
    {type: "option-piece", position: {left: 2, right: 3, top: 5, bottom: 6}, id: "o0"},
    {type: "option-piece", position: {left: 3, right: 4, top: 5, bottom: 6}, id: "o1"}
]

let markedPiece = {
    type: "",
    position: {},
    id: "",
    posibleMoves: []
}

const resetOptions = ()=>{
    document.getElementById("o0").style.display = "none";
    document.getElementById("o1").style.display = "none";
}

const updatePieces = ()=>{
    for (const p of pieces){
        const piece = document.getElementById(p.id);
        piece.style.gridColumn = p.position.left + "/" + p.position.right;
        piece.style.gridRow = p.position.top + "/" + p.position.bottom;
    }
};

const checks = [
    {
        direction: "left",
        index: 0,
        modifier: -1
    },
    {
        direction: "right",
        index: 0,
        modifier: 1
    },
    {
        direction: "top",
        index: 1,
        modifier: -1
    },
    {
        direction: "bottom",
        index: 1,
        modifier: 1
    }
];

const whereCanMoveIndex = (index,id)=>{

    let directions = [];
    for(const check of checks){
        if(
            index[check.index]+check.modifier > -1 &&
            (
                index[check.index]+check.modifier < [4,5][check.index] &&
                (
                    board[index[0] + (!check.index ? check.modifier : 0)][index[1] + (check.index ? check.modifier : 0)].id === id ||
                    board[index[0] + (!check.index ? check.modifier : 0)][index[1] + (check.index ? check.modifier : 0)]?.type === "option-piece"
                )
            )
        ){
            if(board[index[0] + (!check.index ? check.modifier : 0)] [index[1] + (check.index ? check.modifier : 0)].type === "option-piece"){
                directions.push({direction:check.direction,option:board[index[0] + (!check.index ? check.modifier : 0)] [index[1] + (check.index ? check.modifier : 0)].id});
            }
            else{
                directions.push({direction:check.direction,option:null});
            }
        }
    }
    return directions;
};


const whereCanMove = (indexs,id)=>{

    let posibleDirectionsArray = [];
    for(const i of indexs){
        posibleDirectionsArray.push(whereCanMoveIndex(i,id));
    }

    let directionsArray = [];
    const directions = ["left","right","top","bottom"];

    for(const d of directions){
        let canMove = true;
        let options = [];
        for(const posibleDirection of posibleDirectionsArray){
            const match = posibleDirection.find((obj) => obj.direction === d);
            if (!match) {
                canMove = false;
                break;
            }
            if (match.option) {
                options.push(match.option);
            }
        }
        if (canMove){
            directionsArray.push({ direction: d, options: options });
        }
    }
    return directionsArray;
};

//FUNCION DE REACCION AL CLICK

const activateOptions = (optionsArray)=>{
    for(const o of optionsArray){
        document.getElementById(o).style.display = "block";
    }
};

const handleClick = (id)=>{
    if(markedPiece.id === id){
        document.getElementById(markedPiece.id)?.classList.remove("selected");
        markedPiece = {
            type: "",
            position: {},
            id: "",
            posibleMoves: []
        };
        resetOptions();
        return;
    }
    const selectedPiece = pieces.find((p)=>p.id===id);
    let pieceIndexs = [];
    for(let i = selectedPiece.position.left ; i < selectedPiece.position.right ; i++){
        for(let j = selectedPiece.position.top ; j < selectedPiece.position.bottom ; j++){
            pieceIndexs.push([i-1,j-1]);
        }
    }
    const posibleMoves = whereCanMove(pieceIndexs,id);
    if(!posibleMoves.length){
        return;
    }
    resetOptions();
    document.getElementById(markedPiece.id)?.classList.remove("selected");
    markedPiece = {
        type: selectedPiece.type,
        position: selectedPiece.position,
        id: id,
        posibleMoves: posibleMoves
    }
    document.getElementById(markedPiece.id).classList.add("selected");
    for(m of posibleMoves){
        activateOptions(m.options);
    }
};

const setOnBoard = (position,item)=>{
    let pieceIndexs = [];
    for(let i = position.left ; i < position.right ; i++){
        for(let j = position.top ; j <position.bottom ; j++){
            pieceIndexs.push([i-1,j-1]);
        }
    }

    for(const indx of pieceIndexs){
        board[indx[0]][indx[1]] = item;
    }
};

const handleOption = (id)=>{
    if (!markedPiece.id){
        console.log("no piece selected");
        return;
    }

    const direc = markedPiece.posibleMoves.find(obj => obj.options.includes(id));
    if (!direc){
        return;
    }
    resetOptions();
    const movement = checks.find((c)=>c.direction===direc.direction);
    
    setOnBoard(markedPiece.position,{type:"none",id:"none"});

    const newPiece = {
        type: markedPiece.type,
        position: {
            left: markedPiece.position.left+(!movement.index ? movement.modifier : 0),
            right: markedPiece.position.right+(!movement.index ? movement.modifier : 0),
            top: markedPiece.position.top+(movement.index ? movement.modifier : 0),
            bottom: markedPiece.position.bottom+(movement.index ? movement.modifier : 0),
        },
        id: markedPiece.id,
    }
    pieces[pieces.findIndex((p)=>p.id===markedPiece.id)] = newPiece;
    setOnBoard(newPiece.position,{type:newPiece.type,id:newPiece.id});

    
    for(const o of ["o0","o1"]){
        if(!board.find(arr=>arr.some(obj=>obj.id===o))){
            let posVacia = [board.findIndex(arr=>arr.some(obj=>obj.id==="none"))];
            posVacia.push(board[posVacia[0]].findIndex(obj=>obj.id==="none"));
            pieces[pieces.findIndex(obj=>obj.id===o)].position = {
                left: posVacia[0]+1,
                right: posVacia[0]+2,
                top: posVacia[1]+1,
                bottom: posVacia[1]+2
            };
            board[posVacia[0]][posVacia[1]] = {
                type: "option-piece",
                id: o
            };
        }
    }
    
    document.getElementById(markedPiece.id).classList.toggle("selected");

    updatePieces();
    markedPiece = {
        type: "",
        position: {},
        id: "",
        posibleMoves: []
    };
    
};

//AÑADO EL EVENT LISTENER AL TABLERO

const boardElement = document.getElementById("board");

boardElement.addEventListener("click",(event)=>{
    const clickedElement = event.target;
    if(['vertical-piece','square-piece','horizontal-piece','trabado'].includes(clickedElement.classList[0])){
        handleClick(clickedElement.id);
    }else if(['option-piece'].includes(clickedElement.classList[0])){
        handleOption(clickedElement.id);
    }

});
