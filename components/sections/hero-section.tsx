"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { AnimatedText } from "@/components/animated-text"
import { StarsBackground } from "@/components/stars-background"
import { SpaceOrbit } from "@/components/space-orbit"

export function HeroSection() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const hero = heroRef.current
    if (!cursor || !hero) return

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.5,
        ease: "power2.out",
      })
    }

    const onMouseEnter = () => {
      gsap.to(cursor, { scale: 1, opacity: 0.5, duration: 0.3 })
    }

    const onMouseLeave = () => {
      gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 })
    }

    hero.addEventListener("mousemove", onMouseMove)
    hero.addEventListener("mouseenter", onMouseEnter)
    hero.addEventListener("mouseleave", onMouseLeave)

    return () => {
      hero.removeEventListener("mousemove", onMouseMove)
      hero.removeEventListener("mouseenter", onMouseEnter)
      hero.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-8 md:pl-32 lg:pl-40"
    >
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-50 h-5 w-5 rounded-full bg-accent opacity-0 mix-blend-difference"
      />

      {/* Space Background */}
      <StarsBackground />

      {/* Orbital Tech Planets */}
      <SpaceOrbit />

      <div className="relative z-10 max-w-4xl">
        {/* Personal Info Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8 flex items-center gap-5"
        >
          {/* Stylized Avatar */}
          <motion.div
            className="relative h-20 w-20 shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-accent via-accent/50 to-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            {/* Inner circle */}
            <div className="absolute inset-1 rounded-full bg-background" />
            {/* Avatar content */}
            <div className="absolute inset-2 flex items-center justify-center rounded-full bg-gradient-to-br from-secondary to-card">
              <span className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                JD
              </span>
            </div>
            {/* Status dot */}
            <motion.div
              className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-background bg-green-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Name and tagline */}
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground"
            >
              John Doe
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm text-muted-foreground"
            >
              Turning ideas into reality through code
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Full Stack Developer
          </span>
        </motion.div>

        <h1 className="mb-8 font-[family-name:var(--font-heading)] text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-7xl lg:text-8xl">
          <AnimatedText delay={0.4} stagger={0.02}>
            I build
          </AnimatedText>
          <br />
          <AnimatedText delay={0.6} stagger={0.02}>
            applications that
          </AnimatedText>
          <br />
          <span className="text-accent">
            <AnimatedText delay={0.8} stagger={0.02}>
              make impact.
            </AnimatedText>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-12 max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          Focused on clean code, scalable architecture, and seamless user experiences. 
          From frontend to backend, I bring ideas to life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex items-center gap-8"
        >
          <motion.a
            href="#work"
            className="group relative overflow-hidden rounded-full bg-foreground px-8 py-4 text-sm font-medium uppercase tracking-wider text-background"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View Work</span>
            <motion.div
              className="absolute inset-0 bg-accent"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </motion.a>

          <motion.a
            href="#contact"
            className="text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            whileHover={{ x: 5 }}
          >
            Get in touch
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Scroll
          </span>
          <motion.div
            className="h-12 w-px bg-border"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "top" }}
          />
        </motion.div>
      </div>
    </section>
  )
}
