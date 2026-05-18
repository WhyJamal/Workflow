import { Container } from "@/components/container";
import Footer from "@/components/footer";
import { Header } from "@/components/header";

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="dark bg-background text-foreground min-h-screen">
            <header className="sticky top-0 z-50 bg-background border-b">
                <Container>
                    <Header isLandingPage={true} />
                </Container>
            </header>

            <main className="flex-1 w-full">
                {children}
            </main>

            <Footer />
        </div>
    );
}


