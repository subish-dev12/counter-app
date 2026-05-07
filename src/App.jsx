import { useCallback, useEffect, useState } from "react";
import Button from "./Button";
import StatBoard from "./StatBoard";
import History from "./History";
import getTime from "./utils/calculation";

export default function App() {
  // const [check, setCheck] = useState(console.log("initializer running"));

  //lazy init to avoid re-rendering the expensive calls
  const [counter, setCounter] = useState(() => {
    return {
      [crypto.randomUUID()]: {
        value: 1,
        count: 1,
        history: [],
      },
    };
  });

  // maxCount: 0,
  // action: 0,
  // minCount: 0,

  const [selectedId, setSelectedId] = useState(Object.keys(counter)[0]);

  const maxCountValue = 100;
  const minCountValue = -100;

  const handleClick = (id) => {
    setSelectedId(id);
  };

  function addCounter() {
    setCounter((prev) => ({
      ...prev,
      [crypto.randomUUID()]: {
        count: 0,
        value: 1,
        history: [{ count: 1, time: getTime() }],
      },
    }));
  }

  const handleDecrement = useCallback(
    (id) => {
      setCounter((prev) => {
        const current = prev[id];
        //if wrong id is  passed current would be undefined so use guard clause.
        if (!current) return prev;
        const newCount = current.count - current.value;
        const finalCount = Math.max(newCount, minCountValue);
        return {
          ...prev,
          [id]: {
            ...current,
            count: finalCount,
            history: [
              ...current.history,
              { count: finalCount, time: getTime() },
            ],
            // time: finalCount,
          },
        };
      });
    },
    [minCountValue],
  );

  const handleIncrement = useCallback(
    (id) => {
      setCounter((prev) => {
        const current = prev[id];
        //if wrong id is  passed current would be undefined so use guard clause.
        if (!current) return prev;
        const newCount = current.count + current.value;
        const finalCount = Math.min(newCount, maxCountValue);
        return {
          ...prev,
          [id]: {
            ...current,
            count: finalCount,
            history: [
              ...current.history,
              { count: finalCount, time: getTime() },
            ],
          },
        };
      });
    },
    [maxCountValue],
  );

  function resetCounter(id) {
    setCounter((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        count: 0,
      },
    }));
  }

  function resetHistory(id) {
    setCounter((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        history: [],
      },
    }));
  }

  console.log("how counter looks like", Object.keys(counter) + 1);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedId) return;
      if (e.target.tagName === "INPUT") return;
      if (e.key === "=" || e.key === "+") {
        handleIncrement(selectedId);
      }
      if (e.key === "-") {
        handleDecrement(selectedId);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, handleDecrement, handleIncrement]);

  const getLogo = (count) => {
    if (count < 0) return `💀 ${count}`;
    if (count === 0) return `⚪ ${count}`;
    if (count <= 10) return `⭐ ${count}`;
    if (count <= 30) return `⭐⭐ ${count}`;
    return `⭐⭐⭐ ${count}`;
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-violet-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔢</span>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Counter Pro
              </h1>
            </div>
            <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
              {Object.keys(counter)?.length > 0
                ? Object.keys(counter)?.length
                : "0"}{" "}
              counter
              {Object.keys(counter)?.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Counters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mb-6 auto-rows-fr">
          {Object.entries(counter)?.map(([id, item], index) => (
            <div
              key={id}
              className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ${id === selectedId ? "border-4 border-black" : ""} overflow-hidden flex flex-col h-full max-w-sm mx-auto w-full`}
              onClick={() => handleClick(id)}
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-3 py-1.5">
                <h2 className="text-xs font-semibold">Counter #{index + 1}</h2>
              </div>

              {/* Card Body */}
              <div className="p-3 space-y-2 flex-1 flex flex-col">
                {/* Counter Display */}
                <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-slate-800">
                    {getLogo(item?.count)}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => handleIncrement(id)}
                    operation="increment"
                  >
                    +
                  </Button>
                  <Button
                    onClick={() => handleDecrement(id)}
                    operation="decrement"
                  >
                    −
                  </Button>
                </div>

                {/* Input Section */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">
                    Step Value
                  </label>
                  <input
                    type="number"
                    value={item?.value}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "") {
                        setCounter((prevCounter) => ({
                          ...prevCounter,
                          [id]: {
                            ...prevCounter[id],
                            value: "",
                          },
                        }));
                        return;
                      }
                      const num = Number(value);
                      if (
                        Number.isFinite(num) &&
                        num <= maxCountValue &&
                        num >= minCountValue
                      ) {
                        setCounter((prevCounter) => ({
                          ...prevCounter,
                          [id]: {
                            ...prevCounter[id],
                            value: num,
                          },
                        }));
                      }
                    }}
                    className="w-full px-2 py-1.5 bg-white border border-slate-300 text-slate-900 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-400 transition-all"
                    placeholder="Enter step value"
                  />
                </div>

                {console.log("item k k xa", item.history)}

                {/* History Component */}
                <div className="flex-1">
                  <History
                    history={item?.history}
                    onReset={resetCounter}
                    id={id}
                    onResetHistory={resetHistory}
                  />
                </div>

                {/* Stats Footer */}
                <StatBoard history={item.history} />
              </div>
            </div>
          ))}
        </div>

        {/* Add Counter Button */}
        <div className="flex justify-center">
          <button
            onClick={addCounter}
            className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center gap-2 text-sm"
          >
            + Add New Counter
          </button>
        </div>
      </main>
    </div>
  );
}
