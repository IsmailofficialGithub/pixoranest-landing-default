import "./globals.css";

export const metadata = {
  title: "Pixoranest | Autonomous AI Automation",
  description: "Scale your business with Pixoranest AI automation tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-slate-950 text-white">
        {children}
      </body>
    </html>
  );
}
