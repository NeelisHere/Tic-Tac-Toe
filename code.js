let board={};
let cellsOccupied=[]
function evacuate(){
    for(let i=1;i<=9;++i){
        board[i]=null;
    }
    cellsOccupied=[];
}
// console.log(board);
const me='X';
const ai='O'

const winningCombinations=[
    [1,2,3],[4,5,6],[7,8,9],
    [1,4,7],[2,5,8],[3,6,9],
    [1,5,9],[3,5,7]
]

const cells=document.querySelectorAll('.cell')
play();

function play(){
    evacuate();
    cells.forEach((cell)=>{
        // console.log(cell.id);
        document.getElementById(cell.id)
                .addEventListener('click',activate,false);
    })
}

function activate(event){
    // console.log(event.target.id);
    let x=event.target.id;
    if(document.getElementById(x).innerText===''){
        document.getElementById(x).innerText=me;
        board[x]=me;
        cellsOccupied.push(parseInt(x));
        let GameWon=checkResult();
        if(GameWon===true || GameWon===false){
            gameOver();
            return;
        }

        //computer's turn
        store=[]
        for(let i=1;i<=9;++i){
            if(board[i]===null){
                store.push(i);
            }
        }
        let n=Math.floor(Math.random()*store.length);
        board[store[n]]=ai;
        cellsOccupied.push(parseInt(store[n]));
        if(!isFull())document.getElementById(store[n]).innerText=ai;


        GameWon=checkResult();
        if(GameWon===true || GameWon===false){
            gameOver();
        }
        if(isFull()){
            cells.forEach((cell)=>{
                document.getElementById(cell.id)
                        .style
                        .backgroundColor='yellow';
            })
            gameOver();
        }
    }   
}

function isFull(){
    for(let i=1;i<=9;++i){
        if(board[i]===null)return false;
    }return true;
}

function gameOver(){
    console.log(true);
    cells.forEach((cell)=>{
        // console.log(cell.id);
        document.getElementById(cell.id)
                .removeEventListener('click',activate,false);
    })
}

function checkResult(){
    console.log(cellsOccupied);
    // console.log(board);
    for(let i=0;i<winningCombinations.length;++i){
        let move=winningCombinations[i];
        let [x,y,z]=move;
        if(board[x]==='X' && board[y]==='X' && board[z]==='X'){
            for(let itr of move){
                document.getElementById(itr).style.backgroundColor='green'
                // console.log(itr);
            }
            return true;
        }
        if(board[x]==='O' && board[y]==='O' && board[z]==='O'){
            for(let itr of move){
                document.getElementById(itr).style.backgroundColor='red'
                // console.log(itr);
            }
            return false;
        }
    }
    return null;
}

const replay=document.querySelector('.btn')
replay.addEventListener('click',()=>{
    console.clear();
    evacuate();
    cells.forEach((cell)=>{
        cell.innerText='';
        document.getElementById(cell.id).style.backgroundColor='';
        // console.log(cell.innerText);
    })
    play();
})




