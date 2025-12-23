function History({ list }) {
  const lastThree = list.slice(-3);
  return (
    <>
      {list.length > 0 && (
        <div className="mb-4 overflow-x-auto">
          <h3 className="text-xl font-bold text-gray-800 mb-4">History:</h3>
          <table className="w-full border-collapse border border-indigo-300">
            <thead>
              <tr className="bg-indigo-600">
                <th className="border border-indigo-300 px-4 py-2 text-white font-semibold">
                  History
                </th>
                <th className="border border-indigo-300 px-4 py-2 text-white font-semibold">
                  Time
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
                    {item.value}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-700 font-medium">
                    {item.timeStamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default History;
