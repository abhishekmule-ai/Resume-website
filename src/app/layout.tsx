import type { Metadata } from "next";
import "./globals.css";
import { portfolioContent } from "@/data/content";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme/theme-provider";

export const metadata: Metadata = {
  title: portfolioContent.seo.title,
  description: portfolioContent.seo.description,
  keywords: portfolioContent.seo.keywords,
  authors: [{ name: portfolioContent.personal.name }],
  creator: portfolioContent.personal.name,
  metadataBase: new URL(portfolioContent.seo.siteUrl),
  alternates: {
    canonical: portfolioContent.seo.siteUrl,
  },
  openGraph: {
    title: portfolioContent.seo.title,
    description: portfolioContent.seo.description,
    url: portfolioContent.seo.siteUrl,
    siteName: `${portfolioContent.personal.name} Portfolio`,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: portfolioContent.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${portfolioContent.personal.name} — Blueprint Noir Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: portfolioContent.seo.title,
    description: portfolioContent.seo.description,
    images: [portfolioContent.seo.ogImage],
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: portfolioContent.personal.name,
  url: portfolioContent.seo.siteUrl,
  jobTitle: "CSE (AI & ML) Student & Web Developer",
  description: portfolioContent.seo.description,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "A. P. Shah Institute of Technology, Thane (University of Mumbai)",
  },
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Web Development",
    "React.js",
    "Node.js",
    "Tailwind CSS",
    "Python",
    "Video Editing",
    "Adobe Premiere Pro",
    "AWS Cloud Computing",
  ],
  sameAs: portfolioContent.socialLinks
    .filter((s) => s.platform !== "Email")
    .map((s) => s.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col relative selection:bg-volt-lime selection:text-ink">
        {/* Subtle 3.5% Blueprint Noise Grain Overlay */}
        <div
          className="fixed inset-0 pointer-events-none noise-overlay z-50 opacity-40 select-none"
          aria-hidden="true"
        />

        <ThemeProvider>
          {/* Accessible Skip to Content Link with High-Contrast Focus Ring */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-cobalt text-white font-mono text-sm font-semibold rounded-md border border-volt-lime shadow-cobalt"
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
