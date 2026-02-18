"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const services = [
  {
    id: 1,
    number: "01",
    title: "Web Design",
    description:
      "We create clean, modern, and user-focused designs that bring your ideas to life. Our goal is to make every page visually appealing and easy to use.",
    features: ["UI/UX Design", "Visual Branding", "Responsive Layouts"],
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-10 w-10"
      >
        {/* Bezier curve tool / pen tool icon */}
        <circle cx="8" cy="40" r="3" />
        <circle cx="40" cy="8" r="3" />
        <circle cx="8" cy="8" r="3" />
        <circle cx="40" cy="40" r="3" />
        <path d="M11 40 C 20 40, 28 8, 37 8" />
        <line x1="8" y1="37" x2="8" y2="11" strokeDasharray="3 3" />
        <line x1="40" y1="11" x2="40" y2="37" strokeDasharray="3 3" />
      </svg>
    ),
    gradient: "from-violet-500/10 via-transparent to-transparent",
    accent: "violet",
  },
  {
    id: 2,
    number: "02",
    title: "Web Development",
    description:
      "We build fast, secure, and responsive websites using the latest technologies. From front-end to back-end, we make sure everything runs smoothly.",
    features: ["Front-End Coding", "Back-End Integration", "Performance"],
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-10 w-10"
      >
        {/* Code / terminal icon */}
        <rect x="4" y="8" width="40" height="32" rx="4" />
        <line x1="4" y1="16" x2="44" y2="16" />
        <circle cx="10" cy="12" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="16" cy="12" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="22" cy="12" r="1.5" fill="currentColor" stroke="none" />
        <polyline points="14,24 20,30 14,36" />
        <line x1="24" y1="36" x2="34" y2="36" />
      </svg>
    ),
    gradient: "from-cyan-500/10 via-transparent to-transparent",
    accent: "cyan",
  },
  {
    id: 3,
    number: "03",
    title: "Database Design",
    description:
      "We design efficient and scalable databases to store and manage your data safely. Our structure ensures speed, reliability, and easy access to information.",
    features: ["Data Modeling", "Query Optimization", "Security & Backup"],
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-10 w-10"
      >
        {/* Database / cylinder icon */}
        <ellipse cx="24" cy="12" rx="16" ry="5" />
        <line x1="8" y1="12" x2="8" y2="36" />
        <line x1="40" y1="12" x2="40" y2="36" />
        <ellipse cx="24" cy="36" rx="16" ry="5" />
        <ellipse cx="24" cy="24" rx="16" ry="5" />
      </svg>
    ),
    gradient: "from-emerald-500/10 via-transparent to-transparent",
    accent: "emerald",
  },
]

const accentColors: Record<string, string> = {
  violet: "group-hover:border-violet-500/50 group-hover:shadow-violet-500/10",
  cyan: "group-hover:border-cyan-500/50 group-hover:shadow-cyan-500/10",
  emerald: "group-hover:border-emerald-500/50 group-hover:shadow-emerald-500/10",
}

const accentIconColors: Record<string, string> = {
  violet: "text-violet-400",
  cyan: "text-cyan-400",
  emerald: "text-emerald-400",
}

const accentNumberColors: Record<string, string> = {
  violet: "text-violet-500/30",
  cyan: "text-cyan-500/30",
  emerald: "text-emerald-500/30",
}

const accentCheckColors: Record<string, string> = {
  violet: "text-violet-400",
  cyan: "text-cyan-400",
  emerald: "text-emerald-400",
}

export function PlaygroundSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <section
      ref={sectionRef}
      id="playground"
      className="relative min-h-screen px-8 py-32 md:pl-32 lg:pl-40"
    >
      {/* Subtle background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="mx-auto max-w-6xl">
        {/* Section Label */}
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4 block text-sm uppercase tracking-[0.3em] text-muted-foreground"
        >
          Services
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-foreground md:text-5xl"
        >
          What I offer &<br />
          <span className="text-muted-foreground">how I can help.</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20 max-w-xl text-lg text-muted-foreground"
        >
          From pixel-perfect interfaces to robust back-end systems — I deliver
          end-to-end digital solutions built for performance and scale.
        </motion.p>

        {/* Service Cards */}
        <div className="space-y-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + index * 0.15 }}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl ${accentColors[service.accent]}`}
            >
              {/* Gradient wash on hover */}
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />

              <div className="relative grid gap-6 p-8 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-12">
                {/* Left: Number + Icon */}
                <div className="flex items-center gap-6 md:flex-col md:items-start md:gap-3">
                  <span
                    className={`font-[family-name:var(--font-heading)] text-5xl font-bold leading-none select-none ${accentNumberColors[service.accent]} transition-all duration-300 group-hover:opacity-60`}
                  >
                    {service.number}
                  </span>
                  <div
                    className={`transition-colors duration-300 ${accentIconColors[service.accent]} opacity-70 group-hover:opacity-100`}
                  >
                    {service.icon}
                  </div>
                </div>

                {/* Center: Title + Description */}
                <div>
                  <h3 className="mb-3 font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>

                {/* Right: Feature List */}
                <div className="flex flex-col gap-3 md:min-w-[200px]">
                  {service.features.map((feature, fi) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 0.5 + index * 0.15 + fi * 0.08,
                      }}
                      className="flex items-center gap-3"
                    >
                      {/* Animated check */}
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center ${accentCheckColors[service.accent]}`}
                      >
                        <svg
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <polyline points="4,10 8,14 16,6" />
                        </svg>
                      </span>
                      <span className="text-sm text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom progress line animation */}
              <div className="relative h-px w-full overflow-hidden bg-border">
                <motion.div
                  className={`absolute left-0 top-0 h-full bg-gradient-to-r ${
                    service.accent === "violet"
                      ? "from-violet-500 to-purple-400"
                      : service.accent === "cyan"
                      ? "from-cyan-500 to-blue-400"
                      : "from-emerald-500 to-teal-400"
                  }`}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.6 + index * 0.2,
                    ease: "easeOut",
                  }}
                  style={{ width: "100%" }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 flex items-center gap-6"
        >
          <div className="h-px flex-1 bg-border" />
          <p className="text-sm text-muted-foreground">
            Have a project in mind?{" "}
            <a
              href="#contact"
              className="text-foreground underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Let&apos;s talk
            </a>
          </p>
          <div className="h-px flex-1 bg-border" />
        </motion.div>
      </div>
    </section>
  )
}
