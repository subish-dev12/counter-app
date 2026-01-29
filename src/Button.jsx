// import { useCallback, useEffect, useState } from "react";

// Button Component
function Button({ operation, children, onClick }) {
  const getButtonStyle = () => {
    switch (operation) {
      case "reset/count":
      case "reset/history":
        return "bg-slate-700 hover:bg-slate-800 text-white border-slate-600";
      case "increment":
        return "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500";
      case "decrement":
        return "bg-rose-600 hover:bg-rose-700 text-white border-rose-500";
      default:
        return "bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-500";
    }
  };

  return (
    <button
      className={`${getButtonStyle()} font-semibold py-2.5 px-5 rounded-lg transition-all duration-200 flex-1 shadow-sm hover:shadow-md border active:scale-95`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
