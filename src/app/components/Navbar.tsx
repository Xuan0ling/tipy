"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { name: "首頁", path: "/" },
    { name: "班表", path: "/shifts" },
    { name: "報表", path: "/reports" },
    { name: "設定", path: "/settings" },
];

export default function Navbar() {
    const pathname = usePathname();
    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-6">
                        <span className="text-2xl font-bold text-white tracking-wide">服務生收入追蹤</span>
                        <div className="hidden md:flex gap-4 ml-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${pathname === item.path
                                            ? "bg-white text-indigo-700 shadow"
                                            : "text-indigo-100 hover:bg-indigo-500 hover:text-white"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="bg-white text-indigo-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-50 transition-colors duration-200 shadow">
                            登入
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
} 