export default [
  {
    files: ["*.js", "*.jsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly"
      }
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "jsx-quotes": "off"
    },
    plugins: {},
    settings: {
      react: {
        version: "detect"
      }
    }
  }
];
