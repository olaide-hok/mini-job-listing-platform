import Header from '@/components/Header';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-background transition-colors duration-300">
            <Header />
            <main>{children}</main>
        </div>
    );
}
