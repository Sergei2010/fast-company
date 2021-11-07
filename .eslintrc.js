module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["plugin:react/recommended", "standard"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react"],
    rules: {
        indent: "off",
        semi: [2, "never"],
        camelcase: "off",
        "space-before-function-paren": [
            "error",
            { anonymous: "always", named: "never" },
        ],
        quotes: ["error", "double", { allowTemplateLiterals: true }],
        "multiline-ternary": ["off"],
        "comma-dangle": [
            "error",
            {
                arrays: "always-multiline",
                objects: "always-multiline",
                imports: "never",
                exports: "never",
                functions: "never",
            },
        ],
    },
}
