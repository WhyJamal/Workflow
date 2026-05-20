import { Container } from "@/components/container";
import { Header } from "@/components/header";
import FooterWrapper from "@/components/footer-wrapper";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const sidebarLinks = [
  { href: "/cl", label: "Главная", icon: "🏠" },
  { href: "/cl/post-job", label: "Разместить заказ", icon: "➕" },
  { href: "/cl/my-jobs", label: "Мои заказы", icon: "📋" },
  { href: "/cl/find-masters", label: "Найти мастера", icon: "🔍" },
  { href: "/cl/messages", label: "Сообщения", icon: "💬" },
];

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  return (
    <>
      <Container>
        <Header isLandingPage={false} />
      </Container>

      <div className="flex dark:bg-zinc-950 bg-zinc-50">
        {/* Mobile bottom nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-around px-2 py-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center gap-0.5 px-2 py-1 text-zinc-500 dark:text-zinc-400 hover:text-[#14a800] transition-colors"
            >
              <span className="text-lg">{link.icon}</span>
              <span className="text-[10px] font-medium">{link.label.split(" ")[0]}</span>
            </Link>
          ))}
        </div>

        <main className="flex-1 pb-20 md:pb-0">
          {children}
        </main>
      </div>

      <FooterWrapper />
    </>
  );
}
