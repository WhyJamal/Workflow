import { Container } from "@/components/container";
import { Header } from "@/components/header";
import FooterWrapper from "@/components/footer-wrapper";

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>

            <Container>
                <Header isLandingPage={false} />
            </Container>

            <main className="flex-1 w-full dark:bg-zinc-900">
                {children}
            </main>

            <FooterWrapper />
        </>
    );
}


