"use client"

import { motion } from "framer-motion"

const techPlanets = [
  { name: "React", color: "#61DAFB", size: 40, orbit: 140, duration: 20, icon: "⚛" },
  { name: "Angular", color: "#DD0031", size: 36, orbit: 190, duration: 25, icon: "A" },
  { name: "Node.js", color: "#339933", size: 34, orbit: 240, duration: 30, icon: "N" },
  { name: "TypeScript", color: "#3178C6", size: 32, orbit: 290, duration: 35, icon: "TS" },
  { name: "MongoDB", color: "#47A248", size: 30, orbit: 340, duration: 40, icon: "M" },
  { name: "MySQL", color: "#4479A1", size: 28, orbit: 390, duration: 45, icon: "S" },
]

// Pre-computed static values — avoids Math.random() in render which causes
// a server/client hydration mismatch in Next.js.
const particles = [
  { width: 2.4, height: 2.4, left: "28%",  top: "35%",  duration: 3.1, delay: 0.4 },
  { width: 1.2, height: 1.2, left: "55%",  top: "22%",  duration: 4.5, delay: 1.1 },
  { width: 3.0, height: 3.0, left: "72%",  top: "48%",  duration: 2.8, delay: 0.7 },
  { width: 1.8, height: 1.8, left: "38%",  top: "65%",  duration: 3.7, delay: 1.5 },
  { width: 2.1, height: 2.1, left: "62%",  top: "70%",  duration: 4.2, delay: 0.2 },
  { width: 1.5, height: 1.5, left: "45%",  top: "30%",  duration: 3.4, delay: 0.9 },
  { width: 2.7, height: 2.7, left: "25%",  top: "55%",  duration: 2.6, delay: 1.8 },
  { width: 1.1, height: 1.1, left: "78%",  top: "32%",  duration: 4.8, delay: 0.5 },
]

export function SpaceOrbit() {
  return (
    <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/4 lg:block xl:translate-x-0">
      <div className="relative h-[800px] w-[800px]">
        {/* Center Sun/Core */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,200,100,0.8) 0%, rgba(255,150,50,0.4) 50%, transparent 70%)",
            boxShadow: "0 0 60px 20px rgba(255,180,80,0.3)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="font-[family-name:var(--font-heading)] text-xs font-bold text-background/80">DEV</span>
        </motion.div>

        {/* Orbit Lines */}
        {techPlanets.map((planet, index) => (
          <motion.div
            key={`orbit-${planet.name}`}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/20"
            style={{
              width: planet.orbit * 2,
              height: planet.orbit * 2,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          />
        ))}

        {/* Planets */}
        {techPlanets.map((planet, index) => (
          <motion.div
            key={planet.name}
            className="absolute left-1/2 top-1/2"
            style={{
              width: planet.orbit * 2,
              height: planet.orbit * 2,
              marginLeft: -planet.orbit,
              marginTop: -planet.orbit,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: planet.duration,
              repeat: Infinity,
              ease: "linear",
            }}
            initial={{ rotate: index * 60 }}
          >
            {/* Planet */}
            <motion.div
              className="absolute left-1/2 top-0 flex cursor-pointer items-center justify-center rounded-full font-[family-name:var(--font-heading)] text-[10px] font-bold"
              style={{
                width: planet.size,
                height: planet.size,
                marginLeft: -planet.size / 2,
                marginTop: -planet.size / 2,
                backgroundColor: planet.color,
                boxShadow: `0 0 20px 5px ${planet.color}40, inset -4px -4px 8px rgba(0,0,0,0.3)`,
              }}
              whileHover={{ scale: 1.3 }}
              animate={{ rotate: -360 }}
              transition={{
                rotate: {
                  duration: planet.duration,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              <span className="text-white mix-blend-difference">{planet.icon}</span>
            </motion.div>
          </motion.div>
        ))}

        {/* Floating particles/stars around orbits */}
        {particles.map((p, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-foreground/60"
            style={{
              width: p.width,
              height: p.height,
              left: p.left,
              top: p.top,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
          />
        ))}
      </div>
    </div>
  )
}
