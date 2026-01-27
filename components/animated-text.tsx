"use client"

import React from "react"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface AnimatedTextProps {
  children: string
  className?: string
  delay?: number
  stagger?: number
  splitBy?: "chars" | "words" | "lines"
  scrollTrigger?: boolean
  as?: "h1" | "h2" | "h3" | "p" | "span"
}

export function AnimatedText({
  children,
  className = "",
  delay = 0,
  stagger = 0.03,
  splitBy = "chars",
  scrollTrigger = false,
  as: Tag = "span",
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const elements = elementsRef.current.filter(Boolean)
    
    const animationProps = {
      y: 40,
      opacity: 0,
      filter: "blur(8px)",
    }

    const animationTo = {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.8,
      stagger: stagger,
      ease: "power3.out",
      delay: delay,
    }

    if (scrollTrigger) {
      gsap.fromTo(elements, animationProps, {
        ...animationTo,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })
    } else {
      gsap.fromTo(elements, animationProps, animationTo)
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [delay, stagger, scrollTrigger])

  const splitText = () => {
    if (splitBy === "chars") {
      return children.split("").map((char, index) => (
        <span
          key={index}
          ref={(el) => {
            if (el) elementsRef.current[index] = el
          }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </span>
      ))
    } else if (splitBy === "words") {
      return children.split(" ").map((word, index) => (
        <span
          key={index}
          ref={(el) => {
            if (el) elementsRef.current[index] = el
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </span>
      ))
    } else {
      return children.split("\n").map((line, index) => (
        <span
          key={index}
          ref={(el) => {
            if (el) elementsRef.current[index] = el
          }}
          className="block"
        >
          {line}
        </span>
      ))
    }
  }

  return (
    <Tag ref={containerRef as React.RefObject<HTMLDivElement & HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>} className={className}>
      {splitText()}
    </Tag>
  )
}
