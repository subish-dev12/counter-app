// StatBoard Component
function StatBoard({ largest, smallest, action }) {
  return (
    <div className="mt-6 pt-5 border-t border-slate-200 bg-slate-50 px-6 py-5 rounded-b-xl">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3.5">
        Statistics
      </p>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 hover:border-emerald-300 transition-colors">
          <div className="text-2xl mb-1.5">📈</div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
            Peak
          </p>
          <p className="text-xl font-bold text-slate-900">
            {largest !== null ? largest : "—"}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 hover:border-rose-300 transition-colors">
          <div className="text-2xl mb-1.5">📉</div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
            Low
          </p>
          <p className="text-xl font-bold text-slate-900">
            {smallest !== null ? smallest : "—"}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 hover:border-indigo-300 transition-colors">
          <div className="text-2xl mb-1.5">⚡</div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
            Actions
          </p>
          <p className="text-xl font-bold text-slate-900">{action}</p>
        </div>
      </div>
    </div>
  );
}

export default StatBoard;
