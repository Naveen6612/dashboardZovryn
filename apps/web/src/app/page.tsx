"use client";

import ChartsSection from "@/components/ChartsSection";
import SummaryCards from "@/components/SummaryCard";
import Topbar from "@/components/Topbar";
import TransactionsSection from "@/components/TransactionSection";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 p-6 space-y-6">
        <Topbar />

        <SummaryCards />
        <ChartsSection />
        <TransactionsSection />
        <Analytics />
      </div>
    </div>
  );
}
