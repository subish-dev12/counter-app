function Button({ setCount, operation, value, setValue, setList, count }) {
  const handleClick = () => {
    if (operation === "reset") {
      setCount(0);
      setValue(1);
      setList((prevList) => [...prevList, 0]);
    } else {
      const newCount = operation === "add" ? count + value : count - value;
      setCount(newCount);
      setList((prevList) => [...prevList, newCount]);
    }
  };
  return (
    <div>
      <button onClick={handleClick}>
        {operation === "reset"
          ? "reset"
          : operation === "add"
          ? `+${value}`
          : `-${value}`}
      </button>
    </div>
  );
}

export default Button;
