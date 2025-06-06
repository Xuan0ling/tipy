"use client";
import Navbar from "../components/Navbar";
import { useState } from "react";

// 假歷史紀錄資料
const fakeRecords = [
    {
        date: "2025-06-06",
        totalTips: 450,
        cash: 270,
        card: 180,
        employees: [
            { name: "Alice", hours: 8, role: "Server", percent: 23, tips: 103.5 },
            { name: "Bob", hours: 6, role: "Kitchen", percent: 17, tips: 76.5 },
            { name: "Cindy", hours: 4, role: "Server", percent: 11, tips: 49.5 },
        ],
        totalEmployees: 7,
        totalHours: 42,
    },
    {
        date: "2025-06-05",
        totalTips: 380,
        cash: 200,
        card: 180,
        employees: [
            { name: "Alice", hours: 7, role: "Server", percent: 21, tips: 79.8 },
            { name: "Bob", hours: 5, role: "Kitchen", percent: 15, tips: 57 },
            { name: "Cindy", hours: 6, role: "Server", percent: 18, tips: 68.4 },
        ],
        totalEmployees: 6,
        totalHours: 36,
    },
];

export default function ReportsPage() {
    const [selected, setSelected] = useState<string | null>(null);
    const record = fakeRecords.find(r => r.date === selected);

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Navbar />
            <div className="max-w-4xl mx-auto mt-8 px-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">歷史紀錄查詢</h1>
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">分配紀錄列表</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">日期</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">總小費</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">現金</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">刷卡</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">出勤人數</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">總工時</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">操作</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {fakeRecords.map(r => (
                                <tr key={r.date}>
                                    <td className="px-4 py-2 whitespace-nowrap text-[#007AFF] font-bold cursor-pointer" onClick={() => setSelected(r.date)}>{r.date}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-gray-900">${r.totalTips.toFixed(2)}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-gray-900">${r.cash.toFixed(2)}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-gray-900">${r.card.toFixed(2)}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-gray-900">{r.totalEmployees}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-gray-900">{r.totalHours}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        <button className="!text-[#007AFF] underline !rounded-md bg-gray-100 !shadow-sm" onClick={() => setSelected(r.date)}>查看明細</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {record && (
                    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-gray-900">{record.date} 分配明細</h2>
                            <button className="!text-[#007AFF] underline !rounded-md bg-gray-100 !shadow-sm" onClick={() => setSelected(null)}>返回列表</button>
                        </div>
                        <div className="mb-2 text-gray-700 text-sm">總小費：<span className="font-bold text-[#007AFF]">${record.totalTips.toFixed(2)}</span>（現金 ${record.cash.toFixed(2)} + 刷卡 ${record.card.toFixed(2)}）</div>
                        <div className="mb-2 text-gray-700 text-sm">出勤人數：{record.totalEmployees}，總工時：{record.totalHours}</div>
                        <table className="min-w-full divide-y divide-gray-200 mt-4">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">姓名</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">工時</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">角色</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">% 分配</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">分得小費</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {record.employees.map((e, i) => (
                                    <tr key={i}>
                                        <td className="px-4 py-2 whitespace-nowrap text-gray-900">{e.name}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-gray-900">{e.hours}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-gray-900">{e.role}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-gray-900">{e.percent}%</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-[#007AFF] font-bold">${e.tips.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </main>
    );
} 