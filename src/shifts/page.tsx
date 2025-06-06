'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function ShiftsPage() {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [restMinutes, setRestMinutes] = useState(0);
    const [sales, setSales] = useState('');
    const [tips, setTips] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: 處理表單提交
        console.log({
            startTime,
            endTime,
            restMinutes,
            sales,
            tips,
        });
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Navbar />
            <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                        <div className="px-6 py-8 sm:px-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">新增班表</h2>
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                                            開始時間
                                        </label>
                                        <input
                                            type="datetime-local"
                                            id="startTime"
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                                            結束時間
                                        </label>
                                        <input
                                            type="datetime-local"
                                            id="endTime"
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="restMinutes" className="block text-sm font-medium text-gray-700">
                                        休息時間（分鐘）
                                    </label>
                                    <input
                                        type="number"
                                        id="restMinutes"
                                        value={restMinutes}
                                        onChange={(e) => setRestMinutes(Number(e.target.value))}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        min="0"
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="sales" className="block text-sm font-medium text-gray-700">
                                            銷售額
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500 sm:text-sm">$</span>
                                            </div>
                                            <input
                                                type="number"
                                                id="sales"
                                                value={sales}
                                                onChange={(e) => setSales(e.target.value)}
                                                className="block w-full pl-7 pr-12 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                                min="0"
                                                step="0.01"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="tips" className="block text-sm font-medium text-gray-700">
                                            小費
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500 sm:text-sm">$</span>
                                            </div>
                                            <input
                                                type="number"
                                                id="tips"
                                                value={tips}
                                                onChange={(e) => setTips(e.target.value)}
                                                className="block w-full pl-7 pr-12 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                                min="0"
                                                step="0.01"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                                    >
                                        提交
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
} 