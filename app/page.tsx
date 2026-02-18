"use client"

import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { WorkSection } from "@/components/sections/work-section"
import { PlaygroundSection } from "@/components/sections/playground-section"
import { EducationSection } from "@/components/sections/education-section"
import { ContactSection } from "@/components/sections/contact-section"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <Sidebar />
      <MobileNav />
      <ScrollToTop />
      
      <div className="relative">
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <PlaygroundSection />
        <WorkSection />
        <ContactSection />
      </div>
    </main>
  )
}
