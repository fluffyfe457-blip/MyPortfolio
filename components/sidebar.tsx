"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"

const navItems = [
  { name: "Home", href: "#home", id: "home" },
  { name: "About", href: "#about", id: "about" },
  { name: "Work", href: "#work", id: "work" },
  { name: "Playground", href: "#playground", id: "playground" },
  { name: "Contact", href: "#contact", id: "contact" },
]

export function Sidebar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    navItems.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 top-0 z-50 hidden h-screen w-20 flex-col items-center justify-between border-r border-border bg-sidebar py-8 md:flex lg:w-24"
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Link href="#home" className="text-xl font-bold text-foreground font-[family-name:var(--font-heading)]">
          JD
        </Link>
      </motion.div>

      {/* Navigation */}
      <nav className="flex flex-col items-center gap-6">
        {navItems.map((item, index) => {
          const isActive = activeSection === item.id
          return (
            <motion.div
              key={item.name}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative"
            >
              <Link
                href={item.href}
                className="group relative flex flex-col items-center"
              >
                <motion.span
                  className="text-[10px] uppercase tracking-[0.2em] transition-colors"
                  animate={{
                    color: isActive || hoveredIndex === index ? "var(--foreground)" : "var(--muted-foreground)",
                  }}
                >
                  {item.name}
                </motion.span>
                {(isActive || hoveredIndex === index) && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute -left-3 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-accent"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          )
        })}
      </nav>

      {/* Social Links */}
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="h-12 w-px bg-border"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          whileHover={{ y: -2 }}
        >
          GH
        </motion.a>
        <motion.a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          whileHover={{ y: -2 }}
        >
          X
        </motion.a>
      </div>
    </motion.aside>
  )
}
