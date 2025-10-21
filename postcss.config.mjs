import plugin from "@tailwindcss/postcss";

export default {
  plugins: {
    "@tailwindcss/postcss": {
      config: "./tailwind.config.js",
      mode: "v4",
    },
    autoprefixer: {},
  },
};
