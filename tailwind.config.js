const svgToDataUri = require("mini-svg-data-uri");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "sm:grid-cols-1",
    "sm:grid-cols-2",
    "sm:grid-cols-3",
    "sm:grid-cols-4",
  ],
  theme: {
    extend: {
      colors: {
        codeblock: "#161b22",
        "codeblock-tabs": "#21262d",
        "dark-input": "#30363d",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: theme("colors.slate.700"),
            hr: {
              borderColor: theme("colors.slate.100"),
              marginTop: "3em",
              marginBottom: "3em",
            },
            "h1, h2, h3": {
              letterSpacing: "-0.025em",
            },
            h2: {
              marginBottom: `${16 / 24}em`,
            },
            h3: {
              marginTop: "2.4em",
              lineHeight: "1.4",
            },
            h4: {
              marginTop: "2em",
              fontSize: "1.125em",
            },
            "h1 small, h2 small, h3 small, h4 small": {
              fontFamily: theme("fontFamily.mono").join(", "),
              color: theme("colors.slate.500"),
              fontWeight: 500,
            },
            "h2 small": {
              fontSize: theme("fontSize.lg")[0],
              ...theme("fontSize.lg")[1],
            },
            "h3 small": {
              fontSize: theme("fontSize.base")[0],
              ...theme("fontSize.base")[1],
            },
            "h4 small": {
              fontSize: theme("fontSize.sm")[0],
              ...theme("fontSize.sm")[1],
            },
            "h1, h2, h3, h4": {
              "scroll-margin-top": "var(--scroll-mt)",
            },
            ul: {
              listStyleType: "none",
              paddingLeft: 0,
            },
            "ul > li": {
              position: "relative",
              paddingLeft: "1.75em",
            },
            "ul > li::before": {
              content: '""',
              width: "0.75em",
              height: "0.125em",
              position: "absolute",
              top: "calc(0.875em - 0.0625em)",
              left: 0,
              borderRadius: "999px",
              backgroundColor: theme("colors.slate.300"),
            },
            a: {
              fontWeight: theme("fontWeight.semibold"),
              textDecoration: "none",
            },
            "a:hover": {
              borderBottomWidth: "2px",
            },
            "a code": {
              color: "inherit",
              fontWeight: "inherit",
            },
            strong: {
              color: theme("colors.slate.900"),
              fontWeight: theme("fontWeight.semibold"),
            },
            "a strong": {
              color: "inherit",
              fontWeight: "inherit",
            },
            kbd: {
              background: theme("colors.slate.100"),
              borderWidth: "1px",
              borderColor: theme("colors.slate.200"),
              padding: "0.125em 0.25em",
              color: theme("colors.slate.700"),
              fontWeight: 500,
              fontSize: "0.875em",
              fontVariantLigatures: "none",
              borderRadius: "4px",
              margin: "0 1px",
            },
            code: {
              fontWeight: theme("fontWeight.medium"),
              fontVariantLigatures: "none",
            },
            pre: {
              color: theme("colors.slate.50"),
              borderRadius: theme("borderRadius.xl"),
              padding: theme("padding.5"),
              boxShadow: theme("boxShadow.md"),
              display: "flex",
              marginTop: `${20 / 14}em`,
              marginBottom: `${32 / 14}em`,
            },
            "p + pre": {
              marginTop: `${-4 / 14}em`,
            },
            "pre + pre": {
              marginTop: `${-16 / 14}em`,
            },
            "pre code": {
              flex: "none",
              minWidth: "100%",
            },
            table: {
              fontSize: theme("fontSize.sm")[0],
              lineHeight: theme("fontSize.sm")[1].lineHeight,
            },
            thead: {
              color: theme("colors.slate.700"),
              borderBottomColor: theme("colors.slate.200"),
            },
            "thead th": {
              paddingTop: 0,
              fontWeight: theme("fontWeight.semibold"),
            },
            "tbody tr": {
              borderBottomColor: theme("colors.slate.100"),
            },
            "tbody tr:last-child": {
              borderBottomWidth: "1px",
            },
            "tbody code": {
              fontSize: theme("fontSize.xs")[0],
            },
            "figure figcaption": {
              textAlign: "center",
              fontStyle: "italic",
            },
            "figure > figcaption": {
              marginTop: `${12 / 14}em`,
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.slate.400"),
            "h1, h2, h3, h4, thead th": {
              color: theme("colors.slate.200"),
            },
            "h1 small, h2 small, h3 small, h4 small": {
              color: theme("colors.slate.400"),
            },
            kbd: {
              background: theme("colors.slate.700"),
              borderColor: theme("colors.slate.600"),
              color: theme("colors.slate.200"),
            },
            code: {
              color: theme("colors.slate.200"),
            },
            hr: {
              borderColor: theme("colors.slate.200"),
              opacity: "0.05",
            },
            pre: {
              boxShadow: "inset 0 0 0 1px rgb(255 255 255 / 0.1)",
            },
            a: {
              color: theme("colors.white"),
            },
            strong: {
              color: theme("colors.slate.200"),
            },
            thead: {
              color: theme("colors.slate.300"),
              borderBottomColor: "rgb(148 163 184 / 0.2)",
            },
            "tbody tr": {
              borderBottomColor: "rgb(148 163 184 / 0.1)",
            },
            blockQuote: {
              color: theme("colors.white"),
            },
          },
        },
      }),
      spacing: {
        18: "4.5rem",
        full: "100%",
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-children"),
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-grid": (value) => {
            // https://stackoverflow.com/questions/1787124/programmatically-darken-a-hex-colour
            const darker = ((value & 0x7e7e7e) >> 1) | (value & 0x808080);
            return {
              backgroundImage: `url("${svgToDataUri(
                `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 200 200'><rect fill='${value}' width='200' height='200'/><defs><linearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'><stop offset='0' stop-color='#000' stop-opacity='0'/><stop offset='1' stop-color='#000' stop-opacity='1'/></linearGradient><linearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'><stop offset='0' stop-color='#000' stop-opacity='0'/><stop offset='1' stop-color='#000' stop-opacity='1'/></linearGradient></defs><g fill='${darker}' fill-opacity='0.05'><rect x='100' width='100' height='100'/><rect y='100'  width='100' height='100'/></g><g fill-opacity='0.15'><polygon fill='url(#a)' points='100 30 0 0 200 0'/><polygon fill='url(#b)' points='100 100 0 130 0 100 200 100 200 130'/></g></svg>`
              )}")`,
            };
          },
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
      matchUtilities({
        values: flattenColorPalette(theme("backgroundColor")),
        type: "color",
      });
    },
  ],
};
