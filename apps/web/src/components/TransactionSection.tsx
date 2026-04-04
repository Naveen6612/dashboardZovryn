"use client";

import { Trash2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import TransactionModal from "@/components/TransactionModal";
import { useRole } from "@/context/RoleContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Transaction = {
  _id?: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
};

type TransactionInput = {
  title: string;
  amount: string | number;
  type: "income" | "expense";
  category: string;
  date: string;
};

export default function TransactionsSection() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");

  const { role } = useRole();
  const isAdmin = role === "admin";

  // Load data
  const loadTransactions = async () => {
    try {
      const res = await fetch(`${API_URL}/transactions`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setTransactions(data);
      } else if (Array.isArray(data.transactions)) {
        setTransactions(data.transactions);
      } else {
        setTransactions([]);
      }
    } catch {
      setTransactions([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadTransactions();
    };
    fetchData();
  }, []);

  //  Add
  const handleAdd = async (data: TransactionInput) => {
    await fetch(`${API_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        amount: Number(data.amount),
      }),
    });

    setShowModal(false);
    loadTransactions();
  };

  //  Delete
  const deleteTransaction = async (id: string) => {
    await fetch(`${API_URL}/transactions/${id}`, {
      method: "DELETE",
    });

    loadTransactions();
  };

  //  Filter
  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((t) => t.type === filter);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h3 className="font-medium text-gray-800 text-base sm:text-lg">
              Transactions
            </h3>

            <div className="flex flex-wrap items-center gap-2">
              {/* FILTER */}
              <div className="flex flex-wrap gap-2">
                {["all", "income", "expense"].map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      setFilter(type as "all" | "income" | "expense")
                    }
                    className={`px-3 py-1 rounded-lg text-xs sm:text-sm capitalize transition ${
                      filter === type
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* ADD */}
              {isAdmin && (
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm"
                >
                  <Plus size={14} /> Add
                </button>
              )}
            </div>
          </div>

          {/* List */}
          <div className="space-y-2 sm:space-y-3 max-h-[350px] sm:max-h-[400px] overflow-y-auto pr-1">
            {filteredTransactions.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-6">
                No transactions found
              </p>
            ) : (
              filteredTransactions.map((t) => (
                <div
                  key={t._id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition"
                >
                  {/* Left */}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {t.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {t.date} • {t.category}
                    </p>
                  </div>

                  {/* Right */}
                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <span
                      className={`text-sm font-semibold ${
                        t.type === "income" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {t.type === "income" ? "+" : "-"}${t.amount}
                    </span>

                    {isAdmin && (
                      <Trash2
                        size={14}
                        onClick={() => t._id && deleteTransaction(t._id)}
                        className="cursor-pointer text-gray-500 hover:text-red-600"
                      />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 space-y-4">
          <h3 className="font-medium text-gray-800 text-base sm:text-lg">
            Insights
          </h3>

          <InsightCard
            title="Top Spending Category"
            desc="Bills & Utilities — $1867 total"
          />

          <InsightCard
            title="Monthly Comparison"
            desc="Expenses decreased by 41%"
          />

          <InsightCard title="Savings Rate" desc="You're saving 82%" />
        </div>
      </div>

      {/* MODAL */}
      <TransactionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAdd}
      />
    </>
  );
}

function InsightCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
      <p className="text-sm font-medium text-gray-800">{title}</p>
      <p className="text-xs text-gray-500 mt-1">{desc}</p>
    </div>
  );
}
