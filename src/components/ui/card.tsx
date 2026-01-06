import * as React from "react"
import { cn } from "@/lib/utils"

// ✅ 1. Added CardProps interface to include 'variant'
// Previously, Card just used React.HTMLAttributes<HTMLDivElement>, which caused TS errors on 'variant'
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "gradient"
}

// ✅ 2. Updated Card component to accept variant
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border bg-card text-card-foreground shadow",
          // ✅ 3. Added variant styling logic for 'gradient'
          variant === "gradient" && "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

// Subcomponents stay the same — no variant needed
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// ✅ 4. Export everything as before
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
