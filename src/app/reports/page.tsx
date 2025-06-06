"use client";
import Navbar from "../components/Navbar";
import { useState } from "react";

const employeeSummary = [
    { name: "Alice", hours: 34, sales: 3000, tips: 450, earnings: 3450 },
    { name: "Bob", hours: 28, sales: 2500, tips: 400, earnings: 2900 },
    { name: "Carol", hours: 40, sales: null, tips: null, earnings: null },
];

const dailyBreakdown = [
    { date: "2025-06-01", Alice: 320, Bob: 280, Carol: null, total: 600 },
    { date: "2025-06-02", Alice: 400, Bob: 350, Carol: null, total: 750 },
    { date: "2025-06-03", Alice: 380, Bob: 320, Carol: null, total: 700 },
    { date: "2025-06-04", Alice: 420, Bob: 400, Carol: null, total: 820 },
];

export default function ReportsPage() {
    const [view, setView] = useState<"employee" | "daily">("employee");
    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Navbar />
            <div className="max-w-5xl mx-auto py-10 px-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">報表</h1>
                <div className="flex gap-4 mb-6">
                    <button
                        className={`px-4 py-2 rounded-md font-medium border transition-colors duration-200 ${view === "employee" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50"}`}
                        onClick={() => setView("employee")}
                    >
                        員工彙總
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md font-medium border transition-colors duration-200 ${view === "daily" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50"}`}
                        onClick={() => setView("daily")}
                    >
                        每日明細
                    </button>
                </div>
                {/* 員工彙總表格 */}
                {view === "employee" && (
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">員工彙總</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">員工</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">總工時</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">總銷售</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">總小費</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">總收入</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {employeeSummary.map((emp, i) => (
                                        <tr key={i}>
                                            <td className="px-4 py-2 whitespace-nowrap text-gray-900">{emp.name}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-gray-900">{emp.hours} 小時</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-gray-900">{emp.sales !== null ? `$${emp.sales}` : "—"}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-gray-900">{emp.tips !== null ? `$${emp.tips}` : "—"}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-gray-900">{emp.earnings !== null ? `$${emp.earnings}` : "—"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {/* 每日明細表格 */}
                {view === "daily" && (
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">每日明細</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">日期</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Alice</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Bob</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Carol</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">總計</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {dailyBreakdown.map((row, i) => (
                                        <tr key={i}>
                                            <td className="px-4 py-2 whitespace-nowrap text-gray-900">{row.date}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-gray-900">{row.Alice !== null ? `$${row.Alice}` : "—"}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-gray-900">{row.Bob !== null ? `$${row.Bob}` : "—"}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-gray-900">{row.Carol !== null ? "—" : "—"}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-gray-900">${row.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
} 