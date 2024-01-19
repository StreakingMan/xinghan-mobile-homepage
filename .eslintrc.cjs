module.exports = {
    root: true,
    extends: ['@nuxt/eslint-config', 'prettier', 'plugin:prettier/recommended'],
    rules: {
        'vue/multi-word-component-names': 0,
        'vue/no-multiple-template-root': 0,
    },
};
