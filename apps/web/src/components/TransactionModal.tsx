"use client";

import { useState } from "react";

type TransactionInput = {
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
};

export default function TransactionModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: TransactionInput) => void;
}) {
  const [form, setForm] = useState<TransactionInput>({
    title: "",
    amount: 0,
    type: "expense",
    category: "",
    date: "",
  });

  const handleSubmit = () => {
    if (!form.title || !form.category || !form.date || form.amount <= 0) {
      alert("Please fill all fields correctly");
      return;
    }

    onSave(form);

    setForm({
      title: "",
      amount: 0,
      type: "expense",
      category: "",
      date: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-5 sm:p-6 space-y-5"
      >
        {/* Header */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Add Transaction
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Enter transaction details
          </p>
        </div>

        {/* Form */}
        <div className="space-y-3">
          <Input
            placeholder="Title"
            value={form.title}
            onChange={(val) => setForm({ ...form, title: val })}
          />

          <Input
            placeholder="Amount"
            type="number"
            value={form.amount}
            onChange={(val) => setForm({ ...form, amount: Number(val) })}
          />

          <select
            value={form.type}
            onChange={(e) =>
              setForm({
                ...form,
                type: e.target.value as "income" | "expense",
              })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <Input
            placeholder="Category"
            value={form.category}
            onChange={(val) => setForm({ ...form, category: val })}
          />

          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium bg-black text-white rounded-lg hover:opacity-90"
          >
            Save Transaction
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🔹 Improved Input */
function Input({
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  placeholder: string;
  value: string | number;
  onChange: (val: string) => void;
  type?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
    />
  );
}
