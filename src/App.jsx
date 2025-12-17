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
    // to convert hours into 12 hour format we did hours % 12.
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
        const targetItem = prevCounter.find((item) => item.id === id);
        const baseValue =
          targetItem.value === 0 || targetItem.value === "" ? 1 : targetItem;

        const newValue =
          operation === "increment"
            ? targetItem.count + baseValue
            : targetItem.count - baseValue;

        if (newValue > maxCountValue) {
          alert(
            `you can't go beyond the maximum value limit of ${maxCountValue}`
          );
          return prevCounter;
        }

        if (newValue < maxCountValue) {
          alert(
            `you can't go beyond the minimum value limit of ${minCountValue}`
          );
          return prevCounter;
        }

        const newCounter = prevCounter.map((item) =>
          item.id === id
            ? {
                ...item,
                value: baseValue,
                count: newValue,
                list: [{ value: item.count, timeStamp: getTime() }],
                action: item.action + 1,
                maxCount: Math.max(...counter.map((item) => item.count)),
                minCount: Math.min(...counter.map((item) => item.count)),
              }
            : item
        );
        return newCounter;
      });
    },
    [counter, minCountValue]
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

  //console.log("largest is", list);

  const getLogo = (count) => {
    if (count < 0) return `💀${count}`;
    if (count === 0) return `⚪${count}`;
    if (count <= 10) return `⭐${count}`;
    if (count <= 30) return `⭐⭐${count}`;
    return `⭐⭐⭐${count}`;
  };

  return (
    <>
      {counter.map((item) => (
        <div
          className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8"
          key={item.id}
        >
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
              Counter App
            </h1>

            {/* Buttons */}
            <div className="flex gap-4 mb-6">
              <Button
                operation="increment"
                maxCountValue={maxCountValue}
                minCountValue={minCountValue}
                calculation={calculation}
                setCounter={setCounter}
                id={item.id}
              />
              <Button
                operation="decrement"
                setCounter={setCounter}
                maxCountValue={maxCountValue}
                minCountValue={minCountValue}
                calculation={calculation}
                id={item.id}
              />
            </div>

            {/* Counter Display */}
            <p
              className={`text-4xl font-bold text-center py-6 rounded-lg mb-6 ${
                item.count < 0
                  ? "bg-red-100 text-red-600"
                  : item.count === 0
                  ? "bg-gray-100 text-gray-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {getLogo(item.count)}
            </p>

            {/* Reset Button */}
            <div className="mb-6">
              <Button
                operation="reset"
                maxCountValue={maxCountValue}
                minCountValue={minCountValue}
                calculation={calculation}
                setCounter={setCounter}
                id={item.id}
              />
            </div>

            {/* Input Form */}
            <form
              className="mb-8 p-4 bg-indigo-50 rounded-lg"
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Step value by:
              </label>
              <input
                type="number"
                value={item.value}
                onChange={(e) => {
                  const value = e.target.value;

                  if (item.value === "") {
                    item.value === "";
                    return;
                  }

                  const num = Number(item.value);
                  if (
                    Number.isFinite(num) &&
                    num <= maxCountValue &&
                    num >= minCountValue
                  ) {
                    item.value = num;
                  }
                }}
                className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </form>

            {/* History Section */}
            <History list={item.list} />
            {/* {item.list.length > 0 && (
              <button
                onClick={() => setList([])}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
              >
                Reset History
              </button>
            )} */}
          </div>
          <StatBoard
            largest={item.maxCount}
            smallest={item.minCount}
            action={item.action}
          />
        </div>
      ))}
    </>
  );
}
