import { useRef, useEffect } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import Navbar from "./components/shared/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Portal from "./sections/portal";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
// import Galaxy from "./components/Galaxy";

import { useThemeStore } from "./store/themeStore";
import { useUIStore } from "./store/uiStore";

gsap.registerPlugin(ScrollTrigger);

function AppInner() {
  const progressRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<LenisRef>(null);

  const theme = useThemeStore((s) => s.theme);
  const setDevice = useUIStore((s) => s.setDevice);

  // This calculates device breakpoints once globally for the entire app.
  useEffect(() => {
    setDevice(window.innerWidth);

    const handleResize = () => setDevice(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setDevice]);

  // Sync Lenis with GSAP
  useEffect(() => {
    function onFrame(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(onFrame);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(onFrame);
  }, []);

  // Global Progress Bar
  useGSAP(() => {
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2,
      },
    });
  }, []);

  return (
    <div
      className="relative w-full min-h-screen transition-colors duration-1000"
      style={{
        backgroundColor: theme === "silk" ? "#fdf6f0" : "#0e050a",
      }}
    >
      {/* GLOBAL BACKGROUND */}
      {/* <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          // Visible in dark mode for testing. Adjust these values later.
          opacity: theme === "silk" ? 0.2 : 0.6,
          transition: "opacity 1.5s ease-in-out",
        }}
      >
        <Galaxy
          color={theme === "silk" ? "#0e050a" : "#aa4d88"} 
          density={0.4}
          starSpeed={0.03}
          glowIntensity={0}
          twinkleIntensity={0.1}
          transparent={true}
        />
      </div> */}

      {/* Fixed UI */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 h-1 w-full bg-accent origin-left scale-x-0 z-[100]"
      />
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Scroll Content */}
      <ReactLenis
        ref={lenisRef}
        root
        options={{
          autoRaf: false,
          syncTouch: true,
          smoothWheel: true,
        }}
      >
        <main className="w-full relative z-10">
          <Hero />
          <About />
          <Portal />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
      </ReactLenis>
    </div>
  );
}

export default function App() {
  return <AppInner />;
}
