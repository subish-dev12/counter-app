function Button({ setCounter, operation, id, calculation, children }) {
  const handleClick = () => {
    if (operation === "reset/count") {
      // item.count = 0;
      // item.value = 1;
      // item.list = [...item.list, 0];  <--------- direct mutation bad practice
      // item.action = 0;
      setCounter((prevCounter) =>
        prevCounter.map((counterItem) =>
          counterItem.id === id
            ? {
                ...counterItem,
                count: 0,
                value: 1,
                // list: [...counterItem.list, 0],
                // action: 0,
              }
            : counterItem
        )
      );
    }
    if (operation === "reset/history") {
      setCounter((prevCounter) =>
        prevCounter.map((item) =>
          item.id === id ? { ...item, list: [] } : item
        )
      );
    }
    if (operation === "increment") calculation("increment", id);
    if (operation === "decrement") calculation("decrement", id);
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
      {/* {operation === "reset/count"
        ? "reset-count"
        : operation === "increment"  <----------- this whole check is not required if we pass the data through the children prop 
        ? `+`
        : operation === "reset/history"
        ? children

        : `-`} */}
      {children}
    </button>
  );
}

export default Button;
