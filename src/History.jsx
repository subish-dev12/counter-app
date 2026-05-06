import Button from "./Button";

function History({ history, onReset, id, onResetHistory }) {
  console.log("actual history k ho ta", history);
  const lastThree = history?.slice(-3);
  console.log("last ko three k ho ", lastThree);

  return (
    <>
      {history.length > 0 ? (
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
              {lastThree.map((item, index) => (
                <tbody key={index}>
                  <tr className="border-b border-slate-100 hover:bg-slate-100 transition-colors last:border-b-0">
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
                        {item.count}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right text-slate-600 text-sm font-mono">
                      {item.time}
                    </td>
                  </tr>
                </tbody>
              ))}
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
      {/* Reset Buttons */}
      <div className="flex gap-2 mt-auto">
        {history?.length > 0 && (
          <>
            <Button onClick={() => onReset(id)}>Reset Count</Button>
            <Button onClick={() => onResetHistory(id)}>Clear History</Button>
          </>
        )}
      </div>
    </>
  );
}
export default History;
