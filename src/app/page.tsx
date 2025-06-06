"use client";
import { useRouter } from "next/navigation";
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
import { Button } from "../components/ui/button";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function HomePage() {
  const router = useRouter();
  // 假資料
  const today = "2025-06-06";
  const storeName = "Tipy 餐廳";
  const totalCashTips = 270;
  const totalCardTips = 180;
  const totalTips = totalCashTips + totalCardTips;
  const totalEmployees = 7;
  const totalHours = 42;
  const ruleDesc = "工時+角色加權分配";

  // 一個月小費與營收額曲線圖假資料
  const chartLabels = [
    "6/01", "6/02", "6/03", "6/04", "6/05", "6/06", "6/07", "6/08", "6/09", "6/10", "6/11", "6/12"
  ];
  const tipsData = [300, 350, 400, 380, 420, 390, 410, 430, 415, 440, 460, 450];
  const salesData = [3200, 3400, 3300, 3500, 3600, 3700, 3550, 3650, 3720, 3800, 3900, 4000];

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "每日小費 ($)",
        data: tipsData,
        borderColor: "#007AFF",
        backgroundColor: "rgba(0,122,255,0.08)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#007AFF",
        yAxisID: 'y',
      },
      {
        label: "每日營收 ($)",
        data: salesData,
        borderColor: "#34C759",
        backgroundColor: "rgba(52,199,89,0.08)",
        tension: 0.4,
        fill: false,
        pointRadius: 4,
        pointBackgroundColor: "#34C759",
        yAxisID: 'y1',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: false },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        beginAtZero: true,
        title: { display: true, text: '小費 ($)' },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        beginAtZero: true,
        grid: { drawOnChartArea: false },
        title: { display: true, text: '營收 ($)' },
      },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center">
      <Navbar />
      <div className="w-full max-w-2xl mt-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{storeName} 主控台</h1>
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="text-gray-500 text-sm">今日日期</div>
                <div className="text-xl font-bold text-[#007AFF]">{today}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">今日小費總額</div>
                <div className="text-2xl font-bold text-[#007AFF]">${totalTips.toFixed(2)}</div>
                <div className="text-xs text-gray-500">(現金 ${totalCashTips.toFixed(2)} + 刷卡 ${totalCardTips.toFixed(2)})</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="text-gray-500 text-sm">出勤人數</div>
                <div className="text-lg font-bold text-gray-900">{totalEmployees}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">總工時</div>
                <div className="text-lg font-bold text-gray-900">{totalHours} 小時</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">分配規則</div>
                <div className="text-lg font-bold text-gray-900">{ruleDesc}</div>
              </div>
            </div>
          </div>
        </div>
        {/* 一個月小費與營收額曲線圖 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">本月小費與營收趨勢</h2>
          <Line data={chartData} options={chartOptions} height={120} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <Button
            className="rounded-2xl py-4 font-semibold text-lg shadow"
            onClick={() => router.push("/shifts")}
          >
            新增今日分配
          </Button>
          <Button
            variant="outline"
            className="rounded-2xl py-4 font-semibold text-lg shadow border-[#E5E5EA] text-[#007AFF] hover:bg-[#F2F2F7]"
            onClick={() => router.push("/reports")}
          >
            查看歷史紀錄
          </Button>
          <Button
            variant="outline"
            className="rounded-2xl py-4 font-semibold text-lg shadow border-[#E5E5EA] text-[#007AFF] hover:bg-[#F2F2F7]"
            onClick={() => router.push("/public")}
          >
            公開查詢入口
          </Button>
        </div>
      </div>
    </main>
  );
}