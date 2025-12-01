import { useState } from "react";
// import AddButton from "./AddButton";
import Button from "./Button";

export default function App() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");

  return (
    <>
      <Button operation="add" setCount={setCount} value={value} />
      <Button operation="subtract" setCount={setCount} value={value} />
      <p style={{ color: count < 0 ? "red" : count === 0 ? "gray" : "green" }}>
        Counter:{count}
      </p>
      <Button operation="reset" setCount={setCount} /> <br />
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
      {value > 0 && <p>Step value: {value}</p>}
      {console.log(typeof value)}
    </>
  );
}
