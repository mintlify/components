import { ReactNode } from "react";
import { IconProps } from "../components/icon";

export type IconProp =
  | ReactNode
  | string
  | Omit<IconProps, "size" | "className" | "style">;
