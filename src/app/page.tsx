"use client";
import Navbar from "./components/Navbar";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const fakeStats = {
  todaySales: 3200,
  todayTips: 420,
  todayHours: 8,
};

const fakeTipData = {
  labels: ["6/01", "6/02", "6/03", "6/04", "6/05", "6/06"],
  datasets: [
    {
      label: "每日小費 ($)",
      data: [300, 350, 400, 380, 420, 390],
      borderColor: "#6366f1",
      backgroundColor: "rgba(99,102,241,0.1)",
      tension: 0.4,
      fill: true,
      pointRadius: 5,
      pointBackgroundColor: "#6366f1",
    },
  ],
};

const fakeRecords = [
  { date: "2024-06-06", start: "10:00", end: "18:00", sales: 3200, tips: 420 },
  { date: "2024-06-05", start: "11:00", end: "19:00", sales: 2800, tips: 390 },
  { date: "2024-06-04", start: "10:30", end: "18:30", sales: 3000, tips: 400 },
];

const todayTipDistribution = [
  { name: "林小華", tip: 180 },
  { name: "陳大明", tip: 90 },
  { name: "王小美", tip: 90 },
];

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">信息看板</h1>
        {/* 數字卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-gray-500 text-sm mb-2">今日銷售</span>
            <span className="text-2xl font-bold text-indigo-600">${fakeStats.todaySales}</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-gray-500 text-sm mb-2">今日小費</span>
            <span className="text-2xl font-bold text-purple-600">${fakeStats.todayTips}</span>
          </div>
        </div>
        {/* 小費曲線圖 */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">每日小費趨勢</h2>
          <Line data={fakeTipData} options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } },
          }} height={80} />
        </div>
        {/* 今日小費分配 */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">今日小費分配</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">姓名</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">分得小費</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {todayTipDistribution.map((row, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2 whitespace-nowrap text-gray-900">{row.name}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-indigo-700 font-bold">${row.tip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}