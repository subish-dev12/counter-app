function MinusButton({ setCount }) {
  return (
    <div>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>-1</button>
    </div>
  );
}

export default MinusButton;
