"use client";

import {
    CreditCardIcon,
    Link,
    LogOutIcon,
    SettingsIcon,
    UserIcon,
} from "lucide-react";
import { signOut } from "next-auth/react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PAGES } from "@/config/pages.config";
import { useRouter } from "next/navigation";

export function AccountDropdown({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-55 p-2">
                <DropdownMenuItem 
                    onClick={() => router.push(PAGES.PROFILE)}
                    className="text-sm"
                >
                    <UserIcon />
                    Профиль
                </DropdownMenuItem>
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