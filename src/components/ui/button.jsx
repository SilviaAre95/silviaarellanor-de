import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // §7: abyss ground, foam text; hover swaps to sea with abyss text.
        default: "bg-abyss text-foam hover:bg-sea hover:text-abyss",
        destructive: "bg-deep text-foam hover:bg-abyss",
        outline:
          "bg-transparent text-abyss shadow-[inset_0_0_0_1px_theme(colors.deep)] hover:bg-sea",
        secondary: "bg-chrome text-abyss hover:bg-abyss hover:text-foam",
        ghost: "text-abyss hover:bg-chrome",
        link: "text-deep font-semibold underline underline-offset-4 hover:text-abyss",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-pill px-3",
        lg: "h-11 rounded-pill px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
