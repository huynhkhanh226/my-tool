import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = defineConfig([
  // Next.js rules
  ...nextVitals,
  ...nextTs,
  // Apply Prettier plugin (show formatting errors)
  {
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": "error",
      "eol-last": ["error", "always"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_", // nếu biến args bắt đầu bằng _ sẽ bỏ qua
        },
      ],
    },
  },

  // Turn off all rules that conflict with Prettier
  prettierConfig,

  // Override default ignores of eslint-config-next
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
