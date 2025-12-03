export default function StatBoard({ largest, smallest, action }) {
  return (
    <>
      <h1>Stat board</h1>
      <h2>Largest:{largest}</h2>
      <h2>Smallest:{smallest}</h2>
      <h2>Total operations:{action}</h2>
    </>
  );
}
