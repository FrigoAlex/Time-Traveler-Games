import {useState} from "react";
 
import useHistory from "./useHistory";

export default function useTimeTravel(){
  const [counter, setCounter] = useState<number>();
  const {
    PreviousValue,
    getPreviousValue,
    length,
  } = useHistory<number | undefined>(counter);
  
  const [rewindModeIndex, setRewindModeIndex] = useState<number>(-1);
  return {
    rewindModeIndex, 
    setRewindModeIndex,
    counter,
    setCounter,
    PreviousValue,
    getPreviousValue,
    length
  };
}