// src/components/common/Header.js
import React from "react";

export default function Header({
  title = "Food Paradise: Super Admin Access",
  initials = "R",
  rightContent = "Tuesday - Feb 23, 2026 | 12:15 pm",   // optional extra elements (POS: cart, search, etc.)
}) {
  return (
    <header className="flex items-center justify-between p-4 shadow-md bg-gradient-to-r from-emerald-600 to-emerald-700 text-white w-full">
      
      {/* App Title */}
      <h1 className="text-2xl font-semibold">{title}</h1>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {rightContent && <div>{rightContent}</div>}

        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="h-10 w-10 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center font-bold">
            {initials}
          </div>
        </div>
      </div>

    </header>
  );
}