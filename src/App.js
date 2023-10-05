import { useState } from "react";
import "./App.css"
import Board from "./components/Board";

const App = () => {
  const [history, setHistory] = useState([{squares:Array(9).fill(null)}]);
  const [xIsNext, setXIsNext] = useState(true);
  //history list에서 선택한 history로 돌아갔을때 이게 몇번째(step)인지 기억하기 위해서
  const [stepNumber, setStepNumber] = useState(0);

  const calculateWinner = (squares) =>{
    
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    for(let index  = 0; index < lines.length; index++){
      const [a,b,c] = lines[index];
      
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    }
    return null;
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  let status;
  if(winner){
    status = 'Winner: '+winner; 
  }else{
    status = `Next player: ${xIsNext ? 'X':'O'}`;
  }

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const newCurrent = newHistory[newHistory.length - 1];
    const newSquares = newCurrent.squares.slice();
   
    if(calculateWinner(newSquares) || newSquares[i]){
      return;
    }
    newSquares[i] = xIsNext? 'X' : 'O';
    setHistory([...newHistory, {squares : newSquares}]);
    setXIsNext(prev =>!prev);
    setStepNumber(newHistory.length);
  }
  const moves = history.map((step, move) => {
    const desc = move? 'Go to move #' + move : 'Go to game start';
    return(
      <li key={move}>
        <button className="move-button" onClick={()=> jumpTo(move)}>{desc}</button>
      </li>
    )
   } )
   const jumpTo = (step) => {
     setStepNumber(step);
     //stepNumber가 짝수일 때마다 xIsNext를 true로 설정.
    setXIsNext((stepNumber % 2) === 0)
   }
  return (
    <div className="game">
       <div className="game-board"><Board squares={current.squares} onClick={(i) => handleClick(i)}/></div>
       <div className="game-info">{status}</div>
       <ol style={{listStyle:'none'}}>{moves}</ol>
    </div>
  );
}

export default App;
