"use client"

import React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"

const experiments = [
  {
    id: 1,
    title: "Magnetic Button",
    description: "Interactive button with magnetic cursor effect",
  },
  {
    id: 2,
    title: "Text Reveal",
    description: "GSAP-powered text animation with blur",
  },
  {
    id: 3,
    title: "3D Card",
    description: "Perspective card with mouse tracking",
  },
]

function MagneticButton() {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const onMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const onMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "elastic.out(1, 0.3)",
      })
    }

    button.addEventListener("mousemove", onMouseMove)
    button.addEventListener("mouseleave", onMouseLeave)

    return () => {
      button.removeEventListener("mousemove", onMouseMove)
      button.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [])

  return (
    <button
      ref={buttonRef}
      className="rounded-full bg-accent px-8 py-4 text-sm font-medium uppercase tracking-wider text-accent-foreground transition-shadow hover:shadow-lg hover:shadow-accent/20"
    >
      Hover Me
    </button>
  )
}

function TextRevealDemo() {
  const textRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!textRef.current || !isVisible) return

    const chars = textRef.current.querySelectorAll(".char")
    gsap.fromTo(
      chars,
      { y: 30, opacity: 0, filter: "blur(10px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.03,
        duration: 0.6,
        ease: "power3.out",
      }
    )
  }, [isVisible])

  const text = "Motion Design"

  return (
    <div className="text-center">
      <div ref={textRef} className="mb-4 font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground">
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="char inline-block"
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          >
            {char}
          </span>
        ))}
      </div>
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(() => setIsVisible(true), 100)
        }}
        className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        Replay Animation
      </button>
    </div>
  )
}

function Card3DDemo() {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    gsap.to(cardRef.current, {
      rotateX: -y * 20,
      rotateY: x * 20,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex h-32 w-48 items-center justify-center rounded-lg bg-gradient-to-br from-card to-secondary text-center"
      style={{ transformStyle: "preserve-3d" }}
    >
      <span className="text-sm text-muted-foreground">Hover & Move</span>
    </div>
  )
}

export function PlaygroundSection() {
  return (
    <section
      id="playground"
      className="relative min-h-screen px-8 py-32 md:pl-32 lg:pl-40"
    >
      <div className="mx-auto max-w-6xl">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-4 block text-sm uppercase tracking-[0.3em] text-muted-foreground"
        >
          Playground
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-foreground md:text-5xl"
        >
          Experiments &<br />
          <span className="text-muted-foreground">explorations.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16 max-w-xl text-lg text-muted-foreground"
        >
          A collection of interactive experiments showcasing GSAP and Framer
          Motion capabilities. Hover, click, and explore.
        </motion.p>

        <div className="grid gap-8 md:grid-cols-3">
          {experiments.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group rounded-lg border border-border bg-card/50 p-8 backdrop-blur-sm transition-colors hover:border-muted-foreground/50"
            >
              <div className="mb-6 flex h-40 items-center justify-center">
                {exp.id === 1 && <MagneticButton />}
                {exp.id === 2 && <TextRevealDemo />}
                {exp.id === 3 && <Card3DDemo />}
              </div>
              <h3 className="mb-2 font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
                {exp.title}
              </h3>
              <p className="text-sm text-muted-foreground">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
