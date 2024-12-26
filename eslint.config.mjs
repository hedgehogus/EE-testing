//import globals from "globals";
//import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright"


/** @type {import('eslint').Linter.Config[]} */
export default [
  //{files: ["**/*.ts"], languageOptions: {parser: "@typescript-eslint/parser"}},
  {...playwright.configs['flat/recommended'], files: ["**/*.ts"],
    languageOptions: {parser: "@typescript-eslint/parser"},
    rules: {
      ...playwright.configs['flat/recommended'].rules}},
      
   {languageOptions: { globals: globals.browser }},
  ...tseslint.configs.recommended, 
];