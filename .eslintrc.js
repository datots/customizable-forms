module.exports = {
  extends: ["plugin:react/recommended", "prettier"],
  parser: "babel-eslint", // Use babel-eslint to support JSX
  plugins: ["react"],
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
