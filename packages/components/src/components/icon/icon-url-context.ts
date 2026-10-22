import { createContext } from "react";

type IconUrlResolver = (url: string) => string;

const IconUrlContext = createContext<IconUrlResolver>((url) => url);

export { IconUrlContext };
export type { IconUrlResolver };
