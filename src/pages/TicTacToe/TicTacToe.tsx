import { useState, useEffect } from "react";

import circle from "../../assets/svg/circle-outline.svg";
import cross from "../../assets/svg/x-outline.svg";
import useHistory from "../../hooks/useHistory";

import "./TicTacToe.css";

interface MoveT {
  turn: -1 | 1;
  position: number;
}

const TicTacToe = () => {
  const [movement, setMovement] = useState<MoveT>();
  const { getPreviousValue, length,clear} = useHistory<MoveT | undefined>(movement);
  const [turn, setTurn] = useState<1 | -1>(Math.random() > 0.5 ? 1 : -1);
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [winner, setWinner] = useState<1 | -1 | 0 | undefined>(undefined);

  useEffect(() => {
    if (movement) {
      const { turn, position } = movement;
      setBoard(
        board.map((cell, index) =>
          index === position ? (turn === 1 ? "X" : "O") : cell
        )
      );
      setTurn(turn === 1 ? -1 : 1);
    }
  }, [movement]);

  useEffect(() => {
    
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const wincombianation = winningCombinations.find((combination) => {
      const [a, b, c] = combination;
      return board[a] && board[a] === board[b] && board[a] === board[c]; 
    });
    if(wincombianation){
      setWinner(board[wincombianation[0]] === "X" ? 1 : -1);
    }
    if (!board.includes("") && !winner && !wincombianation) {
      return setWinner(0);
    }
  }, [board]);
  const reset = () => {
    setMovement(undefined);
    setBoard(Array(9).fill(""));
    setWinner(undefined);
    clear();
  };
  return (
    <>
      <main className="home-page">
        <h2 className="home-title">Tic Tac Toe</h2>
        <div className="board">
          <div className="set-player">
            {
              winner === undefined && <>
                <div className="turn-text">Turn of:</div>
                {
                  turn === 1 ? (
                    <img className="player-icon" src={cross} />
                  ) : (
                    <img className="player-icon" src={circle} />
                  )
                }
              </>
           
            }
          </div>
          {
            <div className="result-message-container">
              <div className="result-message">
                {winner === 1 ? (
                  <>
                    <div className="result-text">winner:</div>
                    <img className="player-icon" src={cross} />
                  </>
                ) : winner === -1 ? (
                  <>
                    <div className="result-message turn-text">winner:</div>
                    <img className="player-icon" src={circle} />
                  </>
                  
                ) : winner === 0 ? (
                  "Draw"
                ) : null
                }
              </div>
            </div>
          }
          <div className="grid-container">
            <div className="grid3x3">
              {board.map((cell, index) => (
                <div
                  key={index}
                  className={`cell ${cell}`}
                  onClick={() =>
                    cell === "" && !winner && setMovement({ turn, position: index })
                  }
                >
                  {cell === "" ? "" : cell === "X" ? <img className="game-icon" src={cross} /> : <img className="game-icon" src={circle} />}
                </div>
              ))}
            </div>
          </div>
          
        </div>
        <button onClick={reset}>Reset</button>
      </main>
    </>
  );
};
export default TicTacToe;
