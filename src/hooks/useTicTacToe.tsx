import { useState, useEffect } from "react";

import { TicTacToeModes, TicTacToePlayer } from "../types/config";

import useHistory from "./useHistory";

interface MoveT {
  turn: -1 | 1;
  position: number;
}
const useTicTacToe = () => {
  const [movement, setMovement] = useState<MoveT>();
  const { getPreviousValue, length, clear } = useHistory<MoveT | undefined>(
    movement
  );
  const [turn, setTurn] = useState<1 | -1>(
    Math.random() > 0.5 ? TicTacToePlayer.XPLAYER : TicTacToePlayer.OPLAYER
  );
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [replayBoard, setReplayBoard] = useState<string[]>(Array(9).fill(""));
  const [winner, setWinner] = useState<1 | -1 | 0 | undefined>(undefined);
  const [replayMode, setReplayMode] = useState<number>(TicTacToeModes.PLAY);
  const [replayModeIndex, setReplayModeIndex] = useState<number>(0);

  useEffect(() => {
    if (movement) {
      const { turn, position } = movement;
      setBoard(
        board.map((cell, index) =>
          index === position
            ? turn === TicTacToePlayer.XPLAYER
              ? "X"
              : "O"
            : cell
        )
      );
      setTurn(
        turn === TicTacToePlayer.XPLAYER
          ? TicTacToePlayer.OPLAYER
          : TicTacToePlayer.XPLAYER
      );
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
    if (wincombianation) {
      setWinner(board[wincombianation[0]] === "X" ? 1 : -1);
    }
    if (!board.includes("") && !winner && !wincombianation) {
      return setWinner(0);
    }
  }, [board]);
  const reset = () => {
    setMovement(undefined);
    setBoard(Array(9).fill(""));
    setReplayBoard(Array(9).fill(""));
    setReplayMode(TicTacToeModes.PLAY);
    setReplayModeIndex(0);
    setWinner(undefined);
    clear();
  };

  const next = () => {
    if (replayMode === TicTacToeModes.PLAY) {
      setReplayMode(TicTacToeModes.REWIND);
      setReplayBoard(board);
      setReplayModeIndex(length);
    }
    if (replayModeIndex < length) {
      const nextValue = getPreviousValue(replayModeIndex);
      setReplayBoard(
        replayBoard.map((cell, index) =>
          index === nextValue?.position
            ? nextValue?.turn === TicTacToePlayer.XPLAYER
              ? "X"
              : "O"
            : cell
        )
      );
      nextValue?.turn && setTurn(-nextValue.turn as 1 | -1);
      setReplayModeIndex(replayModeIndex + 1);
    }
  };
  const resume = () => {
    setReplayMode(TicTacToeModes.PLAY);
    setReplayModeIndex(0);
    movement?.turn && setTurn(-movement.turn as 1 | -1);
  };
  const replay = () => {
    if (replayBoard.some((x) => x === "X" || x === "O")) {
      setReplayBoard(Array(9).fill(""));
    }
    setReplayModeIndex(0);
    setReplayMode(TicTacToeModes.REPLAY);
  };
  const prev = () => {
    if (replayMode === TicTacToeModes.PLAY && length > 0) {
      setReplayMode(TicTacToeModes.REWIND);
      setReplayModeIndex(length - 1);
      const prevValue = getPreviousValue(replayModeIndex - 1);
      setReplayBoard(
        board.map((cell, index) => (index === prevValue?.position ? "" : cell))
      );
      prevValue?.turn && setTurn(prevValue.turn);
    }
    if (replayMode === TicTacToeModes.REWIND && replayModeIndex > 0) {
      const prevValue = getPreviousValue(replayModeIndex - 1);
      setReplayBoard(
        replayBoard.map((cell, index) =>
          index === prevValue?.position ? "" : cell
        )
      );
      prevValue?.turn && setTurn(prevValue.turn);
      setReplayModeIndex(replayModeIndex - 1);
    }
  };

  useEffect(() => {
    if (replayMode === TicTacToeModes.PLAY) return;
    if (replayMode === TicTacToeModes.REPLAY && replayModeIndex <= length) {
      setTimeout(() => {
        const move = getPreviousValue(replayModeIndex);
        setReplayBoard(
          replayBoard.map((cell, index) =>
            index === move?.position
              ? move?.turn === TicTacToePlayer.XPLAYER
                ? "X"
                : "O"
              : cell
          )
        );
        move?.turn && setTurn(-move.turn as 1 | -1);
        if (replayModeIndex !== length) setReplayModeIndex(replayModeIndex + 1);
      }, 1000);
    }
    if (replayMode === TicTacToeModes.REPLAY && replayModeIndex == length) {
      setReplayMode(TicTacToeModes.REWIND);
    }
  }, [replayModeIndex, replayMode]);

  const displayBoard = replayMode === TicTacToeModes.PLAY ? board : replayBoard;

  return {
    winner,
    replayMode,
    replayModeIndex,
    turn,
    displayBoard,
    setMovement,
    replay,
    next,
    prev,
    reset,
    resume
  };
};

export default useTicTacToe;
