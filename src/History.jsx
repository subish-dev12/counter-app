function History({ list }) {
  const lastThree = list.slice(-3);
  return (
    <>
      {list.length > 0 ? (
        <div className="mb-5">
          <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2.5">
            Recent Activity
          </h3>
          <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Value
                  </th>
                  <th className="px-4 py-2.5 text-right text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {lastThree.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 hover:bg-slate-100 transition-colors last:border-b-0"
                  >
                    <td className="px-4 py-2.5">
                      <span
                        className={`inline-flex items-center justify-center min-w-[2rem] h-8 px-2 rounded-md text-sm font-bold ${
                          item.value > 0
                            ? "bg-emerald-100 text-emerald-700"
                            : item.value < 0
                              ? "bg-rose-100 text-rose-700"
                              : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {item.value}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right text-slate-600 text-sm font-mono">
                      {item.timeStamp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="mb-5 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 py-12 px-4">
          <p className="text-center text-slate-500 text-lg font-medium">
            Press + or - to start the counter
          </p>
        </div>
      )}
    </>
  );
}
export default History;
