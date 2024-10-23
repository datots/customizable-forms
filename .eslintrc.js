module.exports = {
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": "off", // No need to import React when using JSX with React 17+
    "no-unused-vars": "warn",
  },
  settings: {
    react: {
      version: "detect", // Automatically pick the version you have installed.
    },
  },
};
