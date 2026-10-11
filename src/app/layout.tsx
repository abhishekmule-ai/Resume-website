import type { Metadata } from "next";
import "./globals.css";
import { portfolioData } from "@/data/portfolio";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { LiveGeometricBackground } from "@/components/ui/live-geometric-background";

export const metadata: Metadata = {
  title: "Resume",
  description: portfolioData.seo.description,
  keywords: portfolioData.seo.keywords,
  authors: [{ name: portfolioData.personal.name }],
  creator: portfolioData.personal.name,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || portfolioData.seo.siteUrl
  ),
  openGraph: {
    title: "Resume",
    description: portfolioData.seo.description,
    url: portfolioData.seo.siteUrl,
    siteName: `${portfolioData.personal.name} Portfolio`,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume",
    description: portfolioData.seo.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <title>Resume</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  if (t === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col relative selection:bg-blue-500/30 selection:text-white">
        <ThemeProvider>
          {/* Live 3D geometric background from reference image (non-responsive to cursor) */}
          <LiveGeometricBackground />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="flex-1 relative z-10">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
