import { useCallback, useEffect, useState } from "react";
import Button from "./Button";
import StatBoard from "./StatBoard";
import History from "./History";

export default function App() {
  const [counter, setCounter] = useState([
    {
      id: crypto.randomUUID(),
      count: 0,
      value: 1,
      list: [],
      action: 0,
      minCount: 0,
      maxCount: 0,
    },
  ]);

  const [selectedId, setSelectedId] = useState(counter[0].id);

  const handleClick = (id) => {
    setSelectedId(id);
  };

  const maxCountValue = 100;
  const minCountValue = -100;

  const getTime = () => {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const timeFormat = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");
    const time = `${hours}:${minutes}:${seconds}${timeFormat}`;
    return time;
  };

  // const handleClick = (id) => {
  //   setCounter((prevCounter) =>
  //     prevCounter.map((item) =>
  //       item.id === id ? { ...item, select: true } : { ...item, select: false },
  //     ),
  //   );
  // };

  // const selectedItem = counter.find((item) => item.id === selectedId);

  // console.log("selected item = ", selectedItem);

  const calculation = useCallback(
    (operation, id) => {
      setCounter((prevCounter) => {
        if (operation === "new/counter") {
          return [
            ...prevCounter,
            {
              id: new Date(),
              count: 0,
              value: 1,
              list: [],
              action: 0,
              minCount: 0,
              maxCount: 0,
            },
          ];
        }

        if (operation === "reset/count") {
          return prevCounter?.map((counterItem) =>
            counterItem.id === id
              ? {
                  ...counterItem,
                  count: 0,
                  value: 1,
                }
              : counterItem,
          );
        }

        if (operation === "reset/history") {
          return prevCounter.map((item) =>
            item.id === id ? { ...item, list: [] } : item,
          );
        }

        const targetItem = prevCounter.find((item) => item.id === id);
        if (!targetItem) {
          console.log(`item with id:${id} dont exist`);
          return prevCounter;
        }

        const baseValue =
          targetItem.value === 0 || targetItem.value === ""
            ? 1
            : targetItem.value;

        const newValue =
          operation === "increment"
            ? targetItem.count + baseValue
            : targetItem.count - baseValue;

        if (newValue > maxCountValue) {
          alert(
            `you can't go beyond the maximum value limit of ${maxCountValue}`,
          );
          return prevCounter;
        }

        if (newValue < minCountValue) {
          alert(
            `you can't go beyond the minimum value limit of ${minCountValue}`,
          );
          return prevCounter;
        }

        console.log("printing the count", newValue);

        const newCounter = prevCounter.map((item) =>
          item.id === id
            ? {
                ...item,
                value: baseValue,
                count: newValue,
                list: [...item.list, { value: newValue, timeStamp: getTime() }],
                action: item.action + 1,
              }
            : item,
        );

        const itemToBeUpdated = newCounter.find((c) => c.id === id);
        if (!itemToBeUpdated.list || itemToBeUpdated.list.length === 0) {
          return newCounter;
        }

        const listValues = itemToBeUpdated?.list.map((a) => a.value);
        const maxCount = listValues.length > 0 ? Math.max(...listValues) : null;
        const minCount = listValues.length > 0 ? Math.min(...listValues) : null;

        const finalResult = newCounter.map((a) =>
          a.id === id ? { ...a, maxCount, minCount } : a,
        );

        return finalResult;
      });
    },
    [minCountValue],
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedId) return;
      if (e.target.tagName === "INPUT") return;
      if (e.key === "=" || e.key === "+") {
        calculation("increment", selectedId);
      }
      if (e.key === "-") {
        calculation("decrement", selectedId);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [calculation, selectedId]);

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
              {counter?.length > 0 ? counter?.length : "0"} counter
              {counter?.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Counters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mb-6 auto-rows-fr">
          {counter?.map((item, idx) => (
            <div
              key={item?.id}
              className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ${item.id === selectedId ? "border-4 border-black" : ""} overflow-hidden flex flex-col h-full max-w-sm mx-auto w-full`}
              onClick={() => handleClick(item.id)}
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-3 py-1.5">
                <h2 className="text-xs font-semibold">Counter #{idx + 1}</h2>
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
                    onClick={() => calculation("increment", item.id)}
                    operation="increment"
                  >
                    +
                  </Button>
                  <Button
                    onClick={() => calculation("decrement", item.id)}
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
                        setCounter((prevCounter) =>
                          prevCounter.map((c) =>
                            c.id === item.id ? { ...c, value: "" } : c,
                          ),
                        );
                        return;
                      }

                      const num = Number(value);
                      if (
                        Number.isFinite(num) &&
                        num <= maxCountValue &&
                        num >= minCountValue
                      ) {
                        setCounter((prevCounter) =>
                          prevCounter.map((c) =>
                            c.id === item.id ? { ...c, value: num } : c,
                          ),
                        );
                      }
                    }}
                    className="w-full px-2 py-1.5 bg-white border border-slate-300 text-slate-900 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-400 transition-all"
                    placeholder="Enter step value"
                  />
                </div>

                {/* History Component */}
                <div className="flex-1">
                  <History list={item?.list} />
                </div>

                {/* Reset Buttons */}
                <div className="flex gap-2 mt-auto">
                  <Button onClick={() => calculation("reset/count", item.id)}>
                    Reset
                  </Button>
                  {item?.list.length > 0 && (
                    <Button
                      onClick={() => calculation("reset/history", item.id)}
                      operation="reset/history"
                    >
                      Clear History
                    </Button>
                  )}
                </div>

                {/* Stats Footer */}
                <StatBoard
                  action={item?.action}
                  minCount={item?.minCount}
                  maxCount={item?.maxCount}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Add Counter Button */}
        <div className="flex justify-center">
          <button
            onClick={() => calculation("new/counter")}
            className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center gap-2 text-sm"
          >
            + Add New Counter
          </button>
        </div>
      </main>
    </div>
  );
}
