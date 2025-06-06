"use client";
import { useState } from "react";

const fakeResult = {
    date: "2025-06-06",
    storeCode: "ABC123",
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
};

export default function PublicPage() {
    const [storeCode, setStoreCode] = useState("");
    const [date, setDate] = useState("");
    const [result, setResult] = useState<any | null>(null);
    const [error, setError] = useState("");

    function handleQuery(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        // mock 查詢
        if (storeCode === "ABC123" && date === "2025-06-06") {
            setResult(fakeResult);
        } else {
            setResult(null);
            setError("查無資料，請確認店家代碼與日期");
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center py-12 px-4">
            <div className="w-full max-w-lg">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">員工分配查詢</h1>
                <form className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6 mb-8" onSubmit={handleQuery}>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">店家代碼</label>
                        <input type="text" className="rounded-xl border-gray-300 px-4 py-3 text-base bg-gray-50" value={storeCode} onChange={e => setStoreCode(e.target.value)} placeholder="請輸入店家代碼" required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">日期</label>
                        <input type="date" className="rounded-xl border-gray-300 px-4 py-3 text-base bg-gray-50" value={date} onChange={e => setDate(e.target.value)} required />
                    </div>
                    {error && <div className="text-red-500 text-sm text-center font-medium">{error}</div>}
                    <button type="submit" className="mt-2 bg-[#007AFF] text-white rounded-xl py-3 font-semibold text-lg shadow hover:bg-[#0051a8] transition-colors duration-200">查詢</button>
                </form>
                {result && (
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <div className="mb-2 text-gray-700 text-sm">日期：<span className="font-bold text-[#007AFF]">{result.date}</span></div>
                        <div className="mb-2 text-gray-700 text-sm">總小費：<span className="font-bold text-[#007AFF]">${result.totalTips.toFixed(2)}</span>（現金 ${result.cash.toFixed(2)} + 刷卡 ${result.card.toFixed(2)}）</div>
                        <div className="mb-2 text-gray-700 text-sm">出勤人數：{result.totalEmployees}，總工時：{result.totalHours}</div>
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
                                {result.employees.map((e: any, i: number) => (
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