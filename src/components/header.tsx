import Link from "next/link";
import { auth } from "@/auth";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { getNavItems } from "@/config/header.config";
import { LAN_NAV_ITEMS } from "@/config/lan.header.config";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./logo";
import { PAGES } from "@/config/pages.config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AccountDropdown } from "./accaount-dropdown";
import { getUserInitials } from "@/lib/get-user-initials";

interface HeaderProps {
    isLandingPage?: boolean;
}

export async function Header({ isLandingPage }: HeaderProps) {
    const session = await auth();
    const user = session?.user;

    const navItems = isLandingPage
        ? LAN_NAV_ITEMS
        : getNavItems(user?.role as "CLIENT" | "MASTER");

    const linkBase = isLandingPage
        ? "inline-flex h-10 items-center rounded-md px-4 py-2 text-sm font-medium transition-colors dark:text-zinc-200 text-white/80 hover:text-white hover:bg-white/10"
        : "inline-flex h-10 items-center rounded-md px-4 py-2 text-sm font-medium transition-colors dark:text-zinc-200 hover:bg-zinc-100 hover:text-black dark:hover:bg-zinc-700 dark:hover:text-white";

    return (
        <nav className="flex items-center justify-between w-full">
            <div className="flex items-center gap-8">
                <Link href={PAGES.HOME} className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded flex items-center justify-center">
                            <Logo isLandingPage={isLandingPage} />
                        </div>
                        <span className={`text-xl font-semibold ${isLandingPage ? "text-white" : "dark:text-white"}`}>
                            Workflow
                        </span>
                    </div>
                </Link>
                <div className="flex items-center gap-6 text-sm">
                    <NavigationMenu>
                        <NavigationMenuList className="gap-2">
                            {navItems.map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    {item.items ? (
                                        <NavigationMenu>
                                            <NavigationMenuList>
                                                <NavigationMenuItem>
                                                    <NavigationMenuTrigger className={linkBase}>
                                                        {item.title}
                                                    </NavigationMenuTrigger>
                                                    <NavigationMenuContent className="p-2">
                                                        {item.items.map((subItem) => (
                                                            <NavigationMenuLink className="w-55" key={subItem.href} href={subItem.href}>
                                                                {subItem.label}
                                                            </NavigationMenuLink>
                                                        ))}
                                                    </NavigationMenuContent>
                                                </NavigationMenuItem>
                                            </NavigationMenuList>
                                        </NavigationMenu>
                                    ) : (
                                        <Link href={item.link!} className={linkBase}>
                                            {item.title}
                                        </Link>
                                    )}
                                </NavigationMenuItem>
                            ))}
                            <NavigationMenuViewport />
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {user ? (
                    <AccountDropdown>
                        <Avatar>
                            <AvatarImage src={user.image ?? ""} alt={user.name ?? "User"} />
                            <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
                        </Avatar>
                    </AccountDropdown>
                ) : (
                    <>
                        <Link
                            href={PAGES.SIGN_IN}
                            className={
                                isLandingPage
                                    ? "inline-flex h-10 items-center rounded-md px-4 py-2 text-sm font-medium text-white/80 hover:text-white border border-white/20 hover:bg-white/10 transition-colors"
                                    : "inline-flex h-10 items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 hover:text-black dark:text-white dark:hover:bg-zinc-700 dark:hover:text-white"
                            }
                        >
                            Войти
                        </Link>
                        <Link
                            href={PAGES.SIGN_UP}
                            className="inline-flex h-10 items-center rounded-md px-4 py-2 text-sm font-medium bg-[#14a800] text-white hover:bg-[#108a00] transition-colors"
                        >
                            Регистрация
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}