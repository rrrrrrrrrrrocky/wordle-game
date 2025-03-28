import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/script/util/ui-utils";

const buttonVariants = cva(
  "inline-flex items-center break-words text-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary border-primary border text-primary-foreground hover:bg-primary-foreground hover:border-primary-foreground hover:text-primary",
        destructive:
          "bg-destructive border border-destructive text-destructive-foreground hover:bg-background hover:border-destructive hover:text-destructive",
        outline:
          "border border-primary text-primary-foreground dark:text-primary bg-transparent hover:bg-primary  hover:text-primary-foreground dark:hover:text-primary-foreground",
        secondary:
          "bg-secondary border border-secondary text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary hover:border-secondary-foreground",
        ghost: "hover:bg-primary hover:text-primary-foreground ",
        link: "text-accent underline-offset-4 hover:underline",
        black:
          "bg-foreground border-black text-background hover:bg-primary hover:border-primary hover:text-primary-foreground",
        "none-style": "",
      },
      size: {
        default: "min-h-10 px-4 py-2 text-sm",
        sm: "min-h-9 rounded-md px-3 py-1 text-xs",
        lg: "min-h-11 rounded-md px-8 py-2 text-md",
        icon: "size-10",
        "none-style": "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  "data-gtm-id": string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          variant === "none-style"
            ? className
            : buttonVariants({
                variant,
                size,
                className,
              })
        )}
        type="button"
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
