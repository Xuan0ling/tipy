"use client";
import Navbar from "../components/Navbar";
import { useState } from "react";

const fakeStore = { name: "Tipy 餐廳", accessCode: "ABC123" };
const fakeEmployees = [
    { id: 1, name: "林小華", role: "Server" },
    { id: 2, name: "陳大明", role: "Kitchen" },
];

export default function SettingsPage() {
    const [showAddEmployee, setShowAddEmployee] = useState(false);
    const [addForm, setAddForm] = useState({ name: "", role: "Server" });
    const [pwdForm, setPwdForm] = useState({ old: "", new1: "", new2: "" });

    function handleAddEmployee(e: React.FormEvent) {
        e.preventDefault();
        // mock 新增員工
        setShowAddEmployee(false);
        setAddForm({ name: "", role: "Server" });
        alert("員工已新增（假資料）");
    }

    function handlePwdChange(e: React.FormEvent) {
        e.preventDefault();
        // mock 修改密碼
        setPwdForm({ old: "", new1: "", new2: "" });
        alert("密碼已修改（假資料）");
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Navbar />
            <div className="max-w-2xl mx-auto mt-8 px-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">設定</h1>
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">店家資訊</h2>
                    <div className="mb-2 text-gray-700">店名：<span className="font-bold">{fakeStore.name}</span></div>
                    <div className="mb-2 text-gray-700">店家代碼：<span className="font-mono text-[#007AFF]">{fakeStore.accessCode}</span></div>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-900">員工管理</h2>
                        <button className="bg-[#007AFF] text-white px-4 py-2 rounded-xl font-medium shadow hover:bg-[#0051a8] transition-colors duration-200" onClick={() => setShowAddEmployee(v => !v)}>
                            {showAddEmployee ? "取消" : "新增員工"}
                        </button>
                    </div>
                    {showAddEmployee && (
                        <form className="space-y-4 mb-6" onSubmit={handleAddEmployee}>
                            <div className="flex gap-4">
                                <input type="text" placeholder="姓名" className="rounded-xl border-gray-300 px-4 py-2 flex-1" value={addForm.name} onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))} required />
                                <select className="rounded-xl border-gray-300 px-4 py-2 w-32" value={addForm.role} onChange={e => setAddForm(f => ({ ...f, role: e.target.value }))}>
                                    <option value="Server">Server</option>
                                    <option value="Kitchen">Kitchen</option>
                                </select>
                                <button type="submit" className="bg-[#007AFF] text-white px-4 py-2 rounded-xl font-medium shadow hover:bg-[#0051a8] transition-colors duration-200">送出</button>
                            </div>
                        </form>
                    )}
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">姓名</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">角色</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {fakeEmployees.map(emp => (
                                <tr key={emp.id}>
                                    <td className="px-4 py-2 whitespace-nowrap text-gray-900">{emp.name}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-gray-900">{emp.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">分配規則設定</h2>
                    <div className="text-gray-700 mb-2">（此區可擴充：工時加權、角色加權、固定分配等設定）</div>
                    <div className="text-gray-500 text-sm">目前僅支援預設規則，未來可於此自訂分配邏輯。</div>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">修改密碼</h2>
                    <form className="space-y-4" onSubmit={handlePwdChange}>
                        <input type="password" placeholder="舊密碼" className="w-full rounded-xl border-gray-300 px-4 py-2" value={pwdForm.old} onChange={e => setPwdForm(f => ({ ...f, old: e.target.value }))} required />
                        <input type="password" placeholder="新密碼" className="w-full rounded-xl border-gray-300 px-4 py-2" value={pwdForm.new1} onChange={e => setPwdForm(f => ({ ...f, new1: e.target.value }))} required />
                        <input type="password" placeholder="確認新密碼" className="w-full rounded-xl border-gray-300 px-4 py-2" value={pwdForm.new2} onChange={e => setPwdForm(f => ({ ...f, new2: e.target.value }))} required />
                        <div className="flex justify-end">
                            <button type="submit" className="bg-[#007AFF] text-white px-4 py-2 rounded-xl font-medium shadow hover:bg-[#0051a8] transition-colors duration-200">送出</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
} 