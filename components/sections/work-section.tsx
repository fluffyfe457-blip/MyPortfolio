"use client"

import React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useState } from "react"

const projects = [
  {
    id: 1,
    title: "Attendnace Mangement",
    category: "Web Application",
    year: "2025",
    tech: ["Angular", "Nodejs", "MongoDB"],
    color: "#3b82f6",
    gradient: "from-blue-500/20 via-blue-600/10 to-transparent",
    size: "large", // spans 2 cols, 2 rows
    link: 'https://github.com/sengtri457/Attendance_Management'
  },
  {
    id: 2,
    title: "Car Garage Management",
    category: "Web Application",
    year: "2024",
    tech: ["Angular", "Node.js", "MongoDB"],
    color: "#10b981",
    gradient: "from-emerald-500/20 via-emerald-600/10 to-transparent",
    size: "tall", // spans 1 col, 2 rows
    link: 'https://github.com/sengtri457/CareGarageManagement'

  },
  {
    id: 3,
    title: "Ecommerce",
    category: "Web Application",
    year: "2024",
    tech: ["Angular", "Node.js", "MongoDB"],
    color: "#f59e0b",
    gradient: "from-amber-500/20 via-amber-600/10 to-transparent",
    size: "small",
    link: 'https://github.com/sengtri457/EcommerceAngular'

  },
  {
    id: 4,
    title: "Attendnace Mangement_MVC",
    category: "Creative Agency",
    year: "2023",
    tech: ["Angular", "Nodejs", "MySQL"],
    color: "#ec4899",
    gradient: "from-pink-500/20 via-pink-600/10 to-transparent",
    size: "wide", // spans 2 cols, 1 row
    link: 'https://github.com/sengtri457/Attendance_Management'

  },
  {
    id: 5,
    title: "Vertex CRM",
    category: "Enterprise App",
    year: "2023",
    tech: ["Angular", "C#", "MySQL"],
    color: "#8b5cf6",
    gradient: "from-violet-500/20 via-violet-600/10 to-transparent",
    size: "small",
    link: 'https://github.com/sengtri457/Attendance_Management'

  },
  {
    id: 6,
    title: "Bloom E-commerce",
    category: "Online Store",
    year: "2023",
    tech: ["React", "Node.js", "MongoDB"],
    color: "#06b6d4",
    gradient: "from-cyan-500/20 via-cyan-600/10 to-transparent",
    size: "tall",
    link: 'https://github.com/sengtri457/Attendance_Management'

  },
  {
    id: 7,
    title: "Stellar Portfolio",
    category: "Personal Site",
    year: "2022",
    tech: ["HTML", "CSS", "JavaScript"],
    color: "#f43f5e",
    gradient: "from-rose-500/20 via-rose-600/10 to-transparent",
    size: "wide",
    link: 'https://github.com/sengtri457/Attendance_Management'

  },
  {
    id: 8,
    title: "Quantum API",
    category: "Backend Service",
    year: "2022",
    tech: ["Node.js", "Express", "MongoDB"],
    color: "#84cc16",
    gradient: "from-lime-500/20 via-lime-600/10 to-transparent",
    size: "small",
    link: 'https://github.com/sengtri457/Attendance_Management'

  },
]

// macOS Window Controls Component
function WindowControls({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <motion.div
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: isHovered ? "#ff5f57" : "var(--muted-foreground)" }}
        animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0.5 }}
        whileHover={{ scale: 1.3 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: isHovered ? "#febc2e" : "var(--muted-foreground)" }}
        animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0.5 }}
        whileHover={{ scale: 1.3 }}
        transition={{ duration: 0.2, delay: 0.05 }}
      />
      <motion.div
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: isHovered ? "#28c840" : "var(--muted-foreground)" }}
        animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0.5 }}
        whileHover={{ scale: 1.3 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      />
    </div>
  )
}

// Get grid classes based on size
function getGridClasses(size: string) {
  switch (size) {
    case "large":
      return "md:col-span-2 md:row-span-2"
    case "tall":
      return "md:row-span-2"
    case "wide":
      return "md:col-span-2"
    default:
      return ""
  }
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"])
  const brightness = useTransform(mouseXSpring, [-0.5, 0.5], [0.95, 1.05])
  
  const isLarge = project.size === "large"
  const isTall = project.size === "tall" || project.size === "large"

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", filter: `brightness(${brightness})` }}
      className={`group relative cursor-pointer ${getGridClasses(project.size)}`}
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute -inset-1 rounded-xl bg-gradient-to-br ${project.gradient} opacity-0 blur-xl transition-opacity duration-500`}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />

      <div className="relative h-full overflow-hidden rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-border">
        {/* macOS Title Bar */}
        <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-3 py-2.5">
          <WindowControls isHovered={isHovered} />
          <motion.span 
            className="text-[10px] font-mono text-muted-foreground"
            animate={{ opacity: isHovered ? 1 : 0.6 }}
          >
            {project.title.toLowerCase().replace(/\s+/g, "-")}.app
          </motion.span>
          <div className="w-12" />
        </div>

        {/* Project Content */}
        <div className={`relative flex h-[calc(100%-41px)] flex-col ${isTall ? "p-6" : "p-4"}`}>
          {/* Animated color accent bar */}
          <motion.div
            className="absolute left-0 top-0 w-1 rounded-r-full"
            style={{ backgroundColor: project.color }}
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          />

          {/* Hover shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? "100%" : "-100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />

          {/* Large card background pattern */}
          {isLarge && (
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{ 
                backgroundImage: `radial-gradient(circle at 2px 2px, ${project.color} 1px, transparent 0)`,
                backgroundSize: '24px 24px'
              }} />
            </div>
          )}

          <div className="relative flex flex-1 flex-col">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <motion.span 
                    className={`uppercase tracking-wider ${isLarge ? "text-xs" : "text-[10px]"}`}
                    style={{ color: project.color }}
                    animate={{ opacity: isHovered ? 1 : 0.7 }}
                  >
                    {project.category}
                  </motion.span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                  <span className={`text-muted-foreground/60 ${isLarge ? "text-xs" : "text-[10px]"}`}>
                    {project.year}
                  </span>
                </div>
                <h3 className={`font-[family-name:var(--font-heading)] font-semibold text-foreground transition-colors group-hover:text-foreground ${isLarge ? "text-2xl" : isTall ? "text-lg" : "text-sm"}`}>
                  {project.title}
                </h3>
                
                {/* Description for large cards */}
                {isLarge && (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    A comprehensive solution built with modern technologies and best practices.
                  </p>
                )}
              </div>
              <motion.div
                className={`flex shrink-0 items-center justify-center rounded-full border border-border/50 ${isLarge ? "h-10 w-10" : "h-6 w-6"}`}
                animate={{ 
                  scale: isHovered ? 1 : 0.8, 
                  opacity: isHovered ? 1 : 0,
                  rotate: isHovered ? 0 : -45
                }}
                transition={{ duration: 0.3 }}
              >
              <a href={project.link}>
                <svg width={isLarge ? "14" : "10"} height={isLarge ? "14" : "10"} viewBox="0 0 10 10" fill="none" className="text-foreground">
                  <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              </motion.div>
            </div>

            {/* Tech Tags - pushed to bottom for tall cards */}
            <div className={`flex flex-wrap gap-1.5 ${isTall ? "mt-auto pt-4" : "mt-3"}`}>
              {project.tech.map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  className={`rounded-md bg-secondary/80 font-medium text-muted-foreground backdrop-blur-sm transition-colors group-hover:bg-secondary ${isLarge ? "px-3 py-1 text-xs" : "px-2 py-0.5 text-[9px]"}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.08 + techIndex * 0.05 }}
                  viewport={{ once: true }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] rounded-full"
          style={{ backgroundColor: project.color }}
          initial={{ width: 0 }}
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  )
}

export function WorkSection() {
  return (
    <section id="work" className="relative min-h-screen px-8 py-32 md:pl-32 lg:pl-40">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-4 block text-sm uppercase tracking-[0.3em] text-muted-foreground"
        >
          Selected Work
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-foreground md:text-5xl"
        >
          Projects that push
          <br />
          <span className="bg-gradient-to-r from-muted-foreground to-muted-foreground/50 bg-clip-text text-transparent">boundaries.</span>
        </motion.h2>

        <div className="grid auto-rows-[180px] gap-4 md:grid-cols-3 lg:grid-cols-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden rounded-full border border-border px-8 py-3 text-xs uppercase tracking-wider text-foreground transition-colors"
          >
            <span className="relative z-10">View All Projects</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
