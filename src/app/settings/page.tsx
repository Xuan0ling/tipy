"use client";
import Navbar from "../components/Navbar";
import { useState } from "react";

const fakeStores = [
    { id: 1, name: "台北一店" },
    { id: 2, name: "新竹分店" },
];

const fakeUser = {
    name: "王小明",
    role: "owner",
    storeId: 1,
    email: "owner@example.com",
    tipRate: 0.15,
};

const fakeEmployees = [
    { id: 1, name: "林小華", email: "emp1@example.com", role: "server", tipRate: 0.1 },
    { id: 2, name: "陳大明", email: "emp2@example.com", role: "employee", tipRate: 0 },
];

export default function SettingsPage() {
    const [selectedStore, setSelectedStore] = useState(fakeUser.storeId);
    const [showAddEmployee, setShowAddEmployee] = useState(false);
    const [showChangePwd, setShowChangePwd] = useState(false);
    const [addForm, setAddForm] = useState({ name: "", email: "", role: "server", tipRate: "0.1" });
    const [pwdForm, setPwdForm] = useState({ old: "", new1: "", new2: "" });

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Navbar />
            <div className="max-w-2xl mx-auto py-12 px-4 space-y-8">
                {/* 個人資料卡片 */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">個人資料</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700">姓名</span>
                            <span className="font-medium text-gray-900">{fakeUser.name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700">角色</span>
                            <span className="font-medium text-indigo-600">
                                {fakeUser.role === "admin" && "管理員"}
                                {fakeUser.role === "owner" && "店主"}
                                {fakeUser.role === "server" && "服務生"}
                                {fakeUser.role === "employee" && "一般員工"}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700">Email</span>
                            <span className="font-medium text-gray-900">{fakeUser.email}</span>
                        </div>
                        {fakeUser.role !== "owner" && (
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">小費分成</span>
                                <span className="font-medium text-gray-900">{fakeUser.tipRate * 100}%</span>
                            </div>
                        )}
                    </div>
                </div>
                {/* 切換店家 */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">切換店家</h2>
                    <select
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                        value={selectedStore}
                        onChange={e => setSelectedStore(Number(e.target.value))}
                    >
                        {fakeStores.map(store => (
                            <option key={store.id} value={store.id} className="text-gray-900">{store.name}</option>
                        ))}
                    </select>
                </div>
                {/* 員工管理 */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-900">員工管理</h2>
                        <button
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors duration-200"
                            onClick={() => setShowAddEmployee(v => !v)}
                        >
                            {showAddEmployee ? "取消" : "新增員工"}
                        </button>
                    </div>
                    {showAddEmployee && (
                        <form className="space-y-4 mb-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input type="text" placeholder="姓名" className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" value={addForm.name} onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))} />
                                <input type="email" placeholder="Email" className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" value={addForm.email} onChange={e => setAddForm(f => ({ ...f, email: e.target.value }))} />
                                <select className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" value={addForm.role} onChange={e => setAddForm(f => ({ ...f, role: e.target.value }))}>
                                    <option value="server">服務生</option>
                                    <option value="employee">一般員工</option>
                                </select>
                                <input type="number" min={0} max={1} step={0.01} placeholder="小費分成(0~1)" className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" value={addForm.tipRate} onChange={e => setAddForm(f => ({ ...f, tipRate: e.target.value }))} />
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors duration-200">送出</button>
                            </div>
                        </form>
                    )}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">姓名</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">EMAIL</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">角色</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {fakeEmployees.map(emp => (
                                    <tr key={emp.id}>
                                        <td className="px-4 py-2 whitespace-nowrap text-gray-900">{emp.name}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-gray-900">{emp.email}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-gray-900">{emp.role === "server" ? "服務生" : "一般員工"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* 修改密碼 */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-900">修改密碼</h2>
                        <button
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors duration-200"
                            onClick={() => setShowChangePwd(v => !v)}
                        >
                            {showChangePwd ? "取消" : "修改密碼"}
                        </button>
                    </div>
                    {showChangePwd && (
                        <form className="space-y-4">
                            <input type="password" placeholder="舊密碼" className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" value={pwdForm.old} onChange={e => setPwdForm(f => ({ ...f, old: e.target.value }))} />
                            <input type="password" placeholder="新密碼" className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" value={pwdForm.new1} onChange={e => setPwdForm(f => ({ ...f, new1: e.target.value }))} />
                            <input type="password" placeholder="確認新密碼" className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" value={pwdForm.new2} onChange={e => setPwdForm(f => ({ ...f, new2: e.target.value }))} />
                            <div className="flex justify-end">
                                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors duration-200">送出</button>
                            </div>
                        </form>
                    )}
                </div>
                {/* 登出 */}
                <div className="flex justify-end">
                    <button className="bg-red-500 text-white px-6 py-2 rounded-md font-medium hover:bg-red-600 transition-colors duration-200 shadow">
                        登出
                    </button>
                </div>
            </div>
        </main>
    );
} 