import { ClassValue } from "clsx";
import React, {
  ComponentProps,
  createElement,
  ReactNode,
  useMemo,
} from "react";

import { cn } from "@/script/util/ui-utils";

type ReactTextTagName = keyof Pick<
  React.JSX.IntrinsicElements,
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "span"
  | "label"
  | "blockquote"
  | "code"
  | "small"
  | "li"
>;

declare const _Typo: <TTag extends ReactTextTagName>(
  props: Omit<ComponentProps<TTag>, "children"> & {
    component?: TTag;
    children?: ReactNode;
    variant?: ReactTextTagName;
  }
) => React.JSX.Element;

export const Typography: typeof _Typo = ({
  children,
  component,
  variant,
  ...props
}) => {
  /**
   * @link https://ui.shadcn.com/docs/components/typography
   */
  const variantResetClassName = useMemo((): ClassValue => {
    const defaultVariant = variant || component;
    switch (defaultVariant) {
      case "h1": {
        return "scroll-m-20 text-7xl font-extrabold tracking-tight";
      }
      case "h2": {
        return "scroll-m-20 text-6xl font-semibold tracking-tight first:mt-0";
      }
      case "h3": {
        return "scroll-m-20 text-5xl font-semibold tracking-tight";
      }
      case "h4": {
        return "scroll-m-20 text-4xl font-semibold tracking-tight";
      }
      case "blockquote": {
        return "mt-6 border-l-2 pl-6 italic text-sm";
      }
      case "code": {
        return "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold";
      }
      case "small": {
        return "text-xs font-medium leading-none";
      }
      /**
       * @default {p | span | label}
       */
      default: {
        return "leading-7 text-md";
        // return "leading-7 [&:not(:first-child)]:mt-6";
      }
    }
  }, [component, variant]);

  return createElement(
    component || variant || "span",
    {
      ...props,
      variant: variant || component,
      className: cn("text-center", variantResetClassName, props.className),
    },
    children
  );
};
