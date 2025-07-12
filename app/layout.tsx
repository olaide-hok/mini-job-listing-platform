import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {JobProvider} from '@/context/JobContext';
import {ThemeProvider} from '@/context/ThemeContext';
import {Toaster} from '@/components/ui/sonner';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Remote Jobs',
    description: 'A job listing platform for remote jobs',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange>
                    <JobProvider>
                        {children}
                        <Toaster />
                    </JobProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
