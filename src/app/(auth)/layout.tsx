import { PAGES } from "@/config/pages.config";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Upwork – Auth",
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-200 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Upwork logo */}
                    <div className="flex items-center gap-2">
                        <Link href={PAGES.HOME} className="w-8 h-8 rounded flex items-center justify-center gap-2">
                            <Image
                                src='/logos/logo.green.jpg'
                                alt="logo"
                                width={50}
                                height={50}
                            />
                            <span className="text-xl font-semibold">Workflow</span>
                        </Link>
                    </div>

                    {/* Right side links - shown differently on sign-in vs sign-up */}
                    <div className="flex items-center gap-6 text-sm">
                        <span className="text-gray-600">Looking for work?</span>
                    </div>
                </div>
            </header>

            {/* Page content */}
            <main>{children}</main>
        </div>
    );
}