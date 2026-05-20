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
    DropdownMenuLabel,
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
import { Button } from "./ui/button";
import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getUserInitials } from "@/lib/get-user-initials";

interface AccountDropdownProps {
    children: React.ReactNode;
    user: User;
}

export function AccountDropdown({ children, user }: AccountDropdownProps) {
    const router = useRouter();
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='rounded-full focus-visible:ring-0 focus-visible:ring-offset-0'>
                    {children}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-55 p-2 py-4 space-y-2">
                <DropdownMenuLabel className='flex items-center gap-2'>
                    <Avatar>
                        <AvatarImage src={user.image ?? ""} alt={user.name ?? "User"} />
                        <AvatarFallback className='text-xs'>{getUserInitials(user)}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-1 flex-col'>
                        <span className='text-popover-foreground'>{user.name}</span>
                        <span className='text-muted-foreground text-xs'>{user.email}</span>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />
                
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