"use client";
import Navbar from "../components/Navbar";
import { useState } from "react";

const fakeEmployees = [
    { id: 1, name: "林小華" },
    { id: 2, name: "陳大明" },
    { id: 3, name: "王小美" },
];

const fakeRecords = [
    {
        id: 1,
        date: "2024-06-06",
        serverId: 1,
        sales: 1200,
        tips: 200,
    },
    {
        id: 2,
        date: "2024-06-06",
        serverId: 2,
        sales: 800,
        tips: 120,
    },
];

function calcTipSplit(tips: number, serverId: number, employees: { id: number, name: string }[]) {
    if (!tips || !serverId) return { server: 0, others: [] };
    const others = employees.filter(e => e.id !== serverId);
    const serverTip = Math.round(tips * 0.6 * 100) / 100;
    const otherTip = others.length > 0 ? Math.round((tips * 0.4 / others.length) * 100) / 100 : 0;
    return {
        server: serverTip,
        others: others.map(e => ({ ...e, tip: otherTip })),
    };
}

export default function ShiftTablePage() {
    const [form, setForm] = useState({
        date: new Date().toISOString().slice(0, 10),
        serverId: fakeEmployees[0].id,
        sales: "",
        tips: "",
    });
    const [records, setRecords] = useState(fakeRecords);

    const tipSplit = calcTipSplit(Number(form.tips), Number(form.serverId), fakeEmployees);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setRecords([
            {
                id: records.length + 1,
                date: form.date,
                serverId: Number(form.serverId),
                sales: Number(form.sales),
                tips: Number(form.tips),
            },
            ...records,
        ]);
        setForm({ ...form, sales: "", tips: "" });
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Navbar />
            <div className="max-w-3xl mx-auto py-12 px-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">新增結帳記錄</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">日期</label>
                                <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">主服務員</label>
                                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900" value={form.serverId} onChange={e => setForm(f => ({ ...f, serverId: Number(e.target.value) }))}>
                                    {fakeEmployees.map(emp => (
                                        <option key={emp.id} value={emp.id} className="text-gray-900">{emp.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">銷售額</label>
                                <input type="number" min={0} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value={form.sales} onChange={e => setForm(f => ({ ...f, sales: e.target.value }))} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">小費</label>
                                <input type="number" min={0} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value={form.tips} onChange={e => setForm(f => ({ ...f, tips: e.target.value }))} required />
                            </div>
                        </div>
                        {/* 小費分配即時顯示 */}
                        {form.tips && (
                            <div className="bg-indigo-50 rounded-md p-4 mt-2">
                                <div className="font-medium text-indigo-700 mb-2">小費分配結果：</div>
                                <div className="flex flex-wrap gap-4">
                                    <div className="text-sm text-gray-800">
                                        主服務員 <span className="font-bold">{fakeEmployees.find(e => e.id === Number(form.serverId))?.name}</span>：<span className="text-indigo-700 font-bold">${tipSplit.server}</span>
                                    </div>
                                    {tipSplit.others.map(e => (
                                        <div key={e.id} className="text-sm text-gray-800">
                                            其他員工 <span className="font-bold">{e.name}</span>：<span className="text-purple-700 font-bold">${e.tip}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="flex justify-end">
                            <button type="submit" className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                                新增紀錄
                            </button>
                        </div>
                    </form>
                </div>
                <div className="bg-white rounded-2xl shadow p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">今日結帳記錄</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">日期</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">主服務員</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">銷售額</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">小費</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">分配明細</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {records.map((rec) => {
                                    const split = calcTipSplit(rec.tips, rec.serverId, fakeEmployees);
                                    return (
                                        <tr key={rec.id}>
                                            <td className="px-4 py-2 whitespace-nowrap text-gray-900">{rec.date}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-gray-900">{fakeEmployees.find(e => e.id === rec.serverId)?.name}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-gray-900">${rec.sales}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-gray-900">${rec.tips}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-gray-900">
                                                <span className="text-indigo-700 font-bold">主 {split.server}</span>
                                                {split.others.map(e => (
                                                    <span key={e.id} className="ml-2 text-purple-700 font-bold">{e.name} {e.tip}</span>
                                                ))}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
} 