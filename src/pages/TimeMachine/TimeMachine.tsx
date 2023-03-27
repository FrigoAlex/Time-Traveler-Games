import TimeMachineBoard from "../../components/TimeMachineBoard/TimeMachineBoard";
import useTimeTravel from "../../hooks/useTimeTraveler";

import "./TimeMachine.css";

const TimeMachine = () => {
  const {
    PreviousValue,
    counter,
    getPreviousValue,
    length,
    rewindModeIndex,
    setCounter,
    setRewindModeIndex,
  } = useTimeTravel();

  const handlePrevClick = () => {
    if (rewindModeIndex === -1) {
      setRewindModeIndex(length - 1);
    } else if (rewindModeIndex > 0) {
      setRewindModeIndex(rewindModeIndex - 1);
    }
  };

  const handleResumeClick = () => {
    setRewindModeIndex(-1);
  };

  const handleNextClick = () => {
    if (rewindModeIndex < length - 1) {
      setRewindModeIndex(rewindModeIndex + 1);
    }
  };
  const handleItemClick = (x: number) => {
    if (rewindModeIndex === -1) {
      setCounter(x);
    }
  };

  if (rewindModeIndex === -1) {
    return (
      <>
        <main className="home-page">
          <div className="home-title">
            <h2>Time Machine</h2>
          </div>
          <TimeMachineBoard
            item={counter}
            prevItem={PreviousValue}
            prevFoo={handlePrevClick}
            setnewItem={handleItemClick}
          />
        </main>
      </>
    );
  }
  return (
    <>
      <main className="home-page">
        <div className="home-title">
          <h2>Time Machine</h2>
        </div>
        <TimeMachineBoard
          item={getPreviousValue(rewindModeIndex)}
          resumeFoo={handleResumeClick}
          nextFoo={rewindModeIndex < length - 1 ? handleNextClick : undefined}
          prevFoo={rewindModeIndex === 0 ? undefined : handlePrevClick}
        />
      </main>
    </>
  );
};

export default TimeMachine;
