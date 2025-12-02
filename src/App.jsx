import { useState } from "react";
// import AddButton from "./AddButton";
import Button from "./Button";

export default function App() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(1);
  const [list, setList] = useState([]);

  const getLogo = (count) => {
    if (count < 0) return `💀${count}`;
    if (count === 0) return `⚪${count}`;
    if (count <= 10) return `⭐${count}`;
    if (count <= 30) return `⭐⭐${count}`;
    return `⭐⭐⭐${count}`;
  };

  return (
    <>
      <Button
        operation="add"
        setCount={setCount}
        value={value}
        setList={setList}
        count={count}
      />
      <Button
        operation="subtract"
        setCount={setCount}
        value={value}
        setList={setList}
        count={count}
      />
      <p style={{ color: count < 0 ? "red" : count === 0 ? "gray" : "green" }}>
        Counter:{getLogo(count)}
      </p>
      <Button
        operation="reset"
        setCount={setCount}
        setValue={setValue}
        setList={setList}
        count={count}
      />{" "}
      <br />
      <form action="  ">
        <label>
          Step value by:
          <input
            type="number"
            value={value}
            onChange={(e) =>
              setValue(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </label>
      </form>
      <h3>History:</h3>
      {console.log(list)}
      {list.length > 3 && (
        <ul>
          {list.map((index, item) => (
            <li key={item}>{index}</li>
          ))}
        </ul>
      )}
    </>
  );
}
