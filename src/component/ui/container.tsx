import React from "react";
import { ClassNameValue } from "tailwind-merge";

import { cn } from "@/script/util/ui-utils";

type ReactLayoutTagName = Pick<
  React.JSX.IntrinsicElements,
  "section" | "article" | "main" | "form" | "header" | "footer" | "nav"
>;

type ReactTag = keyof ReactLayoutTagName | React.JSXElementConstructor<unknown>;

type PropsOf<TTag extends ReactTag> = TTag extends React.ElementType
  ? React.ComponentProps<TTag>
  : never;

type Props<TTag extends ReactTag = keyof ReactLayoutTagName> = Omit<
  PropsOf<TTag>,
  "children" | "className"
> & {
  component?: TTag;
  children?: React.ReactNode;
  className?: ClassNameValue;
  fullSize?: boolean;
};

declare let _ContainerType: <TTag extends ReactTag = keyof ReactLayoutTagName>(
  props: Props<TTag> & { ref?: React.ForwardedRef<HTMLElement> }
) => React.JSX.Element;

export const Container = React.forwardRef<HTMLElement, Props<ReactTag>>(
  (
    { fullSize, children, component = "div", className = "", ...props },
    ref
  ) => {
    return React.createElement(
      component,
      {
        ...props,
        className: cn(!fullSize && "container", className),
        ref,
      },
      children
    );
  }
) as typeof _ContainerType;
