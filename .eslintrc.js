module.exports = {
    env: {
        browser: true,
        node: true,
        jasmine: true
    },
    plugins: [],
    extends: ['airbnb'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            experimentalDecorators: true
        }
    },
    rules: {
        'arrow-parens': [0],
        'class-methods-use-this': [0, { exceptMethods: ['render'] }],
        'comma-dangle': [2, 'never'],
        'generator-star-spacing': 'off',
        indent: [2, 4],
        'import/no-extraneous-dependencies': [0],
        'import/no-unresolved': [0],
        'import/prefer-default-export': [0],
        'import/resolver': {
            node: {
                extensions: ['.js', '.es6']
            }
        },
        'linebreak-style': [2, 'unix'],
        'no-bitwise': [
            1,
            { allow: ['~', '>>>', '>>', '<<', '|', '&'], int32Hint: true }
        ],
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-else-return': [0],
        'no-underscore-dangle': [0],
        quotes: [2, 'single'],
        semi: [2, 'always'],
        'space-before-function-paren': 'off'
    },
    globals: {
        document: false,
        window: true,
        Image: true
    }
};
