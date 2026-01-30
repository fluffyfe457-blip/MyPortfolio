"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { number: "2+", label: "Years Experience" },
  { number: "10+", label: "Projects Completed" },
  { number: "1+", label: "Happy Clients" },
]

const skillCategories = [
  {
    title: "Languages & Frameworks",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "Angular", "React", "Node.js", "Express.js", "C#", "C++"],
  },
  {
    title: "Databases",
    skills: ["MongoDB", "MySQL"],
  },
  {
    title: "Design Tools",
    skills: ["Figma", "Adobe XD", "Canva"],
  },
  {
    title: "DevOps & Hosting",
    skills: ["Git", "GitHub", "Vercel", "Render", "Railway"],
  },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  useEffect(() => {
    if (!textRef.current) return

    const lines = textRef.current.querySelectorAll(".about-line")
    
    gsap.fromTo(
      lines,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen px-8 py-32 md:pl-32 lg:pl-40"
    >
      <div className="mx-auto max-w-6xl">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 block text-sm uppercase tracking-[0.3em] text-muted-foreground"
        >
          About
        </motion.span>

        <div ref={textRef} className="mb-20">
          <h2 className="mb-12 font-[family-name:var(--font-heading)] text-4xl font-bold leading-[1.2] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            <span className="about-line block">
              I build full stack solutions
            </span>
            <span className="about-line block">
              where clean code meets
            </span>
            <span className="about-line block text-muted-foreground">
              exceptional user experience.
            </span>
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-lg leading-relaxed text-muted-foreground"
            >
              With years of experience across the full stack, I specialize in
              building robust applications from concept to deployment. My work
              spans frontend frameworks like React and Angular to backend
              systems with Node.js and databases.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-lg leading-relaxed text-muted-foreground"
            >
              I believe great software is built on solid architecture and
              maintainable code. Whether it is a dynamic web app, RESTful API,
              or database design, I focus on creating solutions that scale and
              perform.
            </motion.p>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-20 grid grid-cols-3 gap-8 border-y border-border py-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <span className="mb-2 block font-[family-name:var(--font-heading)] text-4xl font-bold text-foreground md:text-5xl">
                {stat.number}
              </span>
              <span className="text-sm uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills - Infinite Scroll Marquee */}
        <div className="overflow-hidden">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-8 block text-sm uppercase tracking-[0.3em] text-muted-foreground"
          >
            Technologies
          </motion.span>
          
          <div className="space-y-6">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="mb-3 block text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
                  {category.title}
                </span>
                
                {/* Marquee Container */}
                <div className="relative">
                  {/* Gradient Masks */}
                  <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-background to-transparent" />
                  <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-background to-transparent" />
                  
                  {/* Scrolling Track */}
                  <div className="overflow-hidden">
                    <motion.div
                      className="flex w-max gap-3"
                      animate={{
                        x: categoryIndex % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"],
                      }}
                      transition={{
                        duration: 20 + categoryIndex * 5,
                        ease: "linear",
                        repeat: Infinity,
                      }}
                    >
                      {/* Duplicate skills for seamless loop */}
                      {[...category.skills, ...category.skills].map((skill, index) => (
                        <motion.span
                          key={`${skill}-${index}`}
                          whileHover={{ scale: 1.08, backgroundColor: "var(--secondary)" }}
                          className="shrink-0 cursor-default rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
