import React, { isValidElement, type ReactNode } from "react";

const enhanceVideoProps = (children: ReactNode): ReactNode => {
  return React.Children.map(children, (child) => {
    if (
      isValidElement(child) &&
      typeof child.type === "string" &&
      child.type === "video"
    ) {
      const props = child.props as React.VideoHTMLAttributes<HTMLVideoElement>;
      const childElement = child as React.ReactElement<
        React.VideoHTMLAttributes<HTMLVideoElement>
      >;

      if (props.autoPlay) {
        return React.cloneElement(childElement, {
          ...props,
          playsInline: true,
          loop: true,
          muted: true,
        });
      }
    }
    return child;
  });
};

export { enhanceVideoProps };
