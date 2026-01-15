import React, { ReactNode, isValidElement } from 'react';

export const enhanceVideoProps = (children: ReactNode): ReactNode => {
    return React.Children.map(children, (child) => {
        if (isValidElement(child) && typeof child.type === 'string' && child.type === 'video') {
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            const props = child.props as React.VideoHTMLAttributes<HTMLVideoElement>;
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            const childElement = child as React.ReactElement<React.VideoHTMLAttributes<HTMLVideoElement>>;

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
