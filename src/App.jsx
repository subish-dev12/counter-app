import { useCallback, useEffect, useState } from "react";
import Button from "./Button";
import StatBoard from "./StatBoard";
import History from "./History";

export default function App() {
  const [counter, setCounter] = useState([
    {
      id: new Date(),
      count: 0,
      value: 1,
      list: [],
      action: 0,
      minCount: 0,
      maxCount: 0,
    },
  ]);

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
      if (e.target.tagName === "INPUT") return;

      if (e.key === "=") {
        calculation("increment");
      }

      if (e.key === "-") {
        calculation("decrement");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [calculation]);

  const getLogo = (count) => {
    if (count < 0) return `💀 ${count}`;
    if (count === 0) return `⚪ ${count}`;
    if (count <= 10) return `⭐ ${count}`;
    if (count <= 30) return `⭐⭐ ${count}`;
    return `⭐⭐⭐ ${count}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      {/* Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Counter Pro</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
            <span className="font-semibold">
              {counter?.length > 0 ? counter?.length : "0"}
            </span>
            <span>counter{counter?.length !== 1 ? "s" : ""}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Counters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {counter?.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-3.5 border-b border-slate-600">
                <h2 className="text-white font-semibold text-base">
                  Counter #{idx + 1}
                </h2>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Counter Display */}
                <div
                  className={`text-6xl font-bold text-center py-10 rounded-xl mb-6 transition-all duration-300 border-2 ${
                    item.count < 0
                      ? "bg-rose-50 text-rose-700 border-rose-200"
                      : item.count === 0
                        ? "bg-slate-50 text-slate-600 border-slate-200"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200"
                  }`}
                >
                  {getLogo(item.count)}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-5">
                  <Button
                    onClick={() => calculation("increment", item.id)}
                    operation="increment"
                  >
                    <span className="text-xl font-bold">+</span>
                  </Button>
                  <Button
                    onClick={() => calculation("decrement", item.id)}
                    operation="decrement"
                  >
                    <span className="text-xl font-bold">−</span>
                  </Button>
                </div>

                {/* Input Section */}
                <div className="mb-5 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                    Step Value
                  </label>
                  <input
                    type="number"
                    value={item.value}
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
                    className="w-full px-4 py-2.5 bg-white border border-slate-300 text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-400 transition-all"
                    placeholder="Enter step value"
                  />
                </div>

                {/* History Component */}
                <History list={item.list} />

                {/* Reset Buttons */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Button
                      operation="reset/count"
                      onClick={() => calculation("reset/count", item.id)}
                    >
                      Reset
                    </Button>
                  </div>
                  {item.list.length > 0 && (
                    <div className="flex-1">
                      <Button
                        onClick={() => calculation("reset/history", item.id)}
                        operation="reset/history"
                      >
                        Clear History
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats Footer */}
              <StatBoard
                largest={item.maxCount}
                smallest={item.minCount}
                action={item.action}
              />
            </div>
          ))}
        </div>

        {/* Add Counter Button */}
        <div className="flex justify-center">
          <button
            onClick={() => calculation("new/counter")}
            className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            Add New Counter
          </button>
        </div>
      </div>
    </div>
  );
}
