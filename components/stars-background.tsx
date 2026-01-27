"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  duration: number
  delay: number
}

export function StarsBackground() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    // Generate random stars on client side
    const generatedStars: Star[] = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }))
    setStars(generatedStars)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep space gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, rgba(25, 25, 50, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(30, 20, 40, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(10, 10, 20, 0.2) 0%, transparent 70%)
          `,
        }}
      />

      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent"
          style={{
            width: 100 + i * 30,
            left: `${10 + i * 30}%`,
            top: `${15 + i * 20}%`,
            transform: "rotate(-45deg)",
          }}
          animate={{
            x: [0, 300],
            y: [0, 300],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 4 + 2,
            repeatDelay: 8,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Nebula glow effects */}
      <motion.div
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(100, 100, 200, 0.3) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-48 -left-48 h-[500px] w-[500px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(150, 100, 180, 0.2) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  )
}
