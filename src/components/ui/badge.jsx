import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  // Brand spec §7: pill radius, pill padding, no border.
  "inline-flex items-center gap-2 rounded-pill px-[0.95rem] pt-[0.3rem] pb-[0.42rem] text-[0.8125rem] font-semibold tracking-[0.03em] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Fills cycle abyss → foam → sea; text is always contrast-safe per §3.
        default: "bg-abyss text-foam hover:bg-deep",
        secondary: "bg-chrome text-abyss hover:bg-foam",
        sea: "bg-sea text-abyss hover:bg-chrome",
        foam: "bg-foam text-abyss hover:bg-chrome",
        outline: "bg-transparent text-abyss shadow-[inset_0_0_0_1px_theme(colors.deep)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}) {
  return (<div className={cn(badgeVariants({ variant }), className)} {...props} />);
}

export { Badge, badgeVariants }
