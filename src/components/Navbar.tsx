'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { name: '首頁', path: '/' },
        { name: '班表', path: '/shifts' },
        { name: '報表', path: '/reports' },
        { name: '設定', path: '/settings' },
    ];

    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold text-[#222]">服務生收入追蹤</span>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${pathname === item.path
                                        ? 'border-white text-[#222]'
                                        : 'border-transparent text-indigo-100 hover:border-indigo-200 hover:text-[#222]'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button className="bg-white text-[#007AFF] px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-50 transition-colors duration-200">
                            登入
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
} 