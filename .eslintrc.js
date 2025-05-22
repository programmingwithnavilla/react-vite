module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  plugins: ["react", "@typescript-eslint"],
  settings: {
    react: {
      version: "detect",
    },
  },
};
