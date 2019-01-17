import babel from 'rollup-plugin-babel';
// import babelrc from 'babelrc-rollup';

let pkg = require('../../package.json');
let external = Object.keys(pkg.dependencies);

let plugins = [
    // babel(babelrc()),
];

export default {
    input: 'src/scripts/app.js',
    plugins: plugins,
    external: external,
    output: {
        file: 'rollup_output/app.js',
        format: 'esm',
        moduleName: 'demo',
        sourceMap: true,
    },
};