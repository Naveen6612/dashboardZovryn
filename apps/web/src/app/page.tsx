"use client";
import ChartsSection from "@/components/ChartsSection";

import SummaryCards from "@/components/SummaryCard";
import Topbar from "@/components/Topbar";
import TransactionsSection from "@/components/TransactionSection";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 min-h-screen">
      <div className="flex-1 p-6 overflow-y-auto">
        <Topbar />

        <SummaryCards />
        <ChartsSection />
        <TransactionsSection />
        {/* Next sections will go here */}
      </div>
    </div>
  );
}
