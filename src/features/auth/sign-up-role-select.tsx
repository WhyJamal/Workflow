import { PAGES } from "@/config/pages.config";
import { Check, ChevronRight } from "lucide-react";
import Link from "next/link";

export type Role = "CLIENT" | "MASTER";

interface RoleStepProps {
    onSelect: (role: Role) => void;
}

export function RoleStep({ onSelect }: RoleStepProps) {
    return (
        <div className="w-full max-w-2xl mx-auto py-16 px-4 flex flex-col items-center">
            <h1 className="text-4xl font-semibold text-gray-900 dark:text-white text-center mb-3">
                Добро пожаловать в Workflow
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-10 text-base">
                Что лучше всего вас описывает?
            </p>

            <div className="flex flex-col sm:flex-row gap-5 w-full justify-center">
                <button
                    type="button"
                    onClick={() => onSelect("CLIENT")}
                    className="group flex-1 max-w-65 flex flex-col items-center border border-gray-200 dark:border-zinc-700 rounded-2xl overflow-hidden hover:border-[#14a800] hover:shadow-lg transition-all duration-200 cursor-pointer bg-white dark:bg-zinc-800"
                >
                    <div className="w-full h-50 bg-linear-to-br from-green-100 to-lime-100 dark:from-green-900/30 dark:to-lime-900/20 flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="72"
                            height="72"
                            fill="none"
                            viewBox="0 0 72 72"
                            className="text-gray-800 dark:text-gray-200"
                        >
                            <circle cx="36" cy="20" r="10" stroke="currentColor" strokeWidth="2.5" />
                            <path
                                d="M14 56c0-12.15 9.85-22 22-22s22 9.85 22 22"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                            <rect
                                x="28"
                                y="48"
                                width="16"
                                height="12"
                                rx="2"
                                stroke="currentColor"
                                strokeWidth="2.5"
                            />
                            <path
                                d="M28 52h16M36 48v12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                    <div className="py-5 px-4 text-center">
                        <p className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-[#14a800] transition-colors">
                            Клиент <ChevronRight className="inline-block" />
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Размещайте задания и нанимайте специалистов
                        </p>
                    </div>
                </button>

                <button
                    type="button"
                    onClick={() => onSelect("MASTER")}
                    className="group flex-1 max-w-65 flex flex-col items-center border border-gray-200 dark:border-zinc-700 rounded-2xl overflow-hidden hover:border-[#14a800] hover:shadow-lg transition-all duration-200 cursor-pointer bg-white dark:bg-zinc-800"
                >
                    <div className="w-full h-50 bg-linear-to-br from-green-100 to-lime-100 dark:from-green-900/30 dark:to-lime-900/20 flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="72"
                            height="72"
                            fill="none"
                            viewBox="0 0 72 72"
                            className="text-gray-800 dark:text-gray-200"
                        >
                            <circle cx="36" cy="18" r="10" stroke="currentColor" strokeWidth="2.5" />
                            <path
                                d="M16 50c0-11.046 8.954-20 20-20s20 8.954 20 20"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                            <rect
                                x="24"
                                y="46"
                                width="24"
                                height="14"
                                rx="2"
                                stroke="currentColor"
                                strokeWidth="2.5"
                            />
                            <path
                                d="M22 60h28"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                    <div className="py-5 px-4 text-center">
                        <p className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-[#14a800] transition-colors">
                            Мастер <ChevronRight className="inline-block" />
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Работайте и получайте оплату
                        </p>
                    </div>
                </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-10">
                Уже есть аккаунт?{" "}
                <Link href={PAGES.SIGN_IN} className="text-[#14a800] font-medium hover:underline">
                    Войти
                </Link>
            </p>
        </div>
    );
}