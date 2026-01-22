import { DEFAULT_DARK_BG, DEFAULT_LIGHT_BG } from "@/utils/shiki/constants";

export const getShikiBackgroundColors = (
  codeBlockTheme: "system" | "dark",
  html: string | undefined,
  children: unknown
): { light: string | undefined; dark: string | undefined } | undefined => {
  const defaultBgColors =
    codeBlockTheme === "dark"
      ? { light: DEFAULT_DARK_BG, dark: DEFAULT_DARK_BG }
      : { light: DEFAULT_LIGHT_BG, dark: DEFAULT_DARK_BG };
  if (html) {
    return getBackgroundColorsFromHtml(html, defaultBgColors);
  }
  if (children) {
    return getBackgroundColorsFromChildren(children, defaultBgColors);
  }
  return defaultBgColors;
};

const isTransparentOrUndefined = (color: string | undefined) =>
  color === "transparent" || color === undefined;

export const getBackgroundColorsFromHtml = (
  html: string,
  defaultBgColors: { light: string; dark: string }
): { light: string | undefined; dark: string | undefined } => {
  const styles = html.split('style="');
  if (styles.length < 2) {
    return defaultBgColors;
  }
  const backgroundColor = styles[1]
    ?.split("background-color:")[1]
    ?.split(";")[0];
  const shikiDarkBgValue = styles[1]
    ?.split("--shiki-dark-bg:")[1]
    ?.split(";")[0];
  return {
    light: isTransparentOrUndefined(backgroundColor)
      ? defaultBgColors.light
      : backgroundColor,
    dark: isTransparentOrUndefined(shikiDarkBgValue)
      ? defaultBgColors.dark
      : shikiDarkBgValue,
  };
};

export const getBackgroundColorsFromChildren = (
  children: unknown,
  defaultBgColors: { light: string; dark: string }
): { light: string | undefined; dark: string | undefined } => {
  if (
    children &&
    typeof children === "object" &&
    "props" in children &&
    children.props &&
    typeof children.props === "object" &&
    "style" in children.props &&
    typeof children.props.style === "object" &&
    children.props.style &&
    typeof children.props.style === "object" &&
    "backgroundColor" in children.props.style &&
    typeof children.props.style.backgroundColor === "string" &&
    "--shiki-dark-bg" in children.props.style &&
    typeof children.props.style["--shiki-dark-bg"] === "string"
  ) {
    return {
      light: isTransparentOrUndefined(children.props.style.backgroundColor)
        ? defaultBgColors.light
        : children.props.style.backgroundColor,
      dark: isTransparentOrUndefined(children.props.style["--shiki-dark-bg"])
        ? defaultBgColors.dark
        : children.props.style["--shiki-dark-bg"],
    };
  }
  return defaultBgColors;
};
