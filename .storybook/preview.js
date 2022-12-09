import "../src/css/globals.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    clearable: false,
    icon: "lightning",
    list: [
      {
        name: "Light Mode",
        class: [],
        color: "#ffffff",
        default: true,
      },
      {
        name: "Dark Mode",
        // The class dark will be added to the body tag for Tailwind to work
        class: ["dark"],
        color: "#000000",
      },
    ],
  },
  backgrounds: {
    values: [
      {
        name: "Light Background",
        value: "#00000",
      },
      {
        name: "Dark Background",
        value: "#0f1117",
      },
    ],
  },
};
