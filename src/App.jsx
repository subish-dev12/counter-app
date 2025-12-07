import { useCallback, useEffect, useState } from "react";
import Button from "./Button";
import StatBoard from "./StatBoard";
export default function App() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(1);
  const [list, setList] = useState([]);
  const [action, setAction] = useState(0);

  const maxCountValue = 100;
  const minCountValue = -100;

  const calculation = useCallback(
    (operation) => {
      setCount((prevCount) => {
        if (prevCount >= maxCountValue && operation === "increment")
          return prevCount;
        // if (prevCount >= maxCountValue || prevCount <= minCountValue)
        if (value === "") {
          setValue(1);
        }
        const newCount =
          operation === "increment" ? prevCount + value : prevCount - value;
        console.log("newcount would be", typeof newCount);
        setList((prevList) => [...prevList, newCount]);
        setAction((prevAction) => prevAction + 1);
        return newCount;
      });
    },
    [value, maxCountValue]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
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

  const largest = list.length > 0 ? Math.max(...list) : 0;
  const smallest = list.length > 0 ? Math.min(...list) : 0;

  const getLogo = (count) => {
    if (count < 0) return `💀${count}`;
    if (count === 0) return `⚪${count}`;
    if (count <= 10) return `⭐${count}`;
    if (count <= 30) return `⭐⭐${count}`;
    return `⭐⭐⭐${count}`;
  };

  const lastThree = list.slice(-3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          Counter App
        </h1>

        {/* Buttons */}
        <div className="flex gap-4 mb-6">
          <Button
            operation="add"
            setCount={setCount}
            value={value}
            setList={setList}
            count={count}
            setAction={setAction}
            maxCountValue={maxCountValue}
            minCountValue={minCountValue}
            calculation={calculation}
          />
          <Button
            operation="subtract"
            setCount={setCount}
            value={value}
            setList={setList}
            count={count}
            setAction={setAction}
            maxCountValue={maxCountValue}
            minCountValue={minCountValue}
            calculation={calculation}
          />
        </div>

        {/* Counter Display */}
        <p
          className={`text-4xl font-bold text-center py-6 rounded-lg mb-6 ${
            count < 0
              ? "bg-red-100 text-red-600"
              : count === 0
              ? "bg-gray-100 text-gray-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {getLogo(count)}
        </p>

        {/* Reset Button */}
        <div className="mb-6">
          <Button
            operation="reset"
            setCount={setCount}
            setValue={setValue}
            setList={setList}
            count={count}
            setAction={setAction}
            maxCountValue={maxCountValue}
            minCountValue={minCountValue}
            calculation={calculation}
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
            value={value}
            max={100}
            min={-100}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "") {
                setValue("");
              } else {
                const num = Number(value);
                if (
                  Number.isFinite(num) &&
                  num <= maxCountValue &&
                  num >= minCountValue
                ) {
                  setValue(num);
                }
              }
            }}
            className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </form>

        {/* History Section */}
        <h3 className="text-xl font-bold text-gray-800 mb-4">History:</h3>
        {list.length > 0 && (
          <div className="mb-4 overflow-x-auto">
            <table className="w-full border-collapse border border-indigo-300">
              <thead>
                <tr className="bg-indigo-600">
                  <th className="border border-indigo-300 px-4 py-2 text-white font-semibold">
                    History
                  </th>
                </tr>
              </thead>
              <tbody>
                {lastThree.map((item, index) => (
                  <tr
                    key={index}
                    className={`border border-indigo-300 ${
                      index % 2 === 0 ? "bg-indigo-50" : "bg-white"
                    } hover:bg-indigo-100`}
                  >
                    <td className="px-4 py-2 text-center text-gray-700 font-medium">
                      {item}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {list.length > 0 && (
          <button
            onClick={() => setList([])}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Reset History
          </button>
        )}
      </div>
      <StatBoard largest={largest} smallest={smallest} action={action} />
    </div>
  );
}
