import { cn } from "@/lib/utils";
import Features from "../../src/components/Features";
import Footer from "../../src/components/Footer";
import Games from "../../src/components/Games";
import Hero from "../../src/components/Hero";
import Navbar from "../../src/components/Navbar";
import Script from "../../src/components/Script";
import { StarsBackground } from "@/src/components/animate-ui/components/backgrounds/stars";

export default function Home() {
  return (
    <div className="animated-background">
      <Navbar />
      <StarsBackground
        starColor="#FFF"
        className={cn(
          "absolute inset-0 flex items-center justify-center rounded-xl",
          "dark:bg-[radial-gradient(ellipse_at_bottom,_#262626_0%,_#000_100%)] bg-[radial-gradient(ellipse_at_bottom,_#222_0%,_#000_100%)]"
        )}
      />
      <Hero />
      <Features />
      <Games />
      <Script />
      <Footer />
    </div>
  );
}
