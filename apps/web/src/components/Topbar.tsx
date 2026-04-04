"use client";

import { useState } from "react";
import { useRole } from "@/context/RoleContext";

export default function Topbar() {
  const { role, setRole } = useRole();

  const handleRoleChange = (newRole: "admin" | "viewer") => {
    console.log("Switching role to:", newRole); // ✅ debug
    setRole(newRole);
  };

  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      {/* Left */}
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
          ZORVYN
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Manage your finances efficiently
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Role Switch */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => handleRoleChange("admin")}
            className={`px-3 py-1 text-xs sm:text-sm rounded-md transition-all duration-200 ${
              role === "admin"
                ? "bg-black text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Admin
          </button>

          <button
            onClick={() => handleRoleChange("viewer")}
            className={`px-3 py-1 text-xs sm:text-sm rounded-md transition-all duration-200 ${
              role === "viewer"
                ? "bg-black text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Viewer
          </button>
        </div>

        {/* Avatar */}
        <div className="h-9 w-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">
          {role === "admin" ? "A" : "V"}
        </div>
      </div>
    </div>
  );
}
