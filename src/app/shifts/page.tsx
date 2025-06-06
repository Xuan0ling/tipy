"use client";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";

// 假員工資料
const fakeEmployees = [
    { id: 1, name: "林小華", role: "Server" },
    { id: 2, name: "陳大明", role: "Kitchen" },
    { id: 3, name: "王小美", role: "Server" },
];

export default function ShiftsPage() {
    const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
    const [entries, setEntries] = useState([
        { employeeName: "林小華", hoursWorked: 8, role: "Server" },
        { employeeName: "陳大明", hoursWorked: 6, role: "Kitchen" },
        { employeeName: "王小美", hoursWorked: 4, role: "Server" },
    ]);
    const [rule, setRule] = useState("工時+角色加權");
    const [billEntries, setBillEntries] = useState<Array<{ billAmount: string; tipAmount: string; mainServer: string }>>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // 驗證輸入
    function validateBillEntry(entry: { billAmount: string; tipAmount: string; mainServer: string }) {
        const newErrors: { [key: string]: string } = {};
        const billAmount = Number(entry.billAmount);
        const tipAmount = Number(entry.tipAmount);
        if (isNaN(billAmount) || billAmount <= 0) {
            newErrors.billAmount = "請輸入有效的帳單金額";
        }
        if (isNaN(tipAmount) || tipAmount < 0) {
            newErrors.tipAmount = "請輸入有效的小費金額";
        }
        if (tipAmount > billAmount) {
            newErrors.tipAmount = "小費金額不能超過帳單金額";
        }
        if (!entry.mainServer) {
            newErrors.mainServer = "請選擇主服務員";
        }
        return newErrors;
    }

    // 假分配邏輯
    const totalTips = billEntries.reduce((sum, entry) => sum + Number(entry.tipAmount), 0);
    const totalHours = entries.reduce((sum, e) => sum + Number(e.hoursWorked), 0);
    const roleWeight = (role: string) => (role === "Server" ? 1.3 : 1);
    const totalWeight = entries.reduce((sum, e) => sum + Number(e.hoursWorked) * roleWeight(e.role), 0);

    // 計算每位員工的服務桌次數
    const serverTableCount = entries.reduce((acc, e) => {
        acc[e.employeeName] = billEntries.filter(b => b.mainServer === e.employeeName).length;
        return acc;
    }, {} as { [key: string]: number });

    const preview = entries.map(e => {
        let weight = 0;
        switch (rule) {
            case "工時+角色加權":
                weight = Number(e.hoursWorked) * roleWeight(e.role);
                break;
            case "純工時":
                weight = Number(e.hoursWorked);
                break;
            case "按桌次分配":
                weight = serverTableCount[e.employeeName] || 0;
                break;
            case "混合分配":
                weight = (Number(e.hoursWorked) * roleWeight(e.role) * 0.7) +
                    ((serverTableCount[e.employeeName] || 0) * 0.3);
                break;
            default:
                weight = Number(e.hoursWorked) * roleWeight(e.role);
        }
        const percent = totalWeight ? (weight / totalWeight) : 0;
        return {
            ...e,
            percent: (percent * 100).toFixed(1),
            tips: (totalTips * percent).toFixed(2),
            tableCount: serverTableCount[e.employeeName] || 0,
        };
    });

    function handleEntryChange(idx: number, key: string, value: string | number) {
        setEntries(entries => entries.map((e, i) => i === idx ? { ...e, [key]: value } : e));
    }

    function addEntry() {
        setEntries([...entries, { employeeName: "", hoursWorked: 0, role: "Server" }]);
    }

    function removeEntry(idx: number) {
        setEntries(entries => entries.filter((_, i) => i !== idx));
    }

    function addBillEntry() {
        const newEntry = { billAmount: "", tipAmount: "", mainServer: "" };
        setBillEntries([...billEntries, newEntry]);
        setErrors({});
    }

    function handleBillEntryChange(idx: number, key: string, value: string) {
        const updatedEntries = billEntries.map((entry, i) =>
            i === idx ? { ...entry, [key]: value } : entry
        );
        setBillEntries(updatedEntries);

        // 只有在有值時才進行驗證
        if (value) {
            const newErrors = validateBillEntry(updatedEntries[idx]);
            setErrors(newErrors);
        } else {
            setErrors({});
        }
    }

    function removeBillEntry(idx: number) {
        setBillEntries(billEntries => billEntries.filter((_, i) => i !== idx));
        setErrors({});
    }

    // 統計數據
    const totalBills = billEntries.length;
    const averageTip = totalBills > 0 ? (totalTips / totalBills).toFixed(2) : "0.00";
    const totalBillAmount = billEntries.reduce((sum, entry) => sum + Number(entry.billAmount), 0);
    const tipPercentage = totalBillAmount > 0 ? ((totalTips / totalBillAmount) * 100).toFixed(1) : "0.0";

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Navbar />
            <div className="max-w-5xl mx-auto py-12 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">班表與小費分配</h1>
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">帳單小費輸入</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">日期</label>
                            <Input
                                type="date"
                                className={`mt-1 block w-full rounded-xl border-gray-300 px-4 py-3 text-base bg-gray-50 ${errors.date ? 'border-red-500' : ''}`}
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                required
                            />
                            {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">分配規則</label>
                            <Select value={rule} onValueChange={e => setRule(e)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="選擇分配規則" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="工時+角色加權">工時+角色加權</SelectItem>
                                    <SelectItem value="純工時">純工時</SelectItem>
                                    <SelectItem value="按桌次分配">按桌次分配</SelectItem>
                                    <SelectItem value="混合分配">混合分配</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-md font-medium text-gray-700 mb-2">帳單小費輸入</h3>
                        {billEntries.map((entry, idx) => (
                            <div key={idx} className="grid grid-cols-[1fr_1fr_1.5fr_auto] gap-4 mb-2 items-end">
                                {/* 帳單金額 */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">帳單金額</label>
                                    <Input
                                        type="number"
                                        className={`mt-1 block w-full rounded-xl border-gray-300 px-4 py-3 text-base bg-gray-50 ${errors.billAmount ? 'border-red-500' : ''}`}
                                        value={entry.billAmount}
                                        onChange={e => handleBillEntryChange(idx, "billAmount", e.target.value)}
                                        placeholder="帳單金額"
                                    />
                                    {errors.billAmount && <p className="mt-1 text-sm text-red-500">{errors.billAmount}</p>}
                                </div>
                                {/* 小費金額 */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">小費金額</label>
                                    <Input
                                        type="number"
                                        className={`mt-1 block w-full rounded-xl border-gray-300 px-4 py-3 text-base bg-gray-50 ${errors.tipAmount ? 'border-red-500' : ''}`}
                                        value={entry.tipAmount}
                                        onChange={e => handleBillEntryChange(idx, "tipAmount", e.target.value)}
                                        placeholder="小費金額"
                                    />
                                    {errors.tipAmount && <p className="mt-1 text-sm text-red-500">{errors.tipAmount}</p>}
                                </div>
                                {/* 主服務員 */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">主服務員</label>
                                    <Select value={entry.mainServer} onValueChange={e => handleBillEntryChange(idx, "mainServer", e)}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="請選擇主服務員" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {entries.filter(e => e.role === "Server").map(e => (
                                                <SelectItem key={e.employeeName} value={e.employeeName}>{e.employeeName}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.mainServer && <p className="mt-1 text-sm text-red-500">{errors.mainServer}</p>}
                                </div>
                                {/* 刪除按鈕 */}
                                <div className="flex items-end">
                                    <Button type="button" variant="ghost" size="sm" className="text-red-500" onClick={() => removeBillEntry(idx)}>
                                        刪除
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={addBillEntry}>新增帳單</Button>
                    </div>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div className="bg-gray-50 rounded-xl p-4">
                            <div className="text-sm text-gray-500">總帳單數</div>
                            <div className="text-xl font-bold text-gray-900">{totalBills}</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                            <div className="text-sm text-gray-500">總小費</div>
                            <div className="text-xl font-bold text-[#007AFF]">${totalTips.toFixed(2)}</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                            <div className="text-sm text-gray-500">平均每桌小費</div>
                            <div className="text-xl font-bold text-gray-900">${averageTip}</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                            <div className="text-sm text-gray-500">小費比例</div>
                            <div className="text-xl font-bold text-gray-900">{tipPercentage}%</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">員工工時輸入</h2>
                    {entries.map((entry, idx) => (
                        <div key={idx} className="grid grid-cols-[2fr_1fr_2fr_auto] gap-4 mb-2 items-end">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">員工姓名</label>
                                <Input type="text" className="mt-1 block w-full rounded-xl border-gray-300 px-4 py-3 text-base bg-gray-50" value={entry.employeeName} onChange={e => handleEntryChange(idx, "employeeName", e.target.value)} placeholder="員工姓名" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">工時</label>
                                <Input type="number" className="mt-1 block w-full rounded-xl border-gray-300 px-4 py-3 text-base bg-gray-50" value={entry.hoursWorked} onChange={e => handleEntryChange(idx, "hoursWorked", e.target.value)} placeholder="工時" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">角色</label>
                                <Select value={entry.role} onValueChange={e => handleEntryChange(idx, "role", e)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="選擇角色" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Server">Server</SelectItem>
                                        <SelectItem value="Kitchen">Kitchen</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-end">
                                <Button type="button" variant="ghost" size="sm" className="text-red-500" onClick={() => removeEntry(idx)}>
                                    刪除
                                </Button>
                            </div>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={addEntry}>新增員工</Button>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">預覽分配結果</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">員工姓名</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">工時</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">角色</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">服務桌次</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">% 分配</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">分得小費</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {preview.map((e, i) => (
                                <tr key={i}>
                                    <td className="px-4 py-2 whitespace-nowrap text-gray-900">{e.employeeName}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-gray-900">{e.hoursWorked}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-gray-900">{e.role}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-gray-900">{e.tableCount}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-gray-900">{e.percent}%</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-[#007AFF] font-bold">${e.tips}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
} 