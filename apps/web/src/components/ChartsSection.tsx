"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const lineData = [
  { name: "Jan", value: 5000 },
  { name: "Feb", value: 9000 },
  { name: "Mar", value: 16000 },
];

const pieData = [
  { name: "Bills & Utilities", value: 1867, color: "#3b82f6" },
  { name: "Shopping", value: 642, color: "#10b981" },
  { name: "Transportation", value: 422, color: "#f59e0b" },
  { name: "Food & Dining", value: 323, color: "#a855f7" },
  { name: "Healthcare", value: 233, color: "#06b6d4" },
  { name: "Entertainment", value: 168, color: "#ef4444" },
];

export default function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
      {/*  Line Chart */}
      <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
        <h3 className="text-sm font-medium text-gray-700 mb-3 sm:mb-4">
          Balance Trend
        </h3>

        {/* Responsive height */}
        <div className="w-full h-[220px] sm:h-[260px] lg:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#000000"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/*  Pie Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 flex flex-col">
        <h3 className="text-sm font-medium text-gray-700 mb-3 sm:mb-4">
          Spending Breakdown
        </h3>

        {/* Chart */}
        <div className="w-full h-[200px] sm:h-[240px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 space-y-2">
          {pieData.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between text-xs sm:text-sm text-gray-600"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="truncate">{item.name}</span>
              </div>

              <span className="font-medium">${item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
