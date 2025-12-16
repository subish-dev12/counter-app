function Button({ setCount, operation, setValue, item, calculation }) {
  const handleClick = () => {
    if (operation === "reset") {
      item.count = 0;
      item.value = 1;
      item.list = [...item.list, 0];
      item.action = 0;
    }
    if (operation === "increment") calculation("increment");
    if (operation === "decrement") calculation("decrement");
  };

  const getButtonStyle = () => {
    if (operation === "reset") {
      return "bg-red-500 hover:bg-red-600";
    } else if (operation === "add") {
      return "bg-green-500 hover:bg-green-600";
    } else {
      return "bg-orange-500 hover:bg-orange-600";
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${getButtonStyle()} text-white font-bold py-3 px-6 rounded-lg transition duration-200 flex-1 text-lg shadow-md hover:shadow-lg`}
    >
      {operation === "reset"
        ? "Reset"
        : operation === "increment"
        ? `+${value}`
        : `-${value}`}
    </button>
  );
}

export default Button;
