import circle from "../../assets/svg/circle-outline.svg";
import cross from "../../assets/svg/x-outline.svg";
import useTicTacToe from "../../hooks/useTicTacToe";
import { TicTacToeModes,TicTacToePlayer } from "../../types/config";
import "./TicTacToe.css";

const TicTacToe = () => {
  const {
    replayMode,
    replayModeIndex,
    turn,
    winner,
    displayBoard,
    setMovement,
    next,
    prev,
    replay,
    reset,
    resume,
  } = useTicTacToe();
  return (
    <>
      <main className="home-page">
        <h2 className="home-title">Tic Tac Toe</h2>
        <div className="set-player">
          {(winner === undefined ||
            (replayMode !== TicTacToeModes.PLAY && replayModeIndex !== length)) && (
            <>
              <div className="turn-text">Turn of:</div>
              {turn === TicTacToePlayer.XPLAYER ? (
                <img className="player-icon" src={cross} />
              ) : (
                <img className="player-icon" src={circle} />
              )}
            </>
          )}
        </div>
        {
          <div className="result-message-container">
            <div className="result-message">
              {winner === 1 ? (
                <>
                  <div className="result-text">The winner is:</div>
                  <img className="player-icon" src={cross} />
                </>
              ) : winner === -1 ? (
                <>
                  <div className="result-message turn-text">The winner is:</div>
                  <img className="player-icon" src={circle} />
                </>
              ) : winner === 0 ? (
                "Draw"
              ) : null}
            </div>
          </div>
        }
        <div className="grid-container">
          <div className="grid3x3">
            {displayBoard.map((cell, index) => (
              <div
                key={index}
                className={`cell ${cell}`}
                onClick={() =>
                  cell === "" &&
                  !winner && replayMode === TicTacToeModes.PLAY &&
                  setMovement({ turn, position: index })
                }
              >
                {cell === "" ? (
                  ""
                ) : cell === "X" ? (
                  <img className="game-icon" src={cross} />
                ) : (
                  <img className="game-icon" src={circle} />
                )}
              </div>
            ))}
          </div>
          <div className="menu">
            {(replayMode === TicTacToeModes.REWIND || replayMode === TicTacToeModes.PLAY) && (
              <>
                <button
                  className="game-button"
                  disabled={replayMode === -1}
                  onClick={next}
                >
                  Next
                </button>
                <button className="game-button" onClick={prev}>
                  Previous
                </button>
              </>
            )}
            {winner !== undefined ? (
              <button
                className="game-button"
                disabled={replayMode === TicTacToeModes.REPLAY}
                onClick={replay}
              >
                Replay
              </button>
            ) : (
              <button
                className="game-button"
                disabled={replayMode === TicTacToeModes.PLAY}
                onClick={resume}
              >
                Resume
              </button>
            )}

            <button className="game-button" onClick={reset}>
              Reset
            </button>
          </div>
        </div>
      </main>
    </>
  );
};
export default TicTacToe;
