import globals from "globals";
import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  // Base JavaScript recommended rules
  js.configs.recommended,

  // React recommended configuration
  reactPlugin.configs.flat.recommended,

  // Configuration for React 17+ (with new JSX transform)
  reactPlugin.configs.flat["jsx-runtime"],

  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Unused variables
      "no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // Other useful rules
      "react/prop-types": "off", // Turn off if using TypeScript
    },
  },
];
