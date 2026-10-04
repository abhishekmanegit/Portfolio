import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import FeaturedProjects from "./components/sections/FeaturedProjects"
import SecondaryProjects from "./components/sections/SecondaryProjects"
import Skills from "./components/sections/Skills"
import Mindset from "./components/sections/Mindset"
import Journey from "./components/sections/Journey"
import Contact from "./components/sections/Contact"
import Footer from "./components/Footer"
import ScrollTop from "./components/ScrollTop"
import Cursor from "./components/motion/Cursor"

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip text-ink">
      {/* subtle film grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[100] opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <FeaturedProjects />
        <SecondaryProjects />
        <Skills />
        <Mindset />
        <Journey />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </div>
  )
}