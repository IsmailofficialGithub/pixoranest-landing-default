import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// const outfit = Outfit({
//   subsets: ["latin"],
//   variable: "--font-outfit",
//   display: "swap",
// });

// const plusJakarta = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   variable: "--font-jakarta",
//   display: "swap",
// });

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
