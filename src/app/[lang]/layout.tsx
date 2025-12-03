import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { i18n, type Locale } from "../../i18n-config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "../../get-dictionary";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Dahab Divers - Premium Diving in Dahab",
    description: "Experience the magic of the Red Sea with Dahab Divers.",
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
};

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale as string }));
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <html lang={lang} className={`${geistSans.variable} ${geistMono.variable} `}>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
            </head>
            <body className="antialiased bg-background text-foreground " suppressHydrationWarning={true}>
                <Navbar lang={lang as Locale} dict={dict} />
                {children}
                <Footer lang={lang as Locale} dict={dict} />
            </body>
        </html>
    );
}
