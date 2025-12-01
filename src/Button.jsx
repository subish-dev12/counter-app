function Button({ setCount, operation, value }) {
  return (
    <div>
      <button
        onClick={() =>
          setCount((prevCount) =>
            operation === "reset"
              ? 0
              : operation === "add"
              ? value === ""
                ? prevCount + 1
                : prevCount + value
              : value === ""
              ? prevCount - 1
              : prevCount - value
          )
        }
      >
        {operation === "reset" ? "reset" : operation === "add" ? "+1" : "-1"}
      </button>
    </div>
  );
}

export default Button;
