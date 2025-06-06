"use client";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");
        // mock 驗證
        setTimeout(() => {
            if (email === "manager@example.com" && password === "password123") {
                alert("登入成功！(這裡可導向主控台)");
            } else {
                setError("帳號或密碼錯誤");
            }
            setLoading(false);
        }, 800);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-6"
            >
                <h1 className="text-2xl font-bold text-center mb-2 text-gray-900">管理員登入</h1>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        className="rounded-xl border border-gray-300 px-4 py-3 text-base focus:border-[#007AFF] focus:ring-[#007AFF] bg-gray-50"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="manager@example.com"
                        required
                        autoFocus
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">密碼</label>
                    <input
                        type="password"
                        className="rounded-xl border border-gray-300 px-4 py-3 text-base focus:border-[#007AFF] focus:ring-[#007AFF] bg-gray-50"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="請輸入密碼"
                        required
                    />
                </div>
                {error && <div className="text-red-500 text-sm text-center font-medium">{error}</div>}
                <button
                    type="submit"
                    className="mt-2 bg-[#007AFF] text-white rounded-xl py-3 font-semibold text-lg shadow hover:bg-[#0051a8] transition-colors duration-200 disabled:opacity-60"
                    disabled={loading}
                >
                    {loading ? "登入中..." : "登入"}
                </button>
            </form>
        </div>
    );
} 