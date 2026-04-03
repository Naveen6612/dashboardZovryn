import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
      {/* Total Balance */}
      <Card
        title="Total Balance"
        value="$16,745.03"
        icon={<Wallet />}
        color="text-black"
        bg="bg-gray-100"
      />

      {/* Income */}
      <Card
        title="Income"
        value="$20,400.00"
        icon={<TrendingUp />}
        color="text-green-600"
        bg="bg-green-100"
      />

      {/* Expenses */}
      <Card
        title="Expenses"
        value="$3,654.97"
        icon={<TrendingDown />}
        color="text-red-600"
        bg="bg-red-100"
      />
    </div>
  );
}

function Card({
  title,
  value,
  icon,
  color,
  bg,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 flex items-center justify-between hover:shadow-sm transition">
      {/* Left */}
      <div className="space-y-1">
        <p className="text-xs sm:text-sm text-gray-500">{title}</p>

        <h2 className={`text-lg sm:text-xl lg:text-2xl font-semibold ${color}`}>
          {value}
        </h2>
      </div>

      {/* Right Icon */}
      <div
        className={`p-2 sm:p-3 rounded-lg ${bg} flex items-center justify-center`}
      >
        <div className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700">{icon}</div>
      </div>
    </div>
  );
}
