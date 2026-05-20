import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { PAGES } from "@/config/pages.config";
import type { Metadata } from "next";
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
        <div className="dark:bg-zinc-950 bg-zinc-50 min-h-screen">
            <header className="sticky top-0 z-50 border-b border-gray-200 px-6 py-4 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href={PAGES.HOME} className="w-8 h-8 rounded flex items-center justify-center gap-2">
                            <Logo/>
                            <span className="text-xl font-semibold dark:text-white text-gray-900">Workflow</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                        <ThemeToggle />
                        <span className="text-gray-600 dark:text-gray-400">Looking for work?</span>
                    </div>
                </div>
            </header>

            <main>{children}</main>
        </div>
    );
}