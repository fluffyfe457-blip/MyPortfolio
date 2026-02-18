"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

// ─── Data ────────────────────────────────────────────────────────────────────

const institutions = [
  {
    id: "highschool",
    institution: "Hun Sen Borey 100khanag",
    type: "High School",
    period: "2017 – 2023",
    location: "Phnom Penh, Cambodia",
    color: "sky",
    description:
      "I completed my high school education here, where I built a strong foundation in science, math, and technology. This period also helped me develop discipline and teamwork through school projects and activities.",
    tags: ["Mathematics", "Science", "Technology", "Teamwork"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
    courses: [],
  },
  {
    id: "english",
    institution: "American NorthBridge",
    type: "English Program",
    period: "2017 – 2023",
    location: "Phnom Penh, Cambodia",
    color: "amber",
    description:
      "I studied English to improve my communication and writing skills. The program focused on grammar, speaking, and comprehension, which helped me gain confidence in using English in both academic and real-life settings.",
    tags: ["Grammar", "Speaking", "Comprehension", "Writing"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    courses: [],
  },
  {
    id: "university",
    institution: "Setec Institute",
    type: "University",
    period: "2024 – Now",
    location: "Phnom Penh, Cambodia",
    color: "violet",
    description:
      "I'm currently pursuing my degree at Setec Institute, majoring in Information Technology. Here, I'm learning web development, database design, and project management to prepare for a future in tech.",
    tags: ["Web Development", "Database Design", "Project Management", "IT"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    courses: [
      {
        year: "Year 1–2",
        title: "Graphic Design",
        description:
          "Designed many posters including Smart Poster, Khmer New Year, Water Festival, Leaflet, UI/UX Phone, Brochure, Banner, Name Card, Caltex Logo, Hotel Promotion Poster and more.",
        tags: ["Photoshop", "Illustrator", "Canva", "Figma"],
        color: "violet",
      },
      {
        year: "Year 1–2",
        title: "Web Development",
        description:
          "Built e-commerce websites using the MEAN Framework with Angular — Burger, Coffee Shop, Bread, Car Shop. Also built a Portfolio Website and cloned a University Website (Aupp) and a Loan System.",
        tags: ["Angular", "MongoDB", "Express", "Node.js"],
        color: "cyan",
      },
      {
        year: "Year 1–2",
        title: "Console System",
        description:
          "Built POS System, Loan System, Consumption System, and Student Management — all using C++ and C#.",
        tags: ["C++", "C#", "OOP", "CLI"],
        color: "amber",
      },
      {
        year: "Year 2",
        title: "API Development",
        description:
          "Built fast and scalable REST APIs using .NET, Node.js, and Express.js with proper routing, middleware, and authentication.",
        tags: [".NET", "Node.js", "Express.js", "REST API"],
        color: "emerald",
      },
      {
        year: "Year 2",
        title: "Database Design",
        description:
          "Designed and implemented a Garage Management System using the MEAN Stack with MongoDB, focusing on data modeling and query optimization.",
        tags: ["MongoDB", "MySQL", "MEAN Stack", "Schema Design"],
        color: "rose",
      },
    ],
  },
]

// ─── Color tokens ─────────────────────────────────────────────────────────────

const colorMap: Record<string, {
  dot: string; ring: string; badge: string; tag: string;
  glow: string; border: string; line: string; bg: string; icon: string
}> = {
  sky: {
    dot: "bg-sky-500",
    ring: "ring-sky-500/30",
    badge: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    tag: "bg-sky-500/10 text-sky-300 border-sky-500/20",
    glow: "hover:shadow-sky-500/10",
    border: "hover:border-sky-500/40",
    line: "from-sky-500 to-sky-500/0",
    bg: "from-sky-500/5",
    icon: "text-sky-400",
  },
  amber: {
    dot: "bg-amber-500",
    ring: "ring-amber-500/30",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    tag: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    glow: "hover:shadow-amber-500/10",
    border: "hover:border-amber-500/40",
    line: "from-amber-500 to-amber-500/0",
    bg: "from-amber-500/5",
    icon: "text-amber-400",
  },
  violet: {
    dot: "bg-violet-500",
    ring: "ring-violet-500/30",
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    tag: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    glow: "hover:shadow-violet-500/10",
    border: "hover:border-violet-500/40",
    line: "from-violet-500 to-violet-500/0",
    bg: "from-violet-500/5",
    icon: "text-violet-400",
  },
  cyan: {
    dot: "bg-cyan-500",
    ring: "ring-cyan-500/30",
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    tag: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    glow: "hover:shadow-cyan-500/10",
    border: "hover:border-cyan-500/40",
    line: "from-cyan-500 to-cyan-500/0",
    bg: "from-cyan-500/5",
    icon: "text-cyan-400",
  },
  emerald: {
    dot: "bg-emerald-500",
    ring: "ring-emerald-500/30",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    tag: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    glow: "hover:shadow-emerald-500/10",
    border: "hover:border-emerald-500/40",
    line: "from-emerald-500 to-emerald-500/0",
    bg: "from-emerald-500/5",
    icon: "text-emerald-400",
  },
  rose: {
    dot: "bg-rose-500",
    ring: "ring-rose-500/30",
    badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    tag: "bg-rose-500/10 text-rose-300 border-rose-500/20",
    glow: "hover:shadow-rose-500/10",
    border: "hover:border-rose-500/40",
    line: "from-rose-500 to-rose-500/0",
    bg: "from-rose-500/5",
    icon: "text-rose-400",
  },
}

// ─── Component ────────────────────────────────────────────────────────────────

export function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 })
  const [expandedInstitution, setExpandedInstitution] = useState<string | null>("university")
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null)

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative min-h-screen px-8 py-32 md:pl-32 lg:pl-40"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-violet-500/5 blur-[120px]" />
        <div className="absolute -left-20 bottom-40 h-[350px] w-[350px] rounded-full bg-sky-500/5 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/4 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-5xl">

        {/* ── Header ── */}
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4 block text-sm uppercase tracking-[0.3em] text-muted-foreground"
        >
          Education
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-4 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-foreground md:text-5xl"
        >
          My education <br />
          <span className="text-muted-foreground">qualification.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20 max-w-xl text-lg text-muted-foreground"
        >
          A journey of continuous learning — from high school foundations to
          university specialization and language mastery.
        </motion.p>

        {/* ── Timeline ── */}
        <div className="relative">

          {/* Vertical spine */}
          <motion.div
            className="absolute left-[1.1rem] top-0 w-px bg-gradient-to-b from-border via-border/60 to-transparent"
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 2, delay: 0.4, ease: "easeOut" }}
            style={{ height: "100%" }}
          />

          <div className="space-y-8 pl-14">
            {institutions.map((inst, instIdx) => {
              const c = colorMap[inst.color]
              const isOpen = expandedInstitution === inst.id
              const hasCourses = inst.courses.length > 0

              return (
                <motion.div
                  key={inst.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.35 + instIdx * 0.15 }}
                  className="relative"
                >
                  {/* Timeline node */}
                  <motion.div
                    className={`absolute -left-[3.15rem] top-6 flex h-[1.6rem] w-[1.6rem] items-center justify-center rounded-full border-2 border-background ring-2 ${c.ring} ${c.dot}`}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ type: "spring", stiffness: 350, damping: 14, delay: 0.45 + instIdx * 0.15 }}
                  >
                    <span className={`${c.icon} opacity-90`}>{inst.icon}</span>
                  </motion.div>

                  {/* Institution card */}
                  <motion.div
                    onClick={() => setExpandedInstitution(isOpen ? null : inst.id)}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                    className={`group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur-sm transition-all duration-300 hover:bg-card/60 hover:shadow-xl ${c.glow} ${c.border}`}
                  >
                    {/* Gradient wash */}
                    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${c.bg} via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                    {/* Top accent line */}
                    <motion.div
                      className={`h-px w-full bg-gradient-to-r ${c.line}`}
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 1, delay: 0.55 + instIdx * 0.15 }}
                    />

                    <div className="relative p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        {/* Left */}
                        <div className="flex-1">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${c.badge}`}>
                              {inst.type}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                              <svg viewBox="0 0 12 12" fill="currentColor" className="h-2.5 w-2.5">
                                <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                                <path d="M6 3.5v2.5l1.5 1"/>
                              </svg>
                              {inst.period}
                            </span>
                          </div>
                          <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-foreground">
                            {inst.institution}
                          </h3>
                          <p className="mt-0.5 text-xs text-muted-foreground/50">{inst.location}</p>
                        </div>

                        {/* Chevron */}
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-1 shrink-0 text-muted-foreground/30 transition-colors group-hover:text-muted-foreground/60"
                        >
                          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
                            <polyline points="4,6 8,10 12,6" />
                          </svg>
                        </motion.div>
                      </div>

                      {/* Expandable body */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="body"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.38, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="mt-5 border-t border-border pt-5">
                              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                                {inst.description}
                              </p>
                              <div className="mb-5 flex flex-wrap gap-2">
                                {inst.tags.map((tag) => (
                                  <span key={tag} className={`rounded-full border px-3 py-1 text-xs font-medium ${c.tag}`}>
                                    {tag}
                                  </span>
                                ))}
                              </div>

                              {/* ── Nested courses (University only) ── */}
                              {hasCourses && (
                                <div className="relative mt-6">
                                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground/50">
                                    Subjects Covered
                                  </p>

                                  {/* Inner spine */}
                                  <div className="absolute left-[0.6rem] top-8 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-border/60 to-transparent" />

                                  <div className="space-y-3 pl-8">
                                    {inst.courses.map((course, ci) => {
                                      const cc = colorMap[course.color]
                                      const isCourseOpen = expandedCourse === ci

                                      return (
                                        <motion.div
                                          key={ci}
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ duration: 0.4, delay: ci * 0.07 }}
                                          className="relative"
                                        >
                                          {/* Inner dot */}
                                          <div className={`absolute -left-[1.65rem] top-4 h-2 w-2 rounded-full border border-background ${cc.dot}`} />

                                          <div
                                            onClick={(e) => {
                                              e.stopPropagation()
                                              setExpandedCourse(isCourseOpen ? null : ci)
                                            }}
                                            className={`cursor-pointer rounded-xl border border-border/60 bg-background/40 p-4 transition-all duration-200 hover:bg-background/70 hover:shadow-lg ${cc.glow} ${cc.border}`}
                                          >
                                            <div className="flex items-center justify-between gap-3">
                                              <div className="flex flex-wrap items-center gap-2">
                                                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${cc.badge}`}>
                                                  {course.year}
                                                </span>
                                                <span className="text-sm font-semibold text-foreground">
                                                  {course.title}
                                                </span>
                                              </div>
                                              <motion.div
                                                animate={{ rotate: isCourseOpen ? 180 : 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="shrink-0 text-muted-foreground/30"
                                              >
                                                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3 w-3">
                                                  <polyline points="2,4 6,8 10,4" />
                                                </svg>
                                              </motion.div>
                                            </div>

                                            <AnimatePresence initial={false}>
                                              {isCourseOpen && (
                                                <motion.div
                                                  key="course-body"
                                                  initial={{ height: 0, opacity: 0 }}
                                                  animate={{ height: "auto", opacity: 1 }}
                                                  exit={{ height: 0, opacity: 0 }}
                                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                                  className="overflow-hidden"
                                                >
                                                  <div className="mt-3 border-t border-border/50 pt-3">
                                                    <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
                                                      {course.description}
                                                    </p>
                                                    <div className="flex flex-wrap gap-1.5">
                                                      {course.tags.map((tag) => (
                                                        <span key={tag} className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${cc.tag}`}>
                                                          {tag}
                                                        </span>
                                                      ))}
                                                    </div>
                                                  </div>
                                                </motion.div>
                                              )}
                                            </AnimatePresence>
                                          </div>
                                        </motion.div>
                                      )
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ── Footer ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 flex items-center gap-6"
        >
          <div className="h-px flex-1 bg-border" />
          <p className="text-sm text-muted-foreground">
            Continuously learning &amp; growing
          </p>
          <div className="h-px flex-1 bg-border" />
        </motion.div>

      </div>
    </section>
  )
}
