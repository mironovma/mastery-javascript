module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "standard-with-typescript",
        "plugin:react/recommended",
        "prettier",
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react", "prettier"],
    rules: {
        "prettier/prettier": "error",
        "react/react-in-jsx-scope": "off",
        "react/display-name": "off",
        "prettier/prettier": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-confusing-void-expression": "off",
        "@typescript-eslint/promise-function-async": "off",
        "@typescript-eslint/consistent-type-imports": "off",
        "@typescript-eslint/no-misused-promises": "off",
        "@typescript-eslint/consistent-type-assertions": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/prefer-nullish-coalescing": "off",
        "@typescript-eslint/dot-notation": "off",
    },
    ignorePatterns: [".eslintrc.js", "src/shared/ui/*.tsx"],
};
