module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended", // If you are using React
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module", // Allow ES module syntax
  },
  globals: {
    process: "readonly", // Define process as a global variable
  },
  rules: {
    // Your custom rules
  },
};
