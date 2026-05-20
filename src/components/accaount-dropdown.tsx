"use client";

import {
    CreditCardIcon,
    Link,
    LogOutIcon,
    Moon,
    SettingsIcon,
    Sun,
    UserIcon,
} from "lucide-react";
import { signOut } from "next-auth/react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PAGES } from "@/config/pages.config";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export function AccountDropdown({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-55 p-2 py-4 space-y-2">
                <DropdownMenuItem
                    onClick={() => router.push(PAGES.PROFILE)}
                    className="text-sm"
                >
                    <UserIcon />
                    Профиль
                </DropdownMenuItem>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <SettingsIcon />
                        Тема
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent className="w-40 p-2 space-y-2">
                            <DropdownMenuItem
                                onClick={() => setTheme("dark")}
                            >
                                <Moon />
                                Темная
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setTheme("light")}
                            >
                                <Sun />
                                Светлая
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    variant="destructive"
                    onClick={() => signOut({ callbackUrl: PAGES.SIGN_IN })}
                    className="text-sm"
                >
                    <LogOutIcon />
                    Выйти
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}