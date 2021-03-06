//.eslintrc.js
module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        "plugin:vue/essential",
        "@vue/prettier",
        "@vue/typescript",
        "plugin:prettier/recommended" // add prettier-eslint plugin which will uses the `.prettierrc.js` config
    ],
    rules: {
        //'prettier/prettier': 'error',
        "no-empty": "off", //不允许出现空的代码块
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
    },
    parserOptions: {
        parser: "@typescript-eslint/parser"
    },
    overrides: [{
        files: ["**/__tests__/*.{j,t}s?(x)"],
        env: {
            mocha: true
        }
    }]
};