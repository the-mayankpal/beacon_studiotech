"use client"

import * as React from "react"
import { cn } from "@/src/lib/utils"

interface CardStickyProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number
  incrementY?: number
  topOffset?: number
  totalCards?: number
}

const ContainerScroll = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      {...props}
    >
      {children}
    </div>
  )
})
ContainerScroll.displayName = "ContainerScroll"

const CardSticky = React.forwardRef<HTMLDivElement, CardStickyProps>(
  (
    {
      index,
      incrementY = 32,
      topOffset = 180,
      totalCards = 4,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Calculate the sticky top offset for this card
    const y = topOffset + index * incrementY
    
    return (
      <div
        ref={ref}
        style={{
          top: y,
          zIndex: (index + 1) * 10,
          marginBottom: `calc(3rem + ${(totalCards - 1 - index) * incrementY}px)`,
          ...style,
        }}
        className={cn("sticky will-change-transform transform-gpu transition-all duration-300", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardSticky.displayName = "CardSticky"

export { ContainerScroll, CardSticky }
