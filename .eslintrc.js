module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  overrides: [
    {
      files: ["src/pages/**/*.{js,jsx,ts,tsx}"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "prefer-arrow",
    "react-hooks",
    "import",
  ],
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "react/react-in-jsx-scope": "off",
    "prefer-arrow/prefer-arrow-functions": [
      "error",
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "import/newline-after-import": "error",
    "import/no-default-export": "error",
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
