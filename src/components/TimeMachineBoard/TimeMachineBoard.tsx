interface TimeMachineProps {
  prevFoo?: () => void;
  nextFoo?: () => void;
  resumeFoo?: () => void;
  prevItem?: number;
  item?: number;
  setnewItem?: (x: number) => void;
}

export default function TimeMachine({
  prevFoo,
  nextFoo,
  resumeFoo,
  item,
  setnewItem,
}: TimeMachineProps) {
  return (
    <>
      <div className="grid-container">
        <div className="grid4x4">
          {Array.from({ length: 16 }, (_, x) => (
            <div
              className={`grid-elements ${
                item === x + 1 ? "selected" : "noSelected"
              }`}
              key={x + 1}
              onClick={() => {
                setnewItem && setnewItem(x + 1);
              }}
            >
              {x + 1}
            </div>
          ))}
        </div>
        <div className="menu">
          <button
            className="game-button"
            disabled={!prevFoo}
            onClick={() => {
              prevFoo && prevFoo();
            }}
          >
            Previous
          </button>
          <button
            className="game-button"
            disabled={!resumeFoo}
            onClick={() => {
              resumeFoo && resumeFoo();
            }}
          >
            Resume
          </button>
          <button
            className="game-button"
            disabled={!nextFoo}
            onClick={() => {
              nextFoo && nextFoo();
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
