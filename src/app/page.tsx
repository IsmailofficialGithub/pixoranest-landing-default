import LandingPage from "./LandingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pixoranest | Autonomous AI Automation",
  description: "Scale your business with Pixoranest AI automation tools.",
};

export default function Home() {
  return <LandingPage />;
}
